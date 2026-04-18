import { el } from '../../utils/dom.js';
import { Button } from '../atoms/Button.js';
import { Divider } from '../atoms/Divider.js';
import { ButtonGroup } from '../molecules/ButtonGroup.js';
import { StatCard } from '../molecules/StatCard.js';
import { CardHeader } from '../layouts/CardHeader.js';

const formatBep = (value, period) => {
    if (period === 'm') return `${Math.round(value)} h`;
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    return `${hours}h ${minutes}min`;
};

export const ResultsPanel = (initialPeriod, onPeriodChange) => {
    const card = el('div', 'card bg-white border border-gray-300 shadow-md w-full md:w-140 flex-1');
    
    const title = el('h2', '', 'Wyniki');
    
    const dayBtn = Button('D', 'btn-xs');
    const monthBtn = Button('M', 'btn-xs');
    dayBtn.addEventListener('click', () => onPeriodChange('d'));
    monthBtn.addEventListener('click', () => onPeriodChange('m'));
    
    const header = CardHeader(title, ButtonGroup(dayBtn, monthBtn, initialPeriod === 'm' ? 1 : 0));

    const body = el('div', 'card-body gap-2 p-3');

    const wyko = StatCard('Wykorzystanie', 'blue');
    const bep = StatCard('BEP', 'purple');
    const przychod = StatCard('Przychód', 'green');
    const dochod = StatCard('Dochód', 'blue');

    const row1 = el('div', 'flex gap-2 w-full');
    const row2 = el('div', 'flex gap-2 w-full');
    
    row1.append(wyko.element, bep.element);
    row2.append(dochod.element, przychod.element);
    body.append(row1, row2);

    card.append(header, Divider(), body);
    
    const update = (results, period) => {
        const { salonUsage, revenue, income, breakEven } = results;
        wyko.value.textContent = `${Math.round(salonUsage)}%`;
        przychod.value.textContent = `${Math.round(revenue)} zł`;
        dochod.value.textContent = `${Math.round(income)} zł`;
        bep.value.textContent = formatBep(breakEven, period);
    };
    
    return { element: card, update };
};
