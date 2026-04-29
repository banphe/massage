import { el } from '../utils/dom.js';
import { ButtonGroup } from '../components/molecules/ButtonGroup.js';
import { Button } from '../components/atoms/Button.js';
import { IconButton } from '../components/atoms/IconButton.js';
import { MonthSelect } from '../components/atoms/MonthSelect.js';
import { chart } from '../components/organisms/chart.js';
import { METRICS } from '../config/reportConfig.js';

export class ReportView {
    constructor(container) {
        this.element = el('div', 'flex flex-col flex-1 w-full p-0 gap-2');
        container.appendChild(this.element);
        this.onPeriodChange = null;
    }

    mount(initialPeriod, chartData) {
        const controls = el('div', 'flex gap-2 items-center bg-white p-4 rounded-lg shadow-md');

        const dayBtn = Button('D', 'btn-xs');
        const monthBtn = Button('M', 'btn-xs');
        const periodGroup = ButtonGroup(dayBtn, monthBtn, initialPeriod === 'm' ? 1 : 0);

        const monthSelect = MonthSelect();
        monthSelect.style.display = initialPeriod === 'd' ? '' : 'none';

        const metricBtns = METRICS.map(({ icon }) => IconButton(icon));
        const metricGroup = ButtonGroup(...metricBtns, 0);

        dayBtn.addEventListener('click', () => {
            monthSelect.style.display = '';
            this.onPeriodChange?.('d');
        });
        monthBtn.addEventListener('click', () => {
            monthSelect.style.display = 'none';
            this.onPeriodChange?.('m');
        });

        controls.append(periodGroup, monthSelect, metricGroup);
        this.chartElement = el('div', 'flex flex-col p-0 bg-white rounded-lg shadow-md flex-1');
        this.chartElement.appendChild(chart(chartData));
        this.element.append(controls, this.chartElement);
    }

    show() { this.element.style.display = 'flex'; }
    hide() { this.element.style.display = 'none'; }
    updateChart(data) {}
}
