import {FunctionComponent, useState} from 'react';
import {Props} from './types';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

// changes the submit request url, form title and submit button text
// based on the formType (signUp | signIn).
const AuthForm: FunctionComponent<Props> = ({formType}) => {
	const [email, setEmail] = useState(``);
	const [password, setPassword] = useState(``);
	const {fetch, errors} = useRequest({
		url: `/api/users/${formType}`,
		method: 'post',
		body: {
			email,
			password,
		},
		onSuccess: () => Router.push(`/`),
	});
	const onSubmit = async (event) => {
		event.preventDefault();

		await fetch();
	};
	const title = formType === `signIn` ? `Sign In` : `Sign Up`;


	return (
		<form onSubmit={onSubmit}>
			<h1>{title}</h1>
			<div className={'form-group'}>
				<label htmlFor='email'>Email:</label>
				<input
					className={'form-control'}
					type='text' id={'email'}
					name={'email'}
					onChange={({target: {value}}) => setEmail(value)}
					value={email}
				/>
			</div>
			<div className={'form-group mb-3'}>
				<label htmlFor='password'>Password:</label>
				<input
					className={'form-control'}
					type='password'
					id={'password'}
					name={'password'}
					onChange={({target: {value}}) => setPassword(value)}
					value={password}
				/>
			</div>
			{errors}
			<button className='btn btn-primary'>{title}</button>
		</form>
	);
};

export default AuthForm;
