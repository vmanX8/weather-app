import styles from '../styles/SearchBar.module.css'
import type { Units } from '../types/weather'


type Props = { units: Units; onChange: (u: Units) => void }


export default function UnitToggle({ units, onChange }: Props) {
    return (
        <div className={styles.toggle}>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    checked={units === 'imperial'}
                    onChange={(e) => onChange(e.target.checked ? 'imperial' : 'metric')}
                />
                <span className={styles.slider} />
            </label>
            <span className={styles.toggleLabel}>{units === 'metric' ? '°C' : '°F'}</span>
        </div>
    )
}