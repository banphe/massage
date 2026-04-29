const MONTHS = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];

export const MonthSelect = (year = new Date().getFullYear(), initialMonth = new Date().getMonth()) => {
    const select = document.createElement('select');
    select.className = 'select select-sm';
    MONTHS.forEach((name, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `${name} ${year}`;
        select.appendChild(opt);
    });
    select.value = initialMonth;
    return select;
};
