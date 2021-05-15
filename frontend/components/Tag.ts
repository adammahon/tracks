/*  */
export class VTag extends HTMLElement {
    /*  */
    public static componentName = 'v-tag';

    /*  */
    public connectedCallback() {
        this.innerHTML = 'Hello World';
    }
}
