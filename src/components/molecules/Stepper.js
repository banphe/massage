import { el } from '../../utils/dom.js';
import { Button } from '../atoms/Button.js';
import { JoinGroup } from '../atoms/JoinGroup.js';

export const Stepper = (id, label, onChange) => {
    const wrapper = el('div', 'flex items-center gap-2 w-full justify-between');
    const labelEl = el('span', 'label text-black', label);
    const decBtn = Button('-', 'btn-md');
    const valueEl = el('button', 'join-item btn w-12 btn-md', '0');
    const incBtn = Button('+', 'btn-md');

    decBtn.addEventListener('click', () => onChange(id, -1));
    incBtn.addEventListener('click', () => onChange(id, 1));

    const join = JoinGroup(decBtn, valueEl, incBtn);
    wrapper.append(labelEl, join);

    return { element: wrapper, value: valueEl, incBtn, decBtn };
};
