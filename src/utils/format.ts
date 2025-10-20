export function formatTemp(v: number, units: 'metric' | 'imperial') {
return `${Math.round(v)}°${units === 'metric' ? 'C' : 'F'}`
}


export function formatWind(speed: number, units: 'metric' | 'imperial') {
return `${Math.round(speed)} ${units === 'metric' ? 'm/s' : 'mph'}`
}


export function formatHour(ts: number) {
return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}