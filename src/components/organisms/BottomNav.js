import { el } from '../../utils/dom.js';

export const BottomNav = (links) => {
    const nav = el('div', 'bg-white p-3 flex justify-evenly shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]');
    links.forEach((l) => nav.appendChild(l));
    return nav;
}