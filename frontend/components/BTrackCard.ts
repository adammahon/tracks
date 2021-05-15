import { Track } from '../models/Track';

/**
 * The BTrackCard component
 * @public
 * @class
 * @extends HTMLElement
 */
export class BTrackCard extends HTMLElement {
    /**********************/
    /*** Component Name ***/
    /**********************/

    /**
     * The name of the component
     * @public
     * @static
     * @type {string}
     */
    public static componentName = 'b-track-card';

    /*******************/
    /*** Constructor ***/
    /*******************/

    /**
     * Creates a new instance of this component
     * @public
     * @constructor
     */
    public constructor(track: Track = null) {
        super();

        //
        if (track) {
            this.track = track;
        }

        // Create the shadow dom for this component
        this.attachShadow({ mode: 'open' });
    }

    /***********************/
    /*** Component Props ***/
    /***********************/

    /**
     * The color of the component's text
     * @public
     * @type {Track}
     */
    public track: Track | null = null;

    /***********************/
    /*** Lifecycle Hooks ***/
    /***********************/

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

    /**********************/
    /*** Public Methods ***/
    /**********************/

    /**
     * Renders the contents of this component
     * @public
     *
     * @returns {void}
     */
    public render(): void {
        if (!this.track) {
            this.shadowRoot.innerHTML = '<p>Loading...</p>';
        } else {
            this.shadowRoot.innerHTML = `
                <p>${this.track.artistName}</p>
            `;
        }
    }
}
