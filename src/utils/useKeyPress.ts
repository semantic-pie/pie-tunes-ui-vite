import { useEffect } from "preact/hooks";

export const useKeyPress = (callback: ()=> void, key: string) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === key) {
                console.log('toggle')
                callback()
            }
        };

        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    }, []);
}