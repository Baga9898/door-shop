import { useState } from 'react';

export const useDebounce = () => {
    const [typingTimeout, setTypingTimeout] = useState('');

    const debounce = (func, waitTime = 500) => {
        clearTimeout(typingTimeout);

        const timeout = setTimeout(() => func(), waitTime);

        setTypingTimeout(timeout);
    };

    return debounce;
};
