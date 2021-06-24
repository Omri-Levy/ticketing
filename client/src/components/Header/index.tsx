import Nav from './Nav';
import NavLink from './Nav/NavLink';
import {FunctionComponent, useMemo} from 'react';
import {Props} from './types';

const Header: FunctionComponent<Props> = ({currentUser}) => {
	const links = useMemo(() => [
		!currentUser && {label: `Sign Up`, href: `/auth/signUp`},
		!currentUser && {label: `Sign In`, href: `/auth/signIn`},
		currentUser && {label: `My Orders`, href: `/orders`},
		currentUser && {label: `Sell Tickets`, href: `/tickets/newTicket`},
		currentUser && {label: `Sign Out`, href: `/auth/signOut`},
	], [currentUser]);

	return (
		<header>
			<Nav brand={`GitTix`}>
				{links?.map((link) => {
					if (!link) {
						return null;
					}

					const {href, label} = link;

					return (
						<NavLink href={href} key={href}>
							{label}
						</NavLink>
					);
				})}
			</Nav>
		</header>
	);
};

export default Header;
