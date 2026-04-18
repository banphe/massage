import { el } from '../../utils/dom.js';
import { Button } from '../atoms/Button.js';
import { Divider } from '../atoms/Divider.js';
import { JoinGroup } from '../atoms/JoinGroup.js';
import { Stepper } from '../molecules/Stepper.js';
import { CardHeader } from '../layouts/CardHeader.js';

export const ParamsPanel = (params, onChange) => {
    const card = el('div', 'card bg-white border border-gray-300 shadow-md w-full md:w-140');
    const body = el('div', 'card-body gap-2 p-3');

    const pages = {};
    const refs = {};
    
    params.forEach(p => {
        if (!pages[p.page]) pages[p.page] = [];
        const stepper = Stepper(p.id, p.label, onChange);
        pages[p.page].push(stepper.element);
        refs[p.id] = stepper;
    });

    const pageEls = Object.entries(pages).map(([name, items]) => {
        const page = el('div', 'flex flex-col gap-2');
        page.name = name;
        items.forEach(item => page.appendChild(item));
        return page;
    });

    let currentIndex = 0;
    const display = el('span', 'label text-black', pageEls[0].name);
    const prev = Button('<', 'btn-sm');
    const next = Button('>', 'btn-sm');

    const updatePage = () => {
        display.textContent = pageEls[currentIndex].name;
        prev.disabled = currentIndex === 0;
        next.disabled = currentIndex === pageEls.length - 1;
        body.innerHTML = '';
        body.appendChild(pageEls[currentIndex]);
    };
    
    const update = (params) => {
        params.forEach(p => {
            const ref = refs[p.id];
            ref.value.textContent = p.value;
            ref.incBtn.disabled = !p.canInc;
            ref.decBtn.disabled = !p.canDec;
        });
    };

    prev.addEventListener('click', () => { currentIndex--; updatePage(); });
    next.addEventListener('click', () => { currentIndex++; updatePage(); });

    const header = CardHeader(display, JoinGroup(prev, next));
    
    card.append(header, Divider(), body);
    updatePage();
    
    return { element: card, update };
};
