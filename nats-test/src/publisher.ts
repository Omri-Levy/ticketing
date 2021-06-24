import {connect} from 'node-nats-streaming';
import TicketCreatedPublisher from './events/ticket-created-publisher';

console.clear();

const stan = connect(`ticketing`, `abc`, {
	url: `http://localhost:4222`,
});

stan.on(`connect`, async () => {
	console.log(`publisher connected to NATS`);

	const publisher = new TicketCreatedPublisher(stan);

	try {
		await publisher.publish({
			id: `123`,
			title: `title`,
			price: 20,
		});
	} catch (err) {
		console.error(err);
	}
});

