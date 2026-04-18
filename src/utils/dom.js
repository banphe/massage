export const el = (tag, classes = '', text = '') => {
    const element = document.createElement(tag);
    if (classes) classes.split(' ').forEach(c => element.classList.add(c));
    if (text) element.textContent = text;
    return element;
};

export const toggleClass = (element, className, condition) => 
    element.classList.toggle(className, condition);
