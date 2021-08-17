import { RefObject, useEffect } from "react";

export default function useOnClickOutside(
    ref: RefObject<HTMLElement>,
    handler: (event: MouseEvent) => void,
    shouldListen: boolean
): void {

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(<Node>event.target)) {
                return;
            }

            handler(event);
        };
        // add listener when needed
        shouldListen && document.addEventListener("click", listener);

        return () => {
            document.removeEventListener("click", listener);
        };
    },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler, shouldListen]
    );
}