import {NextPage} from 'next';
import {Props} from '../../utils/pages/[ticketId]/types';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';
import toDollars from '../../utils/functions/to-dollars';

// @ts-ignore
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
		<div className={`card d-flex w-50 mt-5 mx-auto`}>
			<img
				src='https://picsum.photos/400/400'
				alt='ticket-image'
				className={`card-img-top`}
				style={{
					objectFit: `cover`,
					aspectRatio: `16/9`,
				}}
			/>
			<div className={`card-body`}>
				<h5 className={`card-title`}>Title: {ticket.title}</h5>
				<h6 className={`card-subtitle mb-2`}>
					Price: {toDollars(Number(ticket.price))}
				</h6>
				{errors}
				{/* wrapped the onClick so the event object won't count
				 towards the optional fetch props */}
				<button className='btn btn-primary'
						onClick={() => fetch()}>Purchase
				</button>
			</div>
		</div>
	);
};

// @ts-ignore
showTicket.getInitialProps = async (context, client) => {
	const {ticketId} = context.query;
	const {data} = await client.get(`/api/tickets/${ticketId}`);

	return {ticket: data};
};

export default showTicket;
