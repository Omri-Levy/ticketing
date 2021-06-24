import mongoose, { Model } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Order, OrderStatus } from './Order';

// an interface that describes the properties that are required to create a
// new Ticket
interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}

// an interface that describes the properties that a Ticket Document has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;

  isReserved(): Promise<boolean>;
}

// an interface that describes the properties that a Ticket Model has
interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;

  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<TicketDoc | null>;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        /* eslint no-param-reassign: "off" */
        /* eslint no-underscore-dangle: "off" */
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

ticketSchema.set(`versionKey`, `version`);
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};

// handles concurrency issues of events being processed out of order causing
// data sync issues
ticketSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

// function keyword due to 'this' binding
ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this as TicketDoc,
    status: {
      $in: [
        OrderStatus.CREATED,
        OrderStatus.AWAITING_PAYMENT,
        OrderStatus.COMPLETE,
      ],
    },
  });

  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>(`Ticket`, ticketSchema);

export { Ticket, TicketDoc };
