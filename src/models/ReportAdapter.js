import { BOOKING_STATUS } from '../config/constants.js';

const toDateStr = date =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export class ReportAdapter {

    aggregateToMonthly(bookings, therapists = [], therapistDaysOff = []) {
        const daysOffMap = this.#buildDaysOffMap(therapistDaysOff);

        const dateStats = {};
        bookings
            .filter(b => b.status !== BOOKING_STATUS.CANCELLED && b.status !== BOOKING_STATUS.NOSHOW && b.start)
            .forEach(({ start, end, price = 0, voucherAmount = 0, services = [] }) => {
                const date = new Date(start);
                const dateStr = toDateStr(date);
                const duration = (new Date(end) - date) / 3_600_000;
                if (!dateStats[dateStr]) dateStats[dateStr] = { net: 0, hoursWorked: 0, count: 0 };
                dateStats[dateStr].net += price - voucherAmount;
                dateStats[dateStr].hoursWorked += services.length * duration;
                dateStats[dateStr].count += 1;
            });

        const monthKeys = [...new Set(Object.keys(dateStats).map(d => d.slice(0, 7)))].sort();

        return monthKeys.map(monthKey => {
            const [year, month] = monthKey.split('-').map(Number);
            const daysInMonth = new Date(year, month, 0).getDate();
            let totalNet = 0, totalCount = 0, totalHoursWorked = 0, totalHoursAvailable = 0;

            const days = Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dateStr = `${monthKey}-${String(day).padStart(2, '0')}`;
                const { net = 0, hoursWorked = 0, count = 0 } = dateStats[dateStr] ?? {};
                const hoursAvailable = this.#calculateDayAvailableHours(therapists, dateStr, daysOffMap);
                const percentage = hoursAvailable > 0 && hoursWorked > 0
                    ? Math.round((hoursWorked / hoursAvailable) * 100) : 0;

                totalNet += net;
                totalCount += count;
                totalHoursWorked += hoursWorked;
                totalHoursAvailable += hoursAvailable;

                return { day, net, count, utilization: { hoursWorked, hoursAvailable, percentage } };
            });

            const monthPercentage = totalHoursAvailable > 0
                ? Math.round((totalHoursWorked / totalHoursAvailable) * 100) : 0;

            return {
                key: monthKey,
                monthName: new Date(year, month - 1, 1).toLocaleDateString('pl-PL', { month: 'long' }),
                year, days, totalNet, totalCount,
                utilization: { hoursWorked: totalHoursWorked, hoursAvailable: totalHoursAvailable, percentage: monthPercentage }
            };
        });
    }

    forChart(mode, data, selectedMonth, metric) {
        return mode === 'daily'
            ? this.#daily(selectedMonth.days, metric)
            : this.#monthly(data, metric);
    }

    forDropdown(data) {
        return data.map(month => ({ key: month.key, label: `${month.monthName} ${month.year}` }));
    }

    #daily(daysArray, metric) {
        return daysArray.map(day => ({ x: `${day.day}`, y: this.#extractDayMetric(day, metric) }));
    }

    #monthly(data, metric) {
        return data.map(month => ({ x: month.monthName.substring(0, 3), y: this.#extractMonthMetric(month, metric) }));
    }

    #extractDayMetric(day, metric) {
        switch (metric) {
            case 'revenue':     return Math.round(day.net);
            case 'utilization': return day.utilization.percentage;
            case 'hours':       return parseFloat(day.utilization.hoursWorked.toFixed(1));
            case 'zlh':         return day.utilization.hoursWorked > 0 ? Math.round(day.net / day.utilization.hoursWorked) : 0;
            default:            return 0;
        }
    }

    #extractMonthMetric(month, metric) {
        switch (metric) {
            case 'revenue':     return Math.round(month.totalNet);
            case 'utilization': return month.utilization.percentage;
            case 'hours':       return parseFloat(month.utilization.hoursWorked.toFixed(1));
            case 'zlh':         return month.utilization.hoursWorked > 0 ? Math.round(month.totalNet / month.utilization.hoursWorked) : 0;
            default:            return 0;
        }
    }

    #buildDaysOffMap(therapistDaysOff) {
        const map = {};
        therapistDaysOff.forEach(dayOff => { map[`${dayOff.date}_${dayOff.therapist}`] = true; });
        return map;
    }

    #calculateDayAvailableHours(therapists, dateStr, daysOffMap) {
        return therapists.filter(t => !daysOffMap[`${dateStr}_${t.name}`]).length * 13;
    }
}
