import { el } from '../../utils/dom.js';

export const NavBar = (title = 'daisyUI') => {
    const nav = el('div', 'navbar bg-base-100 shadow-lg z-10');
    
    const leftSection = el('div', 'flex-none');
    const menuBtn = el('button', 'btn btn-square btn-ghost');
    menuBtn.appendChild(el('i', 'fa-solid fa-bars text-xl'));
    leftSection.appendChild(menuBtn);
    
    const centerSection = el('div', 'flex-1');
    const titleLink = el('a', 'btn btn-ghost text-xl', title);
    centerSection.appendChild(titleLink);
    
    const rightSection = el('div', 'flex-none');
    const dotsBtn = el('button', 'btn btn-square btn-ghost');
    dotsBtn.appendChild(el('i', 'fa-solid fa-ellipsis-vertical text-xl'));
    rightSection.appendChild(dotsBtn);
    
    nav.append(leftSection, centerSection, rightSection);
    
    return nav;
};
