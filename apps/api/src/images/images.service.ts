import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Service responsible for handling image related operations
 * @public
 * @class
 */
@Injectable()
export class ImagesService {
    /**
     * Finds an image by the artists name
     * @public
     *
     * @returns {ReadStream | null} - The image if it was found, null otherwise
     */
    public async findArtistByName(name: string): Promise<fs.ReadStream | null> {
        try {
            // Create the path to the file
            const fileName = name.replace(/\..*/, '');
            const filePath = path.join(
                __dirname,
                `images/artists/${fileName}.jpg`
            );

            // Determine if the file exists or not
            let fileExists;
            try {
                // Access the file
                await fs.promises.access(filePath);

                // File could be accessed, which mean it exists
                fileExists = true;
            } catch {
                // File couldn't be accessed, which mean it doesn't exist
                fileExists = false;
            }

            // Return null if the file doesn't exists
            if (!fileExists) {
                return null;
            }

            // Return the image file stream
            return fs.createReadStream(filePath);
        } catch (e) {
            console.log('error');
            // Image couldn't be found, return null
            return null;
        }
    }
}
