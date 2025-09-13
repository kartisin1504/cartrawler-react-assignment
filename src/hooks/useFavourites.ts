import { useEffect, useState } from 'react'
const KEY = 'ct_favourites'
function read(): Record<string, boolean> { try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : {} } catch { return {} } }
export function useFavourites() {
    const [map, setMap] = useState<Record<string, boolean>>(() => read());
    useEffect(() => {
        try { localStorage.setItem(KEY, JSON.stringify(map)) }
        catch { }
    },
        [map]);
    const toggle = (id: string) => setMap(m => ({ ...m, [id]: !m[id] }));
    const isFav = (id: string) => !!map[id];
    const count = Object.values(map).filter(Boolean).length; return { isFav, toggle, count, map }
}
