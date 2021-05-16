import { sanitizeString } from '../utils/sanitizeString';

/**
 * Object schema of a record that maps to a track data model
 * @public
 * @interface
 */
export interface TrackRecord {
    artist: string;
    title: string;
    playCount: string;
    genre: string[];
}

/**
 * The Track data model
 * @public
 * @class
 */
export class Track {
    /* **************** */
    /* ** Properties ** */
    /* **************** */

    /**
     * The name of the artist
     * @public
     * @type {string}
     */
    public artistName: string;

    /**
     * The title of the track
     * @public
     * @type {string}
     */
    public title: string;

    /**
     * The number of times this track has been played
     * @public
     * @type {number}
     */
    public playCount: number;

    /**
     * All genres this track belongs to
     * @public
     * @type {string}
     */
    public genres: string[];

    /* ****************** */
    /* ** Constructors ** */
    /* ****************** */

    /**
     * Creates a new instance of the data model
     * @public
     * @constructor
     */
    public constructor(record: TrackRecord) {
        // Map the record to the model
        this.artistName = sanitizeString(record.artist) || '';
        this.title = sanitizeString(record.title) || '';
        this.playCount = Number.parseInt(record.playCount) || 0;
        this.genres = sanitizeString(record.genre) || [];
    }

    /* ********************* */
    /* ** Getters/Setters ** */
    /* ********************* */

    /**
     * The id of the track
     * @public
     * @type {string}
     */
    public get id(): string {
        // Create a slug of the title for use as a database id
        const id = this.title.replace(/\W/, '');

        // Return the track id
        return id;
    }

    /**
     * The url at which the artist's image can be found
     * @public
     * @type {string}
     */
    public get artistImageUrl(): string {
        // Create a slug of the artists name
        const slug = this.artistName.replace(/\W/, '-');

        // Return the url at which the artist's image can be retrieved
        return `http://localhost:3000/images/artist/${slug}`;
    }

    /* ********************** */
    /* ** Instance Methods ** */
    /* ********************** */

    /**
     * Get the color associated with a specific genre
     * @public
     *
     * @param {string} genre - The genre to get the associated color for
     *
     * @returns {string} - The color associated with the passed in genre
     */
    public getColorForGenre(genre: string): string | null {
        // Define which genres map to which colors
        const colorMapping = {
            bossanova: '#E58A45',
            soul: '#8CD2DC',
            electronic: '#B9CA68',
            pop: '#D65965',
            alternative: '#6F4C9D',
            rock: '#43739A'
        };

        // Get the color for the provided genre
        const color = colorMapping[genre];

        // Return null if no color was found for the provided genre
        if (!color) {
            return null;
        }

        // Return the color associated with the passed in genre
        return color;
    }
}
