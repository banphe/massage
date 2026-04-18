import { el } from '../../utils/dom.js';

export const Button = (text, size = 'btn-sm') => 
    el('button', `btn ${size} join-item`, text);
