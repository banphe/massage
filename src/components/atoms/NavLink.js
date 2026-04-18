import { el, toggleClass } from '../../utils/dom.js';

export const NavLink = (view, text, iconName) => {
    const path = `/${text.toLowerCase()}`;
    const link = el('a', 'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors');
    link.href = `#${path}`;
    
    const icon = el('i', `text-base fa-solid ${iconName}`);
    const textEl = el('span', 'text-xs font-bold', text);
    
    link.append(icon, textEl);
    
    const refresh = () => {
        const isActive = window.location.hash === `#${path}`;
        toggleClass(link, 'bg-primary', isActive);
        toggleClass(link, 'text-white', isActive);
        isActive ? view.show() : view.hide();
    };
    
    window.addEventListener('hashchange', refresh);
    refresh();
    
    return link;
};
