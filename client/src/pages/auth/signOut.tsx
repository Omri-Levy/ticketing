import {NextPage} from 'next';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';
import {useEffect} from 'react';

const signOut: NextPage = () => {
	const {fetch, errors} = useRequest({
		url: `/api/users/signOut`,
		method: 'post',
		body: {},
		onSuccess: () => Router.push(`/`),
	});

	useEffect(() => {
		(async () => {
			await fetch();
		})();
	}, []);

	return (
		<>
			<div>Signing out...</div>
			{errors}
		</>
	);
};

export default signOut;

