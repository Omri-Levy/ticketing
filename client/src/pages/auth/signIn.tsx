import {NextPage} from 'next';
import AuthForm from '../../components/AuthForm';

const signIn: NextPage = () => <AuthForm formType={`signIn`}/>;


export default signIn;

