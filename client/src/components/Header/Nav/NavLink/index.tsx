import {FunctionComponent} from 'react';
import Link from 'next/link';
import {Props} from './types';
import {useRouter} from 'next/router';

const NavLink: FunctionComponent<Props> = ({
											   children,
											   href,
											   anchorProps,
										   }) => {
	const router = useRouter();
	const isActive = router.asPath === href;
	const activeClass = isActive ? `active` : undefined;

	return (
		<li className={`nav-item`}>
			<Link href={href}>
				<a
					className={`nav-link ${activeClass}`}
					aria-current={isActive}
					{...anchorProps}
				>
					{children}
				</a>
			</Link>
		</li>
	);
};

export default NavLink;
