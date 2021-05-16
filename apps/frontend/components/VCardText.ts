/**
 * The VCardText component
 * @public
 * @class
 * @extends HTMLElement
 */
export class VCardText extends HTMLElement {
    /* ******************** */
    /* ** Component Name ** */
    /* ******************** */

    /**
     * The name of the component
     * @public
     * @static
     * @type {string}
     */
    public static componentName = 'v-card-text';

    /* ***************** */
    /* ** Constructor ** */
    /* ***************** */

    /**
     * Creates a new instance of this component
     * @public
     * @constructor
     */
    public constructor() {
        super();

        // Create the shadow dom for this component
        this.attachShadow({ mode: 'open' });
    }

    /* ********************* */
    /* ** Component Props ** */
    /* ********************* */

    /**
     * The alignment of the text content
     * @public
     * @type {string}
     */
    public get textAlign(): string {
        return this.getAttribute('text-align') || '';
    }

    /* ********************* */
    /* ** Lifecycle Hooks ** */
    /* ********************* */

    /**
     * Lifecycle hook that executes whenever the component is created in the document
     * @public
     *
     * @returns {void}
     */
    public connectedCallback(): void {
        this.render();
    }

    /**
     * Lifecycle hook that executes whenever an attribute on the component changes
     * @public
     *
     * @returns {void}
     */
    public attributeChangedCallback(): void {
        this.render();
    }

    /* ******************** */
    /* ** Public Methods ** */
    /* ******************** */

    /**
     * Renders the contents of this component
     * @public
     *
     * @returns {void}
     */
    public render(): void {
        this.shadowRoot.innerHTML = `
            <div>
                <slot></slot>
                <style>
                    div {
                        display: block;
                        padding: 1rem;
                        text-align: ${this.textAlign}
                    }
                </style>
            </div>
        `;
    }
}
