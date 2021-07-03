import {NextPage} from 'next';
import {Props} from '../../utils/pages/[orderId]/types';
import useRequest from '../../hooks/useRequest';
import {useEffect, useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import toDollars from '../../utils/functions/to-dollars';

// @ts-ignore
const showOrder: NextPage<Props> = ({order, currentUser}) => {
	const [secondsLeft, setSecondsLeft] = useState(0);
	const {fetch, errors} = useRequest({
		url: `/api/payments`,
		method: `post`,
		body: {
			orderId: order.id,
		},
		onSuccess: (payment) => Router.push(`/orders`),
	});

	useEffect(() => {
		const calcTimeLeft = () => {
			const currentTime = new Date();
			const expiresAt = new Date(order.expiresAt);
			// @ts-ignore
			// calculate the difference
			const expiresInMs = expiresAt - currentTime;

			setSecondsLeft(Math.floor(expiresInMs / 1000));
		};

		calcTimeLeft();

		const interval = setInterval(calcTimeLeft, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	if (secondsLeft <= 0) {
		return (
			<div className={`w-50 mx-auto card mt-5`}>
				<div className={`card-body`}>
					<h1 className={`card-title mb-5`}>Order expired.</h1>
					<a className={`btn btn-primary`} href={`/`}>
						Navigate To Homepage
					</a>
				</div>
			</div>
		);
	}


	return (
		<div className={`w-50 mx-auto card mt-5`}>
			<div className='card-body'>
				<h5 className={`card-title`}>Order's Details:</h5>
				<h6 className={`card-subtitle mb-3`}>{secondsLeft} seconds until
					order expires.</h6>
				<p className={`card-text`}>
					Tickets's Title: {order.ticket.title}
				</p>
				<p className={`card-text`}>
					Ticket's Price: {toDollars(order.ticket.price)}
				</p>
				<StripeCheckout
					token={(token) => fetch({token: token?.id})}
					stripeKey={`pk_test_51J5mAKIRdzKR5zq4XmZoObIYJvuhXJuZeTIDDeTEVwwXgNLCSxYeoqKZZjnkBBSyCVsSev0EExT68JWdmkHGcZal00IyUAEWXP`}
					amount={order.ticket.price * 100}
					email={currentUser.email}
				/>
				{errors}
			</div>
		</div>
	);
};

// @ts-ignore
showOrder.getInitialProps = async (context, client) => {
	const {orderId} = context.query;
	const {data} = await client.get(`/api/orders/${orderId}`);

	return {order: data};
};

export default showOrder;


