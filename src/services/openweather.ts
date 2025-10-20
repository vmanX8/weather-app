import type { CurrentWeatherResponse, ForecastResponse, Units } from '../types/weather'


const API_BASE = 'https://api.openweathermap.org/data/2.5'
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string


function withKey(url: string) {
const joiner = url.includes('?') ? '&' : '?'
return `${url}${joiner}appid=${API_KEY}`
}


export async function getCurrentByCity(city: string, units: Units): Promise<CurrentWeatherResponse> {
const url = withKey(`${API_BASE}/weather?q=${encodeURIComponent(city)}&units=${units}`)
const res = await fetch(url)
if (!res.ok) throw new Error(`Current weather failed: ${res.status}`)
return res.json()
}


export async function getForecastByCity(city: string, units: Units): Promise<ForecastResponse> {
const url = withKey(`${API_BASE}/forecast?q=${encodeURIComponent(city)}&units=${units}`)
const res = await fetch(url)
if (!res.ok) throw new Error(`Forecast failed: ${res.status}`)
return res.json()
}


export async function getCurrentByCoords(lat: number, lon: number, units: Units): Promise<CurrentWeatherResponse> {
const url = withKey(`${API_BASE}/weather?lat=${lat}&lon=${lon}&units=${units}`)
const res = await fetch(url)
if (!res.ok) throw new Error(`Current weather failed: ${res.status}`)
return res.json()
}


export async function getForecastByCoords(lat: number, lon: number, units: Units): Promise<ForecastResponse> {
const url = withKey(`${API_BASE}/forecast?lat=${lat}&lon=${lon}&units=${units}`)
const res = await fetch(url)
if (!res.ok) throw new Error(`Forecast failed: ${res.status}`)
return res.json()
}