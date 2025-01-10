import { useEffect, useState } from 'react';

export default function useMobile(width: number) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth <= width : false
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleSizeChange = () => {
            setIsMobile(window.innerWidth <= width);
        };

        window.addEventListener('resize', handleSizeChange);

        return () => {
            window.removeEventListener('resize', handleSizeChange);
        };
    }, [width]);

    return isMobile;
}
