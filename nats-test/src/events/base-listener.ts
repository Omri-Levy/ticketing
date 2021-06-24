import {Message, Stan} from 'node-nats-streaming';
import Subjects from './subjects';

interface Event {
	subject: Subjects;
	data: any;
}

abstract class Listener<T extends Event> {
	abstract subject: T['subject'];
	abstract queueGroupName: string;
	// 5 secs
	protected ackWait = 5 * 1000;
	private stan: Stan;

	constructor(stan: Stan) {
		this.stan = stan;
	}

	abstract onMessage(data: T['data'], msg: Message): void;

	subscriptionOptions() {
		return this.stan
			.subscriptionOptions()
			.setManualAckMode(true)
			.setAckWait(this.ackWait)
			.setDeliverAllAvailable()
			.setDurableName(this.queueGroupName);
	}

	listen() {
		const subscription = this.stan.subscribe(
			this.subject,
			this.queueGroupName,
			this.subscriptionOptions(),
		);

		subscription.on(`message`, (msg: Message) => {
			console.log(
				`Message received: ${this.subject} / ${this.queueGroupName}`,
			);

			const parsedData = this.parseMessage(msg);

			this.onMessage(parsedData, msg);
		});
	}

	parseMessage(msg: Message) {
		const data = msg.getData();

		return typeof data === `string`
			? JSON.parse(data)
			: JSON.parse(data.toString(`utf8`));
	}
}

export {Listener};
