import React from 'react';
import { summaryDiv0 } from '../../../helpers';

export const _data = {
  className: "",
  items: [
    { label: "Chrome Extension Issue?", content: "If you have issues with Chrome extensions, you can disable them or run in Incognito mode." },
    { label: "How to Clear Cache?", content: "Go to Settings -> Privacy and Security -> Clear Browsing Data." }
  ]
};

// Comportements ou styles spécifiques pour l'accordéon Chrome
const chromeBehavior = {
    icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
};

// Injection du comportement spécifique dans le générateur générique
export const chrome__accordion = summaryDiv0(chromeBehavior);
export default chrome__accordion;
