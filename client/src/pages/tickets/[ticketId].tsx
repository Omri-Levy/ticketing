import {NextPage} from 'next';
import {Props} from '../../utils/pages/[ticketId]/types';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const showTicket: NextPage<Props> = ({ticket}) => {
	const {fetch, errors} = useRequest({
		url: `/api/orders`,
		method: `post`,
		body: {
			ticketId: ticket.id,
		},
		onSuccess: (order) => (
			Router.push(`/orders/[orderId]`, `/orders/${order.id}`)
		),
	});

	return (
		<div>
			<h1>{ticket.title}</h1>
			<h4>Price: {ticket.price}</h4>
			{errors}
			{/* wrapped the onClick so the event object won't count
			 towards the optional fetch props */}
			<button className='btn btn-primary' onClick={() => fetch()}>Purchase
			</button>
		</div>
	);
};

showTicket.getInitialProps = async (context, client) => {
	const {ticketId} = context.query;
	const {data} = await client.get(`/api/tickets/${ticketId}`);

	return {ticket: data};
};

export default showTicket;
