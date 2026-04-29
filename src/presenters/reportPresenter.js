export class ReportPresenter {
    #mode = 'monthly';
    #metric = 'revenue';
    #data = null;
    #selectedMonth = null;

    constructor(view, service) {
        this.view = view;
        this.service = service;
    }

    async init() {
        this.#data = await this.service.loadData();
        this.#selectedMonth = this.#data[this.#data.length - 1];

        this.view.onPeriodChange = p => { this.#mode = p === 'm' ? 'monthly' : 'daily'; this.#update(); };
        this.view.onMetricChange = m => { this.#metric = m; this.#update(); };
        this.view.onMonthChange = k => { this.#selectedMonth = this.#data.find(m => m.key === k); this.#update(); };

        this.view.mount('m', this.#chartData());
        this.view.setMonthOptions(this.service.adapter.forDropdown(this.#data), this.#selectedMonth.key);
    }

    #update() { this.view.updateChart(this.#chartData()); }

    #chartData() {
        return this.service.adapter.forChart(this.#mode, this.#data, this.#selectedMonth, this.#metric);
    }
}
