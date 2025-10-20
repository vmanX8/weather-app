import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar'
import UnitToggle from './components/UnitToggle'
import WeatherCard from './components/WeatherCard'
import Forecast from './components/Forecast'
import styles from './styles/App.module.css'


export default function App() {
  const { current, forecast, loading, error, city, units, setUnits, fetchByCity, fetchByCoords } = useWeather('Athens', 'metric')


  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Weather</h1>
        <UnitToggle units={units} onChange={setUnits} />
      </header>


      <SearchBar
        initialValue={city}
        onSubmit={(q) => fetchByCity(q)}
        onUseMyLocation={() => {
          if (!navigator.geolocation) return alert('Geolocation not supported')
          navigator.geolocation.getCurrentPosition(
            (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
            () => alert('Unable to get your location')
          )
        }}
      />


      {loading && <p className={styles.status}>Loading…</p>}
      {error && <p className={styles.error}>⚠️ {error}</p>}


      {current && <WeatherCard data={current} units={units} />}
      {forecast && <Forecast data={forecast} units={units} />}


      <footer className={styles.footer}>
        <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">
          Powered by OpenWeather
        </a>
        <span>&#174; {new Date().getFullYear()} Vangelis&nbsp;Manouhos</span>
      </footer>
    </div>
  )
}