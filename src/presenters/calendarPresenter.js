export class CalendarPresenter {
    constructor(view, resources, events) {
        this.view = view;
        this.currentView = 'resourceTimeGridDay';
        this.view.onViewChange = this.#changeView.bind(this);
        this.view.onNavigate = this.#navigate.bind(this);
        
        this.view.mount(this.currentView, resources, events);
        this.#updateTitle();
    }
    
    #changeView(view) {
        this.currentView = view;
        this.view.changeView(view);
        this.#updateTitle();
    }
    
    #navigate(action) {
        this.view.navigate(action);
        this.#updateTitle();
    }
    
    #updateTitle() {
        const title = this.view.calendar.view.title;
        this.view.updateTitle(title);
    }
}
