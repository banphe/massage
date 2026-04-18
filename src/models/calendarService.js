
import DataRepository  from './DataRepository.js';

export class CalendarService {
    constructor(adapter) {
        this.adapter = adapter;
    }

    async loadData() {
        const methods = [];
        methods.push(DataRepository.getRooms());
        methods.push(DataRepository.getBookings());
        methods.push(DataRepository.getCustomers());
        const [rooms, bookings, customers] = await Promise.all(methods);

        const resources = this.adapter.toResources(rooms);
        const events = this.adapter.toEvents(bookings, customers);
        return { resources, events };
    }
}