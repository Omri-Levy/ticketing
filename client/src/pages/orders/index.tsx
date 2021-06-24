import {NextPage} from 'next';

// @ts-ignore
const MyOrders: NextPage = ({orders}) => {

	return (
		<ul>
			{orders?.map((order) => (
				<li key={order.id}>
					{order.ticket.title} - {order.status}
				</li>
			))}
		</ul>
	);
};

// @ts-ignore
MyOrders.getInitialProps = async (context, client) => {
	const {data} = await client.get(`/api/orders`);

	return {orders: data};
};

export default MyOrders;

