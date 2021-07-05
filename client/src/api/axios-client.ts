import isServerSide from '../utils/functions/is-server-side';
import axios from 'axios';

// send requests using ingress-nginx's Kubernetes path if the request is
// server-sided, due to Next.js + Kubernetes behaviour.
const axiosClient = ({req}) => {
	if (isServerSide()) {
		return axios.create({
			baseURL: `http://omrilevy-ticketing-app.xyz`,
			headers: req.headers,
		});
	} else {
		return axios.create({
			baseURL: `/`,
		});
	}
};

export default axiosClient;
