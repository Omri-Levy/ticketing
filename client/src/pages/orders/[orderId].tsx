import {NextPage} from 'next';
import {Props} from '../../utils/pages/[orderId]/types';
import useRequest from '../../hooks/useRequest';
import {useEffect, useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';

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
		return <div>Order expired.</div>;
	}


	return (
		<div>
			<h1>{order.ticket.title}</h1>
			{secondsLeft} seconds until order expires.
			<StripeCheckout
				token={(token) => fetch({token: token?.id})}
				stripeKey={`pk_test_51J5mAKIRdzKR5zq4XmZoObIYJvuhXJuZeTIDDeTEVwwXgNLCSxYeoqKZZjnkBBSyCVsSev0EExT68JWdmkHGcZal00IyUAEWXP`}
				amount={order.ticket.price * 100}
				email={currentUser.email}
			/>
			{errors}
		</div>
	);
};

showOrder.getInitialProps = async (context, client) => {
	const {orderId} = context.query;
	const {data} = await client.get(`/api/orders/${orderId}`);

	return {order: data};
};

export default showOrder;


