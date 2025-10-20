import { useCallback, useEffect, useState } from 'react'
import { getCurrentByCity, getForecastByCity, getCurrentByCoords, getForecastByCoords } from '../services/openweather'
import type { CurrentWeatherResponse, ForecastResponse, Units } from '../types/weather'


interface WeatherState {
current: CurrentWeatherResponse | null
forecast: ForecastResponse | null
loading: boolean
error: string | null
}


export function useWeather(initialCity = 'Athens', initialUnits: Units = 'metric') {
const [city, setCity] = useState<string>(() => localStorage.getItem('lastCity') || initialCity)
const [units, setUnits] = useState<Units>(() => (localStorage.getItem('units') as Units) || initialUnits)
const [state, setState] = useState<WeatherState>({ current: null, forecast: null, loading: false, error: null })


const fetchByCity = useCallback(async (q: string) => {
setState(s => ({ ...s, loading: true, error: null }))
try {
const [current, forecast] = await Promise.all([
getCurrentByCity(q, units),
getForecastByCity(q, units),
])
setState({ current, forecast, loading: false, error: null })
setCity(q)
localStorage.setItem('lastCity', q)
} catch (e: any) {
setState(s => ({ ...s, loading: false, error: e?.message || 'Failed to load weather' }))
}
}, [units])


const fetchByCoords = useCallback(async (lat: number, lon: number) => {
setState(s => ({ ...s, loading: true, error: null }))
try {
const [current, forecast] = await Promise.all([
getCurrentByCoords(lat, lon, units),
getForecastByCoords(lat, lon, units),
])
setState({ current, forecast, loading: false, error: null })
setCity(current.name)
localStorage.setItem('lastCity', current.name)
} catch (e: any) {
setState(s => ({ ...s, loading: false, error: e?.message || 'Failed to load weather' }))
}
}, [units])


useEffect(() => {
localStorage.setItem('units', units)
// refetch when units change
if (city) fetchByCity(city)
}, [units])


useEffect(() => {
// initial fetch
fetchByCity(city)
}, [])


return {
...state,
city,
setCity,
units,
setUnits,
fetchByCity,
fetchByCoords,
}
}