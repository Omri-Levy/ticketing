import mongoose, { Model } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// an interface that describes the properties that are required to create a
// new Order
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
  orderId?: string;
}

// an interface that describes the properties that a Order Document has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  orderId?: string;
  version: number;
}

// an interface that describes the properties that a Order Model has
interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
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
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
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

ticketSchema.set(`versionKey`, `version`);
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>(`Ticket`, ticketSchema);

export default Ticket;
