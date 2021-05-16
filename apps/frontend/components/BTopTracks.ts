/**
 * The BTopTracks component
 * @public
 * @class
 * @extends HTMLElement
 */
export class BTopTracks extends HTMLElement {
    /* ******************** */
    /* ** Component Name ** */
    /* ******************** */

    /**
     * The name of the component
     * @public
     * @static
     * @type {string}
     */
    public static componentName = 'b-top-tracks';

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
     * The title to display
     * @public
     * @type {string}
     */
    public get title(): string {
        return this.getAttribute('title') || '';
    }

    /* ********************* */
    /* ** Component State ** */
    /* ********************* */

    /**
     * The field to sort by
     * @public
     * @type {string}
     */
    public sortBy = '';

    /**
     * The type of sort to perform
     * @public
     * @type {string}
     */
    public sortType = '';

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
        return ['title'];
    }

    /**
     * Lifecycle hook that executes whenever the component is created in the document
     * @public
     * @async
     *
     * @returns {Promise<void>}
     */
    public async connectedCallback(): Promise<void> {
        this.render();
        this.attachEvents();
    }

    /**
     * Lifecycle hook that executes whenever an attribute on the component changes
     * @public
     * @async
     *
     * @returns {Promise<void>}
     */
    public async attributeChangedCallback(): Promise<void> {
        this.render();
        this.attachEvents();
    }

    /* ********************* */
    /* ** Event Listeners ** */
    /* ********************* */

    /**
     * Event listener for when the sort by type changes
     * @public
     *
     * @param {Event} event - The triggered event
     *
     * @returns {void}
     */
    public onSort(event: Event): void {
        // Prevent bubbling and the default behavior
        event.preventDefault();
        event.stopPropagation();

        // Set the sort by field into state
        this.sortBy = (event as CustomEvent).detail.sortBy;
        this.sortType = (event as CustomEvent).detail.sortType;

        // Re-render the component when necessary
        if (this.sortBy && this.sortType) {
            this.render();
            this.attachEvents();
        }
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
                <span>${this.title}</span>
                <b-top-tracks-form-controls sort-by="${this.sortBy}" sort-type="${this.sortType}"></b-top-tracks-form-controls>
                <b-top-tracks-card-list sort-by="${this.sortBy}" sort-type="${this.sortType}"></b-top-tracks-card-list>
                <slot></slot>
                <style>
                    div {
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                    }

                    div span {
                        font-size: 2.5rem;
                        line-height: 2.5rem;
                        font-weight: bold;
                        margin-top: 1rem;
                        margin-bottom: 0.5rem;
                    }

                    div b-top-tracks-form-controls {
                        margin-bottom: 2rem;
                    }
                </style>
            </div>
        `;
    }

    /**
     * Attaches all necessary event listeners for this component
     * @public
     *
     * @returns {void}
     */
    public attachEvents(): void {
        // Get the sort by field
        const rootElement = this.shadowRoot.querySelector('div');

        // Attach the event listener if the sort by field was found in the shadow dom
        if (rootElement) {
            rootElement.addEventListener('onSort', e => this.onSort(e));
        }
    }
}
