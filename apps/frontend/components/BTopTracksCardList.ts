// Models
import { Track } from '../models/Track';

// Components
import { VTrackCard } from './VTrackCard';

// Misc.
import { SortBy, SortType } from './BTopTracksFormControls';

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
 * The BTopTracks component
 * @public
 * @class
 * @extends HTMLElement
 */
export class BTopTracksCardList extends HTMLElement {
    /* ******************** */
    /* ** Component Name ** */
    /* ******************** */

    /**
     * The name of the component
     * @public
     * @static
     * @type {string}
     */
    public static componentName = 'b-top-tracks-card-list';

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
     * The field in which the track list should be sorted by
     * @public
     * @type {SortBy | null}
     */
    public get sortBy(): SortBy | null {
        // Get the prop value
        const sortBy = this.getAttribute('sort-by');

        // Return null if no sort by prop was provided
        if (!sortBy) {
            return null;
        }

        // Convert the sort by string into the respective enum
        switch (sortBy.toLowerCase()) {
            case SortBy.Artist.toLowerCase():
                return SortBy.Artist;
            case SortBy.Title.toLowerCase():
                return SortBy.Title;
            case SortBy.PlayCount.toLowerCase():
                return SortBy.PlayCount;
            default:
                return null;
        }
    }

    /**
     * The type of sort that should be performed
     * @public
     * @type {SortType}
     */
    public get sortType(): SortType {
        // Get the prop value
        const sortType = this.getAttribute('sort-type');

        // Return null if no sort type prop was provided
        if (!sortType) {
            return SortType.Ascending;
        }

        // Convert the sort type string into the respective enum
        switch (sortType.toLowerCase()) {
            case SortType.Ascending.toLowerCase():
                return SortType.Ascending;
            case SortType.Descending.toLowerCase():
                return SortType.Descending;
            default:
                return SortType.Ascending;
        }
    }

    /* ********************* */
    /* ** Component State ** */
    /* ********************* */

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

    /* ********************* */
    /* ** Getters/Setters ** */
    /* ********************* */

    /**
     * All tracks sorted by the selected field
     * @public
     * @type {Track[]}
     */
    public get sortedTracks(): Track[] {
        // Get the field to sort by and the type of sort to perform
        const sortBy = this.sortBy;
        const sortType = this.sortType;

        // Return in the same order as which the API responded if no sort by has been set
        if (!sortBy || !sortType) {
            return this.tracks;
        }

        // Return a sorted list of tracks
        return this.tracks.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) {
                if (sortType === SortType.Ascending) {
                    return -1;
                } else {
                    return 1;
                }
            }

            if (a[sortBy] > b[sortBy]) {
                if (sortType === SortType.Ascending) {
                    return 1;
                } else {
                    return -1;
                }
            }

            return 0;
        });
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
        return ['sort-by'];
    }

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
        if (this.loading) {
            this.shadowRoot.innerHTML = '<p>Loading...</p>';
        } else {
            this.shadowRoot.innerHTML = `
                <div>
                    <style>
                        div {
                            display: flex;
                            justify-content: space-evenly;
                            width: 80%;
                            margin: auto;
                        }
                    </style>
                </div>
            `;

            // Get the root element of this component
            const parent = this.shadowRoot.querySelector('div');

            // Add the tracks to the root element
            if (parent) {
                this.sortedTracks.map(t =>
                    parent.appendChild(new VTrackCard(t))
                );
            }
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
