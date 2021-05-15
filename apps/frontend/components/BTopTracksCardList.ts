import { Track } from '../models/Track';
import { BTrackCard } from './BTrackCard';

/**
 * Object schema of the top tracks response data
 * @private
 * @interface
 */
interface TopTracksRawResponse {
    tracks: {
        artist: string;
        title: string;
        playCount: string;
        genre: string[];
    }[];
}

/**
 * The BTopTracksCardList component
 * @public
 * @class
 * @extends HTMLElement
 */
export class BTopTracksCardList extends HTMLElement {
    /**********************/
    /*** Component Name ***/
    /**********************/

    /**
     * The name of the component
     * @public
     * @static
     * @type {string}
     */
    public static componentName = 'b-top-tracks-card-list';

    /***********************/
    /*** Component State ***/
    /***********************/

    /**
     * The tracks to display
     * @public
     * @type {Track[]}
     */
    public tracks: Track[] = [];

    /**
     * Flag indicating if the tracks are loading or not
     * @public
     * @type {boolean}
     */
    public loading = true;

    /*******************/
    /*** Constructor ***/
    /*******************/

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

    /***********************/
    /*** Lifecycle Hooks ***/
    /***********************/

    /**
     * Lifecycle hook that executes whenever the component is created in the document
     * @public
     * @async
     *
     * @returns {Promise<void>}
     */
    public async connectedCallback(): Promise<void> {
        // Render the component
        this.render();

        // Fetch the top tracks from the API
        await this.fetchTopTracks();

        // Re-render the component
        this.render();
    }

    /**
     * Lifecycle hook that executes whenever an attribute on the component changes
     * @public
     * @async
     *
     * @returns {Promise<void>}
     */
    public async attributeChangedCallback(): Promise<void> {
        // Render the component
        this.render();

        // Fetch the top tracks from the API
        await this.fetchTopTracks();

        // Re-render the component
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
        if (this.loading) {
            this.shadowRoot.innerHTML = '<p>Loading...</p>';
        } else {
            this.shadowRoot.innerHTML = '';

            this.tracks.map(t =>
                this.shadowRoot.appendChild(new BTrackCard(t))
            );
        }
    }

    /**
     * Fetch the top tracks from the API and set them into state
     * @public
     * @async
     *
     * @returns {Promise<void>}
     */
    public async fetchTopTracks(): Promise<void> {
        // Set loading flag
        this.loading = true;

        try {
            // Fetch the data
            const url = 'http://localhost:3000/tracks/top.json';
            const response = await fetch(url);
            const data: TopTracksRawResponse = await response.json();

            // Map the data to their respective data model
            const models = data.tracks.map(t => new Track(t));

            // Add the data models to state
            this.tracks = models;
        } catch (e) {
            this.tracks = [];
        }

        // Unset the loading flag
        this.loading = false;
    }
}
