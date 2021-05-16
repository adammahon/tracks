import { Track } from '../models/Track';

/**
 * The VTrackCard component
 * @public
 * @class
 * @extends HTMLElement
 */
export class VTrackCard extends HTMLElement {
    /* ******************** */
    /* ** Component Name ** */
    /* ******************** */

    /**
     * The name of the component
     * @public
     * @static
     * @type {string}
     */
    public static componentName = 'v-track-card';

    /* ***************** */
    /* ** Constructor ** */
    /* ***************** */

    /**
     * Creates a new instance of this component
     * @public
     * @constructor
     */
    public constructor(track: Track = null) {
        super();

        // Set the track to render
        this.track = track || null;

        // Create the shadow dom for this component
        this.attachShadow({ mode: 'open' });
    }

    /* ********************* */
    /* ** Component Props ** */
    /* ********************* */

    /**
     * The color of the component's text
     * @public
     * @type {Track}
     */
    public track: Track | null = null;

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
        if (!this.track) {
            this.shadowRoot.innerHTML = '<p>Loading...</p>';
        } else {
            this.shadowRoot.innerHTML = `
                <v-card width="300">
                    <div class="img"></div>
                    <v-card-title>${this.track.artistName}</v-card-title>
                    <v-card-subtitle>${this.track.title}</v-card-subtitle>
                    <v-card-text text-align="center">
                        ${this.track.genres.reduce(
                            (html, g) =>
                                (html += `
                                    <v-tag
                                        text-color="#FFFFFF"
                                        background-color="${this.track.getColorForGenre(
                                            g
                                        )}"
                                    >
                                        ${g}
                                    </v-tag>
                                `),
                            ''
                        )}
                    </v-card-text>
                    <style>
                        .img {
                            width: 100%;
                            height: 300px;
                            background: url(${this.track.artistImageUrl});
                            background-repeat: no-repeat;
                            background-size: cover;
                        }
                    </style>
                </v-card>
            `;
        }
    }
}
