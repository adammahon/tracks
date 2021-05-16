import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

// Entities
import { Track } from './track.entity';

/**
 * Object schema of the top tracks file content
 * @private
 * @interface
 */
interface TopTracksFileContent {
    tracks: {
        artist: string;
        title: string;
        playCount: string;
        genre: string[];
    }[];
}

/**
 * Service responsible for handling track related operations
 * @public
 * @class
 */
@Injectable()
export class TracksService {
    /**
     * Finds top tracks
     * @public
     *
     * @returns {Track[]} - All tracks within the "database"
     */
    public async findTop(): Promise<Track[]> {
        try {
            // Create the path to the file
            const filePath = path.join(__dirname, 'data/top.json');

            // Get the json from the file
            const content = await fs.promises.readFile(filePath);
            const json: TopTracksFileContent = JSON.parse(content.toString());

            // Map the file content to the entity
            return json.tracks.map(t => {
                // Declare a new track
                const track = new Track();

                // Set the track's properties
                track.artist = t.artist;
                track.title = t.title;
                track.playCount = Number.parseInt(t.playCount);
                track.genre = t.genre;

                // Return the track
                return track;
            });
        } catch (e) {
            console.log(e);
            // File contents couldn't be retrieved or mapped, return an empty array
            return [];
        }
    }
}
