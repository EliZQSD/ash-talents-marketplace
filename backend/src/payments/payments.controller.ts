import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private service: PaymentsService) {}

  @Post('create-intent')
  @UseGuards(AuthGuard('jwt'))
  async createPaymentIntent(@Body() body: { amount: number; dealId: string }) {
    return this.service.createPaymentIntent(body.amount, body.dealId);
  }

  @Get('confirm/:intentId')
  @UseGuards(AuthGuard('jwt'))
  async confirmPayment(@Param('intentId') intentId: string) {
    return this.service.confirmPayment(intentId);
  }
}
