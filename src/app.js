import { NavBar } from './components/organisms/NavBar.js';
import { BottomNav } from './components/organisms/BottomNav.js';
import { CalendarView } from './views/calendarView.js';
import { ReportView } from './views/reportView.js';
import { CalendarPresenter } from './presenters/calendarPresenter.js';
import { ReportPresenter } from './presenters/reportPresenter.js';
import { NavLink } from './components/atoms/NavLink.js';
import { CalendarAdapter } from './models/CalendarAdapter.js';
import { CalendarService } from './models/calendarService.js';
import { ReportAdapter } from './models/ReportAdapter.js';
import { ReportService } from './models/reportService.js';

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

const calAdapter = new CalendarAdapter();
const calendarService = new CalendarService(calAdapter);
const calData = await calendarService.loadData();
new CalendarPresenter(calV, calData.resources, calData.events);

const reportAdapter = new ReportAdapter();
const reportService = new ReportService(reportAdapter);
const reportPresenter = new ReportPresenter(chatV, reportService);
await reportPresenter.init();
