import { el } from '../../utils/dom.js';
export const chart = (data, options = {}) => {
    const { gap = 'gap-y-4', padding = 'p-4' } = options;
    const max = Math.max(...data.map(({ y }) => y));
    const wrapper = el('div', `grid w-full h-full ${gap} ${padding}`);
    wrapper.style.border = '3px solid yellow'; // DEBUG
    wrapper.style.gridTemplateColumns = 'auto 1fr';
    
    // Definiujemy wiersze: 1fr dla każdego słupka, auto dla miarki
    wrapper.style.gridTemplateRows = `${data.map(() => '1fr').join(' ')} auto`;
    wrapper.style.alignItems = 'center';

    data.forEach(({ x, y }) => {
        const label = el('div', 'text-right text-sm pr-2 whitespace-nowrap', x);
        label.style.border = '1px dashed orange'; // DEBUG
        const barContainer = el('div', 'relative h-full');
        const bar = el('div', 'bg-primary rounded h-full');
        bar.style.border = '1px dashed purple'; // DEBUG
        bar.style.width = `${(y / max) * 100}%`;
        [0.25, 0.5, 0.75].forEach(fraction => {
            const line = el('div', 'absolute top-0 h-full');
            line.style.left = `${fraction * 100}%`;
            line.style.width = '1px';
            line.style.background = 'rgba(0,0,0,0.15)';
            barContainer.appendChild(line);
        });
        barContainer.appendChild(bar);
        wrapper.append(label, barContainer);
    });

    const ruler = el('div', 'relative h-6 mt-2');
    ruler.style.border = '2px dashed red'; // DEBUG
    ruler.style.gridColumn = '2';
    [0, 0.25, 0.5, 0.75, 1].forEach(fraction => {
        const tick = el('div', 'absolute text-xs text-gray-400 -translate-x-1/2', Math.round(max * fraction).toString());
        tick.style.border = '1px dashed cyan'; // DEBUG
        tick.style.left = `${fraction * 100}%`;
        ruler.appendChild(tick);
    });
    wrapper.appendChild(ruler);

    return wrapper;
};