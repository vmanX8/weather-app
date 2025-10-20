import { useEffect, useRef, useState } from 'react'
import styles from '../styles/SearchBar.module.css'


type Props = {
    onSubmit: (q: string) => void
    onUseMyLocation: () => void
    initialValue?: string
}


export default function SearchBar({ onSubmit, onUseMyLocation, initialValue = '' }: Props) {
    const [q, setQ] = useState(initialValue)
    const timer = useRef<number | null>(null)


    // simple debounce to enable quick typing without lag
    useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current) }, [])


    function handleChange(v: string) {
        setQ(v)
        if (timer.current) window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => { }, 250)
    }


    function submit(e?: React.FormEvent) {
        e?.preventDefault()
        if (q.trim()) onSubmit(q.trim())
    }


    return (
        <form className={styles.search} onSubmit={submit}>
            <input
                className={styles.input}
                placeholder="Search city..."
                value={q}
                onChange={(e) => handleChange(e.target.value)}
                aria-label="City name"
            />
            <button className={styles.button} type="submit">Search</button>
            <button className={styles.secondary} type="button" onClick={onUseMyLocation}>Use my location</button>
        </form>
    )
}