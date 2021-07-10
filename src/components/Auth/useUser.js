import { useState } from "react";

export default function useUser() {

    var u = JSON.parse(window.sessionStorage.getItem('user'));
    const [user, setUser] = useState(
        u
    );

    return [user, setUser];
}