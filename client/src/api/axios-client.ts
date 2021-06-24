import isServerSide from '../utils/functions/is-server-side';
import axios from 'axios';

// send requests using ingress-nginx's Kubernetes path if the request is
// server-sided, due to Next.js + Kubernetes behaviour.
const axiosClient = ({req}) => {
	if (isServerSide()) {
		const baseURL = process.env.NODE_ENV === `production`
			? `http://www.omrilevy-ticketing-app.xyz/`
			: `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local`;

		return axios.create({
			baseURL,
			headers: req.headers,
		});
	} else {
		return axios.create({
			baseURL: `/`,
		});
	}
};

export default axiosClient;
