import { useState } from "react";

export default function useApi() {
    const [api, setApi] = useState('http://localhost:8000/api');

    return [api, setApi];
}