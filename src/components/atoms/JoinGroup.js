import { el } from '../../utils/dom.js';

export const JoinGroup = (...buttons) => {
    const join = el('div', 'join');
    join.append(...buttons);
    return join;
};
