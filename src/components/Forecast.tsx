import styles from '../styles/Forecast.module.css'
import { formatHour, formatTemp } from '../utils/format'
import type { ForecastResponse, Units } from '../types/weather'


export default function Forecast({ data, units }: { data: ForecastResponse; units: Units }) {
    const slice = data.list.slice(0, 8) // ~24 hours (3h steps)
    return (
        <section className={styles.forecast}>
            <h3>Next hours</h3>
            <ul className={styles.grid}>
                {slice.map(item => {
                    const w = item.weather[0]
                    const iconUrl = `https://openweathermap.org/img/wn/${w.icon}.png`
                    return (
                        <li key={item.dt} className={styles.cell}>
                            <div className={styles.time}>{formatHour(item.dt)}</div>
                            <img className={styles.small} src={iconUrl} alt={w.description} loading="lazy" />
                            <div className={styles.temp}>{formatTemp(item.main.temp, units)}</div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}