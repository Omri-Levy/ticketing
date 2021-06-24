import mongoose, { Model } from 'mongoose';
import { OrderStatus } from '@omrilevyorg/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { TicketDoc } from './Ticket';

// an interface that describes the properties that are required to create a
// new Order
interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

// an interface that describes the properties that a Order Document has
interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
  version: number;
}

// an interface that describes the properties that a Order Model has
interface OrderModel extends Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.CREATED,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Ticket`,
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

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>(`Order`, orderSchema);

export { Order, OrderStatus };
