import { useCallback, useState } from 'react';
import axios from 'axios';

const useAxios = () => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5012';
    const API = axios.create({
        baseURL: API_URL
    });

    const fetch = useCallback((url, options = {}) => {
        const { method = 'GET', headers = null, body = null } = options;

        setResponse(null);
        setError(null);
        setIsLoading(true);
        return API.request({
            url: url,
            method: method,
            headers: headers,
            data: body,
            ...options
        })
            .then(res => {
                setResponse(res);
                return res;
            })
            .catch(err => {
                setError(err.response);
                return err;
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [API]);

    return { fetch, response, error, isLoading };
};

export default useAxios;