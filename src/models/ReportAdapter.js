import { BOOKING_STATUS } from '../config/constants.js';

export class ReportAdapter {

    aggregateToMonthly(bookings, therapists = [], therapistDaysOff = []) {
        const monthsMap = {};
        const daysOffMap = this.#buildDaysOffMap(therapistDaysOff);

        const validBookings = bookings.filter(b =>
            b.status !== BOOKING_STATUS.CANCELLED &&
            b.status !== BOOKING_STATUS.NOSHOW
        );

        validBookings.forEach(booking => {
            if (!booking.start) return;

            const date = new Date(booking.start);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const day = date.getDate();

            if (!monthsMap[monthKey]) {
                monthsMap[monthKey] = {
                    key: monthKey,
                    monthName: date.toLocaleDateString('pl-PL', { month: 'long' }),
                    year: date.getFullYear(),
                    days: {},
                    totalNet: 0,
                    totalCount: 0,
                    utilization: { hoursWorked: 0, hoursAvailable: 0, percentage: 0 }
                };
            }

            if (!monthsMap[monthKey].days[day]) {
                const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const hoursAvailable = this.#calculateDayAvailableHours(therapists, dateStr, daysOffMap);
                monthsMap[monthKey].days[day] = {
                    day, net: 0, count: 0,
                    utilization: { hoursWorked: 0, hoursAvailable, percentage: 0 }
                };
            }

            const dayData = monthsMap[monthKey].days[day];
            const net = (booking.price || 0) - (booking.voucherAmount || 0);
            const duration = (new Date(booking.end) - new Date(booking.start)) / (1000 * 60 * 60);
            const therapistHours = (booking.services || []).length * duration;

            dayData.net += net;
            dayData.count += 1;
            dayData.utilization.hoursWorked += therapistHours;
            monthsMap[monthKey].totalNet += net;
            monthsMap[monthKey].totalCount += 1;
            monthsMap[monthKey].utilization.hoursWorked += therapistHours;
        });

        Object.values(monthsMap).forEach(month => {
            const daysInMonth = new Date(month.year, parseInt(month.key.split('-')[1]), 0).getDate();
            const fullDaysArray = [];

            for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = `${month.year}-${month.key.split('-')[1]}-${String(day).padStart(2, '0')}`;
                const hoursAvailable = this.#calculateDayAvailableHours(therapists, dateStr, daysOffMap);
                const dayData = month.days[day] || {
                    day, net: 0, count: 0,
                    utilization: { hoursWorked: 0, hoursAvailable: 0, percentage: 0 }
                };
                dayData.utilization.hoursAvailable = hoursAvailable;
                if (hoursAvailable > 0 && dayData.utilization.hoursWorked > 0)
                    dayData.utilization.percentage = Math.round((dayData.utilization.hoursWorked / hoursAvailable) * 100);
                fullDaysArray.push(dayData);
                month.utilization.hoursAvailable += hoursAvailable;
            }

            month.days = fullDaysArray;
            if (month.utilization.hoursAvailable > 0)
                month.utilization.percentage = Math.round((month.utilization.hoursWorked / month.utilization.hoursAvailable) * 100);
        });

        return Object.values(monthsMap).sort((a, b) => a.key.localeCompare(b.key));
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
