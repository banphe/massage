export class ReportPresenter {
    constructor(view) {
        this.view = view;
        this.period = 'm';
        this.view.onPeriodChange = this.#changePeriod.bind(this);
        this.view.mount(this.period, this.#getMockData(this.period));
    }

    #changePeriod(period) {
        this.period = period;
        this.view.updateChart(this.#getMockData(period));
    }

    #getMockData(period) {
        return [
            { x: 'Styczeń', y: 1400 },
            { x: 'Luty',    y: 1800 },
            { x: 'Marzec',  y: 1900 }
        ];
    }
}
