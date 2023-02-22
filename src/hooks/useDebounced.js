import { useEffect, useState } from 'react';

function useDebounced(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const hanlder = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(hanlder);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debouncedValue;
}

export default useDebounced;
