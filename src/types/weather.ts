export type Units = 'metric' | 'imperial'


export interface CurrentWeatherResponse {
name: string
dt: number
timezone: number
weather: { id: number; main: string; description: string; icon: string }[]
main: { temp: number; feels_like: number; humidity: number }
wind: { speed: number }
}


export interface ForecastListItem {
dt: number
weather: { id: number; main: string; description: string; icon: string }[]
main: { temp: number; feels_like: number; humidity: number }
wind: { speed: number }
}


export interface ForecastResponse {
city: { name: string; timezone: number }
list: ForecastListItem[]
}