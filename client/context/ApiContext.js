import React, { useCallback, createContext, useContext } from 'react';
import axios from 'axios';
import {UserContext} from './UserContext';

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
    const { setUserContext } = useContext(UserContext);
    const url = 'https://9cf7-61-0-187-38.ngrok.io'

    const get = useCallback(
        async (endpoint) => {
            return axios.get(`${url}/${endpoint}`)
                .then(res => {
                    return { success: true, errorMsg: '', response: res.data };
                })
                .catch(err => {
                    console.log(`${url}/${endpoint} err`, err);
                    return { success: false, errorMsg: err.message, response: {} };
                })
                .finally(() => console.log('finally'));
        }
    );
    const post = useCallback(
        async (endpoint, data) => {
            return axios.post(`${url}/${endpoint}`, data)
                .then(res => {
                    return { success: true, errorMsg: '', response: res.data };
                })
                .catch(err => {
                    console.log(`${url}/${endpoint} err`, err);
                    return { success: false, errorMsg: err.message, response: {} };
                })
                .finally(() => console.log('finally'));
        }
    );

    // POST
    const signUp = useCallback(
        async data => {
            console.log('api ', data);
            const response = await post('api/signup', data);
            if (response.success) {
                setUserContext({ token: response.token })
            }
        },
        [post]
    );

    return (
        <ApiContext.Provider value={{ signUp }}>
            {children}
        </ApiContext.Provider>
    )
}

export default ApiContextProvider;