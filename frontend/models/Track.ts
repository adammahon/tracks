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
}
