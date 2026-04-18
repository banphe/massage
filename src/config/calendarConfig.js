export const getCalendarOptions = () => ({
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    initialView: 'resourceTimeGridDay',
    headerToolbar: false,
    slotMinTime: '10:00:00',
    slotMaxTime: '23:00:00',
    slotDuration: '00:30:00',
    allDaySlot: false,
    locale: 'pl',
    height: '100%',
    titleFormat: { year: '2-digit', month: '2-digit', day: '2-digit' },
    resources: [
        { id: 'duzy', title: 'DUŻY' },
        { id: 'maly', title: 'MAŁY' }
    ]
});
