import { el } from '../../utils/dom.js';
export const chart = (data, options = {}) => {
    const { gap = 'gap-y-4', padding = 'p-4' } = options;
    const max = Math.max(...data.map(({ y }) => y));
    const wrapper = el('div', `grid w-full h-full ${gap} ${padding}`);
    wrapper.style.border = '3px solid yellow'; // DEBUG
    wrapper.style.gridTemplateColumns = 'auto 1fr';
    wrapper.style.gridTemplateRows = `${data.map(() => '1fr').join(' ')} auto`;
    wrapper.style.alignItems = 'center';

    data.forEach(({ x, y }, i) => {
        const label = el('div', 'text-right text-sm pr-2 whitespace-nowrap', x);
        label.style.border = '1px dashed orange'; // DEBUG
        label.style.gridColumn = '1';
        label.style.gridRow = `${i + 1}`;

        const bar = el('div', 'bg-primary rounded h-full');
        bar.style.border = '1px dashed purple'; // DEBUG
        bar.style.width = `${(y / max) * 100}%`;
        bar.style.gridColumn = '2';
        bar.style.gridRow = `${i + 1}`;

        wrapper.append(label, bar);
    });

    const ruler = el('div', 'relative');
    ruler.style.border = '2px dashed red'; // DEBUG
    ruler.style.gridColumn = '2';
    ruler.style.gridRow = `${data.length + 1}`;
    ruler.style.height = '32px';

    [0, 0.25, 0.5, 0.75, 1].forEach(fraction => {
        const tickMark = el('div', 'absolute');
        tickMark.style.left = `${fraction * 100}%`;
        tickMark.style.top = '0';
        tickMark.style.width = '1px';
        tickMark.style.height = '8px';
        tickMark.style.background = 'rgba(0,0,0,0.3)';
        tickMark.style.transform = 'translateX(-50%)';

        const tickLabel = el('div', 'absolute text-xs text-gray-400 -translate-x-1/2', Math.round(max * fraction).toString());
        tickLabel.style.border = '1px dashed cyan'; // DEBUG
        tickLabel.style.left = `${fraction * 100}%`;
        tickLabel.style.top = '8px';

        ruler.append(tickMark, tickLabel);
    });

    wrapper.appendChild(ruler);

    return wrapper;
};
