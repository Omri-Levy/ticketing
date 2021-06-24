import {CurrentUserProps} from '../../types';

interface Props extends CurrentUserProps {
	tickets: {
		id: string;
		userId: string;
		title: string;
		price: number;
		version: number;
	}[]
};

export {Props};
