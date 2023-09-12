import { useState } from "react";
import axios from 'axios';

const iplink = "http://172.27.0.1:3000/";

const usePut = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const link = iplink;

    const putData = async (url, payload) => {
        setLoading(true);
        try {
            const res = await axios.put(link + url, payload);
            return res.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, putData };
};

export default usePut;