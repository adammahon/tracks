/**
 * Object schema of a select field option
 * @private
 * @interface
 */
interface SelectOption {
    label: string;
    value: string | number | boolean;
}

/**
 * All possible fields in which the track list can be sorted by
 * @public
 * @enum
 */
export enum SortBy {
    Artist = 'artistName',
    Title = 'title',
    PlayCount = 'playCount'
}

/**
 * All possible ways the track list can be sorted by
 * @public
 * @enum
 */
export enum SortType {
    Ascending = 'asc',
    Descending = 'desc'
}

/**
 * The BTopTracksFormControls component
 * @public
 * @class
 * @extends HTMLElement
 */
export class BTopTracksFormControls extends HTMLElement {
    /* ******************** */
    /* ** Component Name ** */
    /* ******************** */

    /**
     * The name of the component
     * @public
     * @static
     * @type {string}
     */
    public static componentName = 'b-top-tracks-form-controls';

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
     * The default value of the sort by field
     * @public
     * @type {string}
     */
    public get defaultSortBy(): string {
        return this.getAttribute('sort-by') || '';
    }

    /**
     * The default value of the sort type field
     * @public
     * @type {string}
     */
    public get defaultSortType(): string {
        return this.getAttribute('sort-type') || SortType.Ascending;
    }

    /* ********************* */
    /* ** Component State ** */
    /* ********************* */

    /**
     * The value of the sort by field
     * @private
     * @type {string}
     */
    private _sortBy = '';

    /**
     * The value of the sort by field
     * @public
     * @type {string}
     */
    public get sortBy(): string {
        // Return the default sort by if none is set in state
        if (!this._sortBy) {
            return this.defaultSortBy;
        }

        // Return the sort by value
        return this._sortBy;
    }

    /**
     * The value of the sort by field
     * @public
     * @type {string}
     */
    public set sortBy(value: string) {
        this._sortBy = value;
    }

    /**
     * The value of the sort type field
     * @private
     * @type {string}
     */
    private _sortType = '';

    /**
     * The value of the sort type field
     * @public
     * @type {string}
     */
    public get sortType(): string {
        // Return the default sort type if none is set in state
        if (!this._sortType) {
            return this.defaultSortType;
        }

        // Return the sort type value
        return this._sortType;
    }

    /**
     * The value of the sort type field
     * @public
     * @type {string}
     */
    public set sortType(value: string) {
        this._sortType = value;
    }

    /* ********************* */
    /* ** Getters/Setters ** */
    /* ********************* */

    /**
     * The options to populate in the sort by select field
     * @public
     * @type {SelectOption[]}
     */
    public get sortByOptions(): SelectOption[] {
        // Create the list of options with an empty options
        const options: SelectOption[] = [
            {
                label: '',
                value: ''
            }
        ];

        // Create a list of all enum keys
        const enumKeys = Object.keys(SortBy).filter(k => Number.isNaN(+k));

        // Loop through all possible sort by fields and add them as an option
        for (const value of enumKeys) {
            options.push({
                value: SortBy[value],
                label: value
                    .split(/(?=[A-Z])/)
                    .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
                    .join(' ')
            });
        }

        // Return the list of options
        return options;
    }

    /**
     * The options to populate in the sort type select field
     * @public
     * @type {SelectOption[]}
     */
    public get sortTypeOptions(): SelectOption[] {
        // Create the list of options
        const options: SelectOption[] = [];

        // Create a list of all enum keys
        const enumKeys = Object.keys(SortType).filter(k => Number.isNaN(+k));

        // Loop through all possible sort type fields and add them as an option
        for (const value of enumKeys) {
            options.push({
                value: SortType[value],
                label: value
                    .split(/(?=[A-Z])/)
                    .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
                    .join(' ')
            });
        }

        // Return the list of options
        return options;
    }

    /* ********************* */
    /* ** Lifecycle Hooks ** */
    /* ********************* */

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
     * Event listener for when the sort by field changes
     * @public
     *
     * @param {Event} event - The triggered event
     *
     * @returns {void}
     */
    public onChangeSortBy(event: Event): void {
        // Prevent bubbling and the default behavior
        event.preventDefault();
        event.stopPropagation();

        // Set the value of the field in state
        this.sortBy = (event.target as HTMLSelectElement).value;

        // Dispatch the custom onSort event
        this.onSort();
    }

    /**
     * Event listener for when the sort type field changes
     * @public
     *
     * @param {Event} event - The triggered event
     *
     * @returns {void}
     */
    public onChangeSortType(event: Event): void {
        // Prevent bubbling and the default behavior
        event.preventDefault();
        event.stopPropagation();

        // Set the value of the field in state
        this.sortType = (event.target as HTMLSelectElement).value;

        // Dispatch the custom onSort event
        this.onSort();
    }

    /**
     * Event emitter for when the list should be sorted
     * @public
     *
     * @returns {void}
     */
    public onSort(): void {
        // Dispatch the custom onSort event
        this.dispatchEvent(
            new CustomEvent('onSort', {
                bubbles: true,
                composed: true,
                detail: {
                    sortBy: this.sortBy,
                    sortType: this.sortType
                }
            })
        );
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
                <label for="sortBy">Sort By:</label>
                <select name="sortBy" id="sortBy">
                    ${this.sortByOptions.reduce(
                        (html, o) =>
                            (html += `
                                <option
                                    value="${o.value}"
                                    ${o.value === this.sortBy ? 'selected' : ''}
                                >
                                    ${o.label}
                                </option>
                            `),
                        ''
                    )}
                </select>
                <select name="sortType" id="sortType">
                    ${this.sortTypeOptions.reduce(
                        (html, o) =>
                            (html += `
                                <option
                                    value="${o.value}"
                                    ${
                                        o.value === this.sortType
                                            ? 'selected'
                                            : ''
                                    }
                                >
                                    ${o.label}
                                </option>
                            `),
                        ''
                    )}
                </select>
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
        // Get the form fields
        const sortByField = this.shadowRoot.querySelector('#sortBy');
        const sortTypeField = this.shadowRoot.querySelector('#sortType');

        // Attach the event listener if the sort by field was found in the shadow dom
        if (sortByField) {
            sortByField.addEventListener('change', e => this.onChangeSortBy(e));
        }

        // Attach the event listener if the sort type field was found in the shadow dom
        if (sortTypeField) {
            sortTypeField.addEventListener('change', e =>
                this.onChangeSortType(e)
            );
        }
    }
}
