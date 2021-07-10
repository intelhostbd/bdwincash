import axios from "axios";
import { useState } from "react";
import useApi from "../Inc/Api";
import Auth from './Auth';
import useUser from './useUser';

export default function useCheckIsAdmin() {
    const [user, setUser] = useUser();
    const [isAdmin, setIsAdmin] = useState(123);
    const [api, setApi] = useApi();

    if (!Auth()) {
        return false;
    }

    axios.post(`${api}/check-is-admin`, {
            user_id: user.id,
        })
        .then(res => {
            setIsAdmin(res.data.isAdmin);
        });

    return isAdmin;
}