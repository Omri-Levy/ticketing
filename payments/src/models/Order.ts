import mongoose, { Model } from 'mongoose';
import { OrderStatus } from '@omrilevyorg/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// an interface that describes the properties that are required to create a
// new Order
interface OrderAttrs {
  id: string;
  userId: string;
  status: OrderStatus;
  price: number;
  version: number;
}

// an interface that describes the properties that a Order Document has
interface OrderDoc extends mongoose.Document {
  id: string;
  userId: string;
  status: OrderStatus;
  price: number;
  version: number;
}

// an interface that describes the properties that a Order Model has
interface OrderModel extends Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;

  findByEvent(event: { id: string; version: number }): Promise<OrderDoc | null>;
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
    price: {
      type: Number,
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

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    userId: attrs.userId,
    status: attrs.status,
    price: attrs.price,
    version: attrs.version,
  });
};

// handles concurrency issues of events being processed out of order causing
// data sync issues
orderSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Order.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>(`Order`, orderSchema);

export { Order, OrderStatus };
