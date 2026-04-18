export const getChartOptions = () => ({
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, horizontal: true } },
    colors: ['#1e40af'],
    grid: { padding: { top: -20 } },
    series: [{ name: 'Dane', data: [] }],
    dataLabels: { enabled: false }
});
