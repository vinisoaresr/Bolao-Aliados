import { useState, useCallback } from "react"

function useLocalStorage(key, value = '') {
    const [state, setState] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : value;
        } catch (error) {
            return value;
        }
    });

    const setValue = useCallback((value) => {
        try {
            setState(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    }, [key])

    return [state, setValue]
}

export default useLocalStorage