import React, { useState, useEffect } from 'react';

export default function useScrollPositon() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        setScrollPosition({ scrollX: window.scrollX, scrollY: window.scrollY });
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll()
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollPosition;
}