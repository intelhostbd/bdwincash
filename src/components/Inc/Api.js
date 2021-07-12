import { useState } from "react";

export default function useApi() {
    const [api, setApi] = useState('https://backend.bdwincash.com/api');

    return [api, setApi];
}