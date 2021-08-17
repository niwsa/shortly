import { useEffect } from 'react';

export default function useKeypress(key: string, handler: () => void, shouldListen: boolean): void {
    useEffect(() => {
        const listener = function onKeyup(e: KeyboardEvent) {
            if (e.key === key) handler()
        }
        // add listener when needed
        shouldListen && window.addEventListener('keyup', listener);
        return () => window.removeEventListener('keyup', listener);
    }, [key, handler, shouldListen]);
}