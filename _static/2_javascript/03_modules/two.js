class Writer {
    constructor(element) {
        this.element=element;
    }
    output(text, color) {
        this.element.innerHTML+='<div style="color:'+color+'">'+text+'</div>';
    }

    red(text) {
        this.output(text, 'red');
    }
    green(text) {
        this.output(text, 'green');
    }
}

export { Writer };