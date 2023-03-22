import { useEffect, useMemo, useState } from 'react';

function infiniteScroll(options, targetRef) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isVisible, setIsVisible] = useState('');

    const callbackFunction = (entries) => {
        const entry = entries[0]; //   const [entry] = entries;

        setIsVisible(entry.isIntersecting); // có nằm trong khug màn hình k
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const optionsMemo = useMemo(() => {
        return options;
    }, [options]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, optionsMemo);
        
        const currentTarget = targetRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) observer.unobserve(currentTarget); // giữ lại các phần tử đã loading trc dó
        };
    }, [targetRef, optionsMemo]);
    return isVisible;
}

export default infiniteScroll;
