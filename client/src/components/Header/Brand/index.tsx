import Link from 'next/link';
import React, {FunctionComponent} from 'react';

// returns a Next.js link with an anchor tag styled with Bootstrap's
// navbar-brand class. Expects the anchor's text as children prop.
const Brand: FunctionComponent = ({children}) => (
	<Link href={`/`}>
		<a className={`navbar-brand`}>
			{children}
		</a>
	</Link>
);

export default Brand;
