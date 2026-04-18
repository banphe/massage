import { JoinGroup } from '../atoms/JoinGroup.js';

export const ButtonGroup = (...args) => {
    const activeIndex = typeof args[args.length - 1] === 'number' ? args.pop() : -1;
    const buttons = args;
    
    const setActive = (activeBtn) => {
        buttons.forEach(btn => btn.classList.remove('btn-primary'));
        activeBtn.classList.add('btn-primary');
    };

    buttons.forEach((btn, index) => {
        if (index === activeIndex) btn.classList.add('btn-primary');
        btn.addEventListener('click', () => setActive(btn));
    });
    
    return JoinGroup(...buttons);
};
