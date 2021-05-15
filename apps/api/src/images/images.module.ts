import { Module } from '@nestjs/common';

import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

/**
 * Module responsible for images
 * @public
 * @class
 */
@Module({
    providers: [ImagesService],
    controllers: [ImagesController],
    exports: [ImagesService]
})
export class ImagesModule {}
