import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

// Modules
import { ImagesModule } from './images/images.module';
import { TracksModule } from './tracks/tracks.module';

/**
 * Root application module
 * @public
 * @class
 */
@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '../..', 'frontend'),
            renderPath: 'index.html'
        }),
        ImagesModule,
        TracksModule
    ]
})
export class AppModule {}
