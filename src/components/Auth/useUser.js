import axios from "axios";
import { useState } from "react";
import useApi from "../Inc/Api";

export default function useUser() {

    var u = JSON.parse(window.sessionStorage.getItem('user'));
    const [user, setUser] = useState(
        u
    );

    const [api] = useApi();

    return [user, setUser];
}