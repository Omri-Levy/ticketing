import {useState} from 'react';
import axios from 'axios';
import {HookReturns} from './types';

const useRequest: HookReturns = ({url, method, body, onSuccess}) => {
	const [errors, setErrors] = useState(null);
	const fetch = async (props?: Record<string | number | symbol, any>) => {
		try {
			setErrors(null);

			const res = await axios[method](url, {
				...body,
				...props,
			});

			if (onSuccess) {
				onSuccess(res.data);
			}

			return res.data;
		} catch (err) {
			console.error(err);

			setErrors(
				<div className='alert alert-danger'>
					<h4>Ooops..</h4>
					<ul>
						{err.response.data.errors
							? (
								err.response.data.errors?.map(({message}) => (
									<li key={message}>
										{message}
									</li>
								))
							)
							: (
								<li>
									Something went wrong..
								</li>
							)}
					</ul>
				</div>,
			);
		}
	};

	return {fetch, errors};
};

export default useRequest;
