import {
    Controller,
    Get,
    Param,
    Header,
    Res,
    Response,
    NotFoundException
} from '@nestjs/common';
import { ImagesService } from './images.service';

/**
 * Controller responsible for handling image related operations
 * @public
 * @class
 */
@Controller('images')
export class ImagesController {
    public constructor(public service: ImagesService) {}

    @Get('artist/:name')
    @Header('Content-Type', 'image/jpeg')
    public async fetchArtistByName(
        @Param() params: any,
        @Res() response: Response
    ): Promise<NodeJS.WritableStream> {
        // Get the file stream
        const stream = await this.service.findArtistByName(params.name);

        // Return a 404 error if the image wasn't found
        if (!stream) {
            throw new NotFoundException();
        }

        // Pipe the response to the stream
        // @ts-ignore - Typing doesn't work here due to bug in nest.js types
        return stream.pipe(response);
    }
}
