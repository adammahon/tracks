import { Module } from '@nestjs/common';

import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';

/**
 * Module responsible for track data
 * @public
 * @class
 */
@Module({
    providers: [TracksService],
    controllers: [TracksController],
    exports: [TracksService]
})
export class TracksModule {}
