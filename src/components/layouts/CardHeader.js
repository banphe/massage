import { el } from '../../utils/dom.js';

export const CardHeader = (title, buttonGroup) => {
    const header = el('div', 'card-title pt-3 px-4 flex justify-between items-center');
    header.append(title, buttonGroup);
    return header;
};
