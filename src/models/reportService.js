import DataRepository from './DataRepository.js';

export class ReportService {
    constructor(adapter) {
        this.adapter = adapter;
    }

    async loadData() {
        const [bookings, therapists, therapistDaysOff] = await Promise.all([
            DataRepository.getBookings(),
            DataRepository.getTherapists(),
            DataRepository.getTherapistDaysOff(),
        ]);
        return this.adapter.aggregateToMonthly(bookings, therapists, therapistDaysOff);
    }
}
