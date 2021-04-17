import { Module, Scope } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotsController } from './robots/robots.controller';
import { RobotsService } from './robots/robots.service';
import { ShipmentsController } from './shipments/shipments.controller';
import { ShipmentService } from './shipment/shipment.service';
import { ShipmentController } from './shipment/shipment.controller';

@Module({
  imports: [],
  controllers: [AppController, RobotsController, ShipmentsController, ShipmentController],
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
