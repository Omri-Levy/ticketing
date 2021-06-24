import {NextPage} from 'next';
import AuthForm from '../../components/AuthForm';

const signUp: NextPage = () => <AuthForm formType={`signUp`}/>;

export default signUp;

