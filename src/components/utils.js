import { useRef, useEffect } from "react"


export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

export function randomRange(min, max) {
    return Math.random() * (max - min) + min
}


export function useInterval(callback, delay) {
    const savedCallback = useRef()

    useEffect(() => {
        savedCallback.current = callback
    })

    useEffect(() => {
        function tick() {
            savedCallback.current()
        }

        let id = setInterval(tick, delay)
        return () => clearInterval(id)
    }, [delay])
}