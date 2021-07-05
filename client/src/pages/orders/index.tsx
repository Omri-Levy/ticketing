import {NextPage} from 'next';

// @ts-ignore
const MyOrders: NextPage = ({orders}) => {

	return (
		<table className={`table`}>
			<thead>
			<tr>
				<th scope={`col`}>Order</th>
				<th scope={`col`}>Status</th>
			</tr>
			</thead>
			<tbody>
			{orders?.length === 0 && (
				<tr>
					<td>No Orders</td>
					<td>No Orders</td>
				</tr>
			)}
			{orders?.map((order) => (
				<tr>
					<td>{order?.ticket.title}</td>
					<td className={`text-capitalize`}>{order?.status}</td>
				</tr>
			))}
			</tbody>
		</table>
	);
};

// @ts-ignore
MyOrders.getInitialProps = async (context, client) => {
	const {data} = await client.get(`/api/orders`);

	return {orders: data};
};

export default MyOrders;

