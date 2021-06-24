import {CurrentUserProps} from '../../types';

interface Props extends CurrentUserProps {
	order: {
		id: string;
		userId: string;
		status: string;
		expiresAt: string;
		ticket: {
			title: string;
			price: number;
			version: number;
		},
		version: number;
	}
};

export {Props};
