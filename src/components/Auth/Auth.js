import axios from 'axios';
import useApi from '../Inc/Api';
import useUser from '../Auth/useUser';

const Auth = () => {
    // const [user, setUser] = useUser();
    // const [api, setApi] = useApi();

    if (window.sessionStorage.getItem('user')) {


        return true;
    }

    return false;
}

export default Auth;