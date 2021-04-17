import { Body, Controller, Put } from '@nestjs/common';
import { RobotId } from '@zigzag/robot-factory/shared';
import { ShipmentService } from './shipment.service';

@Controller('shipments')
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {}

  @Put('create')
  createShipment(@Body() robotIds: RobotId[]) {
    return this.shipmentService.createShipment(robotIds);
  }
}
