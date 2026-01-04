import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, || '', {
      apiVersion: '2023-10-16',
    } as any);
  }

  async createPaymentIntent(amount: number, dealId: string): Promise<any> {
    return this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { dealId },
    });
  }

  async confirmPayment(intentId: string): Promise<any> {
    return this.stripe.paymentIntents.retrieve(intentId);
  }
}
