import styles from '../styles/WeatherCard.module.css'
import { formatTemp, formatWind } from '../utils/format'
import type { CurrentWeatherResponse, Units } from '../types/weather'


export default function WeatherCard({ data, units }: { data: CurrentWeatherResponse; units: Units }) {
    const w = data.weather[0]
    const iconUrl = `https://openweathermap.org/img/wn/${w.icon}@2x.png`
    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <h2>{data.name}</h2>
                <div className={styles.badge}>{w.main}</div>
            </header>
            <div className={styles.row}>
                <img className={styles.icon} src={iconUrl} alt={w.description} loading="lazy" />
                <div>
                    <div className={styles.temp}>{formatTemp(data.main.temp, units)}</div>
                    <div className={styles.sub}>Feels like {formatTemp(data.main.feels_like, units)}</div>
                </div>
            </div>
            <dl className={styles.meta}>
                <div><dt>Humidity</dt><dd>{data.main.humidity}%</dd></div>
                <div><dt>Wind</dt><dd>{formatWind(data.wind.speed, units)}</dd></div>
                <div><dt>Updated</dt><dd>{new Date(data.dt * 1000).toLocaleTimeString()}</dd></div>
            </dl>
        </section>
    )
}