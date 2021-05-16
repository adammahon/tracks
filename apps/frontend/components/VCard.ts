/**
 * The VCard component
 * @public
 * @class
 * @extends HTMLElement
 */
export class VCard extends HTMLElement {
    /* ******************** */
    /* ** Component Name ** */
    /* ******************** */

    /**
     * The name of the component
     * @public
     * @static
     * @type {string}
     */
    public static componentName = 'v-card';

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
     * The height of the component
     * @public
     * @type {string}
     */
    public get height(): string {
        const height = this.getAttribute('height') || 'auto';
        const numHeight = Number.parseFloat(height);

        // Check if the height was successfully converted into a number
        if (Number.isNaN(numHeight)) {
            // Couldn't convert number, use raw value
            return height;
        }

        // Return the converted number
        return `${numHeight}px`;
    }

    /**
     * The width of the component
     * @public
     * @type {string}
     */
    public get width(): string {
        const width = this.getAttribute('width') || 'auto';
        const numWidth = Number.parseFloat(width);

        // Check if the width was successfully converted into a number
        if (Number.isNaN(numWidth)) {
            // Couldn't convert number, use raw value
            return width;
        }

        // Return the converted number
        return `${numWidth}px`;
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
        return ['height', 'width'];
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
                <slot></slot>
                <style>
                    div {
                        display: flex;
                        flex-direction: column;
                        height: ${this.height};
                        width: ${this.width};
                        border: 1px solid #B0B0B0;
                        border-radius: 5px;
                        background-color: #FFFFFF;
                    }
                </style>
            </div>
        `;
    }
}
