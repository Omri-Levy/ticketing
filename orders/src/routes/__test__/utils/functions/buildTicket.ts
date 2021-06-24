import { Ticket } from '../../../../models/Ticket';
import genFakeMongoId from './genFakeMongoId';

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: genFakeMongoId(),
    title: `test title`,
    price: 20,
  });

  await ticket.save();

  return ticket;
};

export default buildTicket;
