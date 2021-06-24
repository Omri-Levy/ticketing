import {FunctionComponent, useState} from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const newTicket: FunctionComponent = () => {
	const [title, setTitle] = useState(``);
	const [price, setPrice] = useState(``);
	const {fetch, errors} = useRequest({
		url: `/api/tickets`,
		method: `post`,
		body: {
			title,
			price,
		},
		onSuccess: () => Router.push(`/`),
	});
	const onSubmit = async (event) => {
		event.preventDefault();

		await fetch();
	};
	const onBlur = () => {
		const value = parseFloat(price);

		if (isNaN(value)) {
			return;
		}

		setPrice(value.toFixed(2));
	};

	return (
		<div>
			<h1>Create a ticket</h1>
			<form onSubmit={onSubmit}>
				<div className={`form-group`}>
					<label htmlFor='title'>Title</label>
					<input type='text' id={`title`} className={`form-control`}
						   onChange={({target: {value}}) => setTitle(value)}
						   value={title}
					/>
				</div>
				<div className={`form-group mb-3`}>
					<label htmlFor='price'>Price</label>
					<input type='text' id={`price`} className={`form-control`}
						   onBlur={onBlur}
						   onChange={({target: {value}}) => setPrice(value)}
						   value={price}
					/>
				</div>
				{errors}
				<button className='btn btn-primary'>Submit</button>
			</form>
		</div>
	);
};

export default newTicket;

