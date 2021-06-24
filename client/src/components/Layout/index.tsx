import {FunctionComponent} from 'react';
import Header from '../Header';
import {Props} from './types';

const Layout: FunctionComponent<Props> = ({children, currentUser}) => (
	<>
		<Header currentUser={currentUser}/>
		<main className={'container'}>
			<section>{children}</section>
		</main>
	</>
);

export default Layout;
