import {FunctionComponent, useState} from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';
import NumberFormat from 'react-number-format';

const newTicket: FunctionComponent = () => {
	const [title, setTitle] = useState(``);
	const [price, setPrice] = useState(0);
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

	return (
		<div className={`card w-50 mx-auto mt-5`}>
			<div className='card-body'>
				<h1 className={`card-title`}>Create a ticket</h1>
				<form onSubmit={onSubmit}>
					<div className={`form-group`}>
						<label htmlFor='title'>Title</label>
						<input type='text' id={`title`}
							   className={`form-control`}
							   onChange={({target: {value}}) => setTitle(value)}
							   value={title}
						/>
					</div>
					<div className={`form-group mb-3`}>
						<label htmlFor='price'>Price</label>
						<NumberFormat
							id={`price`}
							className={`form-control`}
							displayType={`input`}
							value={price === 0 ? `` : price}
							onValueChange={({floatValue}) => {
								setPrice(Number(floatValue || 0));
							}}
							prefix={`$`}
							thousandSeparator={true}
							allowEmptyFormatting={true}
							allowNegative={false}
							fixedDecimalScale={true}
							decimalScale={price === 0 ? 0 : 2}
						/>
					</div>
					{errors}
					<button className='btn btn-primary'>Create</button>
				</form>
			</div>
		</div>
	);
};

export default newTicket;

