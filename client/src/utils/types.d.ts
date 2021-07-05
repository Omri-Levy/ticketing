interface User {
	email: string;
	id: string;
}

// null if not authenticated
type CurrentUser = User | null;

interface CurrentUserProps {
	currentUser: CurrentUser;
}

export {CurrentUser, CurrentUserProps};
