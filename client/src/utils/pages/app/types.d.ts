import {CurrentUserProps} from '../../types';
import {AppProps} from 'next/app';

type ExtendedAppProps = AppProps & CurrentUserProps;

interface Props extends ExtendedAppProps {

};

export {Props};
