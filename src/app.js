import { NavBar } from './components/organisms/NavBar.js';
import { BottomNav } from './components/organisms/BottomNav.js';
import { CalendarView } from './views/calendarView.js';
import { ReportView } from './views/reportView.js';
import { CalendarPresenter } from './presenters/calendarPresenter.js';
import { ReportPresenter } from './presenters/reportPresenter.js';
import { NavLink } from './components/atoms/NavLink.js';
import { CalendarAdapter } from './models/CalendarAdapter.js';
import { CalendarService } from './models/calendarService.js';

document.body.classList.add('h-dvh', 'flex', 'flex-col', 'overflow-hidden', 'bg-gray-100');

const navBar = NavBar('daisyUI');
const root = document.createElement('div');
root.classList.add('flex', 'flex-col', 'flex-1', 'overflow-auto', 'p-2', 'gap-0', 'bg-gray-300', 'w-full', 'items-center');
document.body.append(navBar, root);

const calV = new CalendarView(root);
const chatV = new ReportView(root);

const calLnk = NavLink(calV, 'Calendar', 'fa-calendar');
const chatLnk = NavLink(chatV, 'Report', 'fa-chart-line');

window.location.hash ||= '#/calendar';
const bottomNavBar = BottomNav([calLnk, chatLnk]);
document.body.append(bottomNavBar);

const adapter  = new CalendarAdapter();
const calendarService = new CalendarService(adapter);
const data = await calendarService.loadData();
new CalendarPresenter(calV, data.resources, data.events);
new ReportPresenter(chatV);


