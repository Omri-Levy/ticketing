interface User {
	email: string;
	id: string;
}

type CurrentUser = User | null;

interface CurrentUserProps {
	currentUser: CurrentUser;
}

export {CurrentUser, CurrentUserProps};
