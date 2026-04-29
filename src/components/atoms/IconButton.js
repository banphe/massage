import { el } from '../../utils/dom.js';

export const IconButton = (iconClass) => {
    const btn = el('button', 'btn btn-sm join-item');
    btn.appendChild(el('i', `fa-solid ${iconClass}`));
    return btn;
};
