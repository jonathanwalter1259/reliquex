'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollObserver() {
    const pathname = usePathname();

    useEffect(() => {
        // --- Scroll-triggered Reveal Animations ---
        const reveals = document.querySelectorAll('.reveal');

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        reveals.forEach((el) => revealObserver.observe(el));

        // Cleanup
        return () => {
            reveals.forEach((el) => revealObserver.unobserve(el));
        };
    }, [pathname]);

    return null;
}
