export function useLocalStorage(key: string) {
    const getValue = () => {
        return localStorage.getItem(key)
    }

    const setValue = (value: string) => {
        localStorage.setItem(key, value);
    }

    return {
        getValue,
        setValue,
    }
}