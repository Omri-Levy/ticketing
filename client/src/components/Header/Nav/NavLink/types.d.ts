import {LinkProps} from 'next/link';
import {AnchorHTMLAttributes, DetailedHTMLProps} from 'react';

interface Props extends LinkProps {
	anchorProps?: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement>,
};

export {Props};
