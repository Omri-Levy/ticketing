import {FunctionComponent} from 'react';
import Brand from '../Brand';
import {Props} from './types';

const Nav: FunctionComponent<Props> = ({children, brand}) => (
	<nav className={`navbar navbar-expand-lg navbar-light bg-light`}>
		<div className={`container-fluid`}>
			<Brand>{brand}</Brand>
			<div className='d-flex justify-content-end'>
				<ul className={`nav navbar-nav`}>
					{children}
				</ul>
			</div>
		</div>
	</nav>
);

export default Nav;
