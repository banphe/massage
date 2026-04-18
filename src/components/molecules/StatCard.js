import { el } from '../../utils/dom.js';

const colors = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-700' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-700' },
    green: { bg: 'bg-green-50', text: 'text-green-700' }
};

export const StatCard = (title, color) => {
    const { bg, text } = colors[color];
    const stat = el('div', `stat border border-gray-300 ${bg} flex-1`);
    const titleEl = el('div', 'stat-title', title);
    const valueEl = el('div', `stat-value text-2xl ${text}`, '0');
    stat.append(titleEl, valueEl);
    return { element: stat, value: valueEl };
};
