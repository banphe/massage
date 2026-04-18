import { el } from '../utils/dom.js';
import { ButtonGroup } from '../components/molecules/ButtonGroup.js';
import { Button } from '../components/atoms/Button.js';
import { chart } from '../components/organisms/chart.js';
export class ReportView {
    constructor(container) {
        this.element = el('div', 'flex flex-col flex-1 w-full p-0 gap-2');
        container.appendChild(this.element);
        this.onPeriodChange = null;
        this.chart = null;
        this.lastOptions = null;
    }

    mount(initialPeriod,chartData) {
        const controls = el('div', 'flex gap-2 bg-white p-4 rounded-lg shadow-md');
        controls.style.border = '3px solid red'; // DEBUG
        const dayBtn = Button('D', 'btn-xs');
        const monthBtn = Button('M', 'btn-xs');
        dayBtn.addEventListener('click', () => this.onPeriodChange('d'));
        monthBtn.addEventListener('click', () => this.onPeriodChange('m'));
        
        const menu = ButtonGroup(dayBtn, monthBtn, initialPeriod === 'm' ? 1 : 0);
        controls.appendChild(menu);
        this.chartElement = el('div', 'flex flex-col p-0 bg-white rounded-lg shadow-md flex-1');
        this.chartElement.style.border = '3px solid blue'; // DEBUG
        this.chartElement.appendChild(chart(chartData));
        this.element.append(controls, this.chartElement);

    }

    show() {
        this.element.style.display = 'flex';
        //this.element.style.display = 'flex';
        //if (this.lastOptions) {
           // if (this.chart) this.chart.destroy();
           // this.chartElement.innerHTML = '';
            //const h = window.innerHeight - 290;
            //const options = this.lastOptions;
           // options.chart.height = h;
            //this.chart = new ApexCharts(this.chartElement, options);
            //this.chart.render();
        //}
    }
    
    hide() {this.element.style.display = 'none';}

    #getConfig(height) {
        const options = {};
        options.chart = {};
        options.chart.toolbar = {};
        options.plotOptions = {};
        options.plotOptions.bar = {};
        options.grid = {};
        options.grid.padding = {};
        options.dataLabels = {};
        options.noData = {};
        options.yaxis = {};
        options.tooltip = {};
        options.legend = {};
        //options.dataLabels.enabled = false;
        //options.noData.text = 'Brak danych';
        options.legend.show = false;
        options.chart.height = height;
        options.chart.type = 'bar';
        options.chart.toolbar.show = false;
        options.plotOptions.bar.borderRadius = 0;
        options.plotOptions.bar.horizontal = true;
        options.colors = ['#1e40af'];
        options.grid.show= false;
        options.grid.padding.top = 0;
        options.grid.padding.left = 0;
        options.grid.padding.right = 0;
        options.grid.padding.bottom = 0;
        options.series = [{ name: 'Dane', data: [] }];
        options.yaxis.tooltip = { enabled: false };
        options.dataLabels.enabled = false;
        options.tooltip = { enabled: false };
        return options;
    }

    updateChart(data) {
        //if (!this.chart) {
          // const h = this.chartElement.offsetHeight-15;
          // this.chart = new ApexCharts(this.chartElement, this.#getConfig('100%')); 
           //alert(`window.innerHeight: ${window.innerHeight}, offsetHeight: ${h}`);
           //this.chart.render();
        } 
        //this.chart.updateSeries([{ name: 'Dane', data }]);
        //this.chart.render(); 
        //this.lastOptions = options;
       // if (this.element.style.display === 'flex') this.show();
    //}
}
