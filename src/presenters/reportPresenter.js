import { getChartOptions } from '../config/chartConfig.js';

export class ReportPresenter {
    constructor(view) {
        this.view = view;
        this.period = 'm';
        this.view.onPeriodChange = this.#changePeriod.bind(this);
        const data = this.#getMockData(this.period);
        this.view.mount(this.period, data);
        //this.#update();
    }
    
    #changePeriod(period) {
        this.period = period;
        this.#update();
    }
    
    #update() {
        const data = this.#getMockData(this.period);
        //this.view.mount(this.period, options);
        this.view.updateChart(data);
    }
    
    #getMockData(period) {
        const multiplier = { d: 1, w: 7, m: 30 }[period] || 30;
        return [
            { x: 'Styczeń', y: 1400 },
            { x: 'Luty', y: 1800 },
            { x: 'Marzec', y: 1900 }
        ];
    }
}
