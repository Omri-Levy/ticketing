import 'bootstrap/dist/css/bootstrap.css';
import Layout from '../components/Layout';
import axiosClient from '../api/axios-client';
import {Props} from '../utils/pages/app/types';

const AppComponent = ({Component, pageProps, currentUser}: Props) => (
	<Layout currentUser={currentUser}>
		<Component currentUser={currentUser} {...pageProps} />
	</Layout>
);

AppComponent.getInitialProps = async (appContext) => {
	const client = axiosClient(appContext.ctx);
	const {data} = await client.get(`/api/users/currentUser`);
	let pageProps = {};

	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(appContext.ctx,
			client, data.currentUser);
	}

	return {
		pageProps,
		...data,
	};
};

export default AppComponent;
