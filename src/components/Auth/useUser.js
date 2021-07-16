import { useState } from "react";

export default function useUser() {

    const [user, setUser] = useState(
        JSON.parse(window.localStorage.getItem('user'))
    );

    return [user, setUser];
}