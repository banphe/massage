import { el } from '../utils/dom.js';
import { getCalendarOptions } from '../config/calendarConfig.js';
import { Button } from '../components/atoms/Button.js';
import { JoinGroup } from '../components/atoms/JoinGroup.js';
import { ButtonGroup } from '../components/molecules/ButtonGroup.js';

export class CalendarView {
    constructor(container) {
        this.element = el('div', 'flex flex-col flex-1 w-full p-0 gap-4');
        container.appendChild(this.element);
        this.calendar = null;
        this.onViewChange = null;
        this.onNavigate = null;
    }

    mount(initialView = 'resourceTimeGridDay', resources, events) {
        const controls = el('div', 'flex flex-wrap gap-2 items-center bg-white p-4 rounded-lg shadow-md');
        
        const prevBtn = Button('<');
        const todayBtn = Button('Today');
        const nextBtn = Button('>');
        const navGroup = JoinGroup(prevBtn, todayBtn, nextBtn);
        
        const weekBtn = Button('W');
        const dayBtn = Button('D');
        const viewGroup = ButtonGroup(weekBtn, dayBtn, initialView === 'resourceTimeGridDay' ? 1 : 0);
        
        this.titleEl = el('span', 'font-bold text-lg ml-auto', 'Calendar');
        
        prevBtn.addEventListener('click', () => this.onNavigate('prev'));
        todayBtn.addEventListener('click', () => this.onNavigate('today'));
        nextBtn.addEventListener('click', () => this.onNavigate('next'));
        
        weekBtn.addEventListener('click', () => this.onViewChange('resourceTimeGridWeek'));
        dayBtn.addEventListener('click', () => this.onViewChange('resourceTimeGridDay'));
        
        controls.append(navGroup, viewGroup, this.titleEl);
        
        const calendarEl = el('div', 'bg-white rounded-lg shadow-md p-4 flex-1');
        
        const options = getCalendarOptions();
        options.resources = resources;
        options.events = events;
        this.calendar = new FullCalendar.Calendar(calendarEl, options);
        this.calendar.render();
        setTimeout(() => this.calendar.updateSize(), 0);
        this.element.append(controls, calendarEl);
    }
    
    changeView(view) {this.calendar.changeView(view);}
    updateTitle(title) {this.titleEl.textContent = title;}
    navigate(action) {this.calendar[action]();}
    
    show() {
            this.element.style.display = 'flex';
            if (this.calendar) this.calendar.updateSize();
    }
    
    hide() {
        this.element.style.display = 'none';
    }
}
