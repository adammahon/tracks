/**
 * The VTag component
 * @public
 * @class
 * @extends HTMLElement
 */
export class VTag extends HTMLElement {
    /* ******************** */
    /* ** Component Name ** */
    /* ******************** */

    /**
     * The name of the component
     * @public
     * @static
     * @type {string}
     */
    public static componentName = 'v-tag';

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
     * The color of the component's text
     * @public
     * @type {string}
     */
    public get textColor(): string {
        return this.getAttribute('text-color') || '#000000';
    }

    /**
     * The background color of the component
     * @public
     * @type {string}
     */
    public get backgroundColor(): string {
        return this.getAttribute('background-color') || 'transparent';
    }

    /* ********************* */
    /* ** Lifecycle Hooks ** */
    /* ********************* */

    /**
     * Getter that outlines which component attributes are reactive
     * @public
     * @static
     * @type {string[]}
     */
    public static get observedAttributes(): string[] {
        return ['text-color', 'background-color'];
    }

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
                <span>
                    <slot></slot>
                </span>
                <style>
                    :host {
                        display: inline-block;
                        padding: 0.25rem;
                        color: ${this.textColor};
                        background-color: ${this.backgroundColor}
                    }
                </style>
            </div>
        `;
    }
}
