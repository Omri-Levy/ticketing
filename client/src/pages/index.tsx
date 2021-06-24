import {NextPage} from 'next';
import Link from 'next/link';
import React from 'react';
import {Props} from '../utils/pages/index/types';

const Home: NextPage<Props> = ({tickets}) => {
	const ticketList = tickets?.map((ticket) => (
		<tr key={ticket.id}>
			<td>{ticket.title}</td>
			<td>{ticket.price}</td>
			<td>
				<Link
					href={`/tickets/[ticketId]`}
					as={`/tickets/${ticket.id}`}
				>
					<a>View</a>
				</Link>
			</td>
		</tr>
	));

	return (
		<div>
			<h1>Tickets</h1>
			<table className='table'>
				<thead>
				<tr>
					<th scope={`col`}>Title</th>
					<th scope={`col`}>Price</th>
					<th scope={`col`}>Link</th>
				</tr>
				</thead>
				<tbody>
				{ticketList}
				</tbody>
			</table>
		</div>
	);
};

Home.getInitialProps = async (context, client) => {
	const {data} = await client.get(`/api/tickets`);

	return {tickets: data};
};

export default Home;

