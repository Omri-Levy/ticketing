import mongoose, { Model } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// an interface that describes the properties that are required to create a
// new Payment
interface PaymentAttrs {
  stripeId: string;
  orderId: string;
}

// an interface that describes the properties that a Payment Document has
interface PaymentDoc extends mongoose.Document {
  stripeId: string;
  orderId: string;
  version: number;
}

// an interface that describes the properties that a Payment Model has
interface PaymentModel extends Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;

  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<PaymentDoc | null>;
}

const orderSchema = new mongoose.Schema(
  {
    stripeId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        /* eslint no-underscore-dangle: "off" */
        /* eslint no-param-reassign: "off" */
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

orderSchema.set(`versionKey`, `version`);
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

// handles concurrency issues of events being processed out of order causing
// data sync issues
orderSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Payment.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  `Payment`,
  orderSchema,
);

export { Payment };
