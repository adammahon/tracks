import { Controller, Get } from '@nestjs/common';
import { TracksService } from './tracks.service';

// Dto
import { FetchTopDto } from './dto/fetchTop.dto';

/**
 * Controller responsible for handling track related operations
 * @public
 * @class
 */
@Controller('tracks')
export class TracksController {
    public constructor(public service: TracksService) {}

    @Get('top.json')
    public async fetchTop(): Promise<FetchTopDto> {
        // Get the top tracks
        const tracks = await this.service.findTop();

        // Create the dto for this response
        const dto = new FetchTopDto();

        // Set the tracks into the dto
        dto.tracks = tracks;

        // Return the dto
        return dto;
    }
}
