import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotsController } from './robots/robots.controller';
import { RobotsService } from './robots/robots.service';

import { ShipmentService } from './shipment/shipment.service';
import { ShipmentController } from './shipment/shipment.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    RobotsController,
    ShipmentController,
    ShipmentController,
  ],
  providers: [
    AppService,
    {
      provide: RobotsService,
      useValue: new RobotsService(),
    },
    ShipmentService,
  ],
})
export class AppModule {}
