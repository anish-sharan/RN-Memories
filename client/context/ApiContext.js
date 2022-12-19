import React, { useCallback, createContext, useContext } from 'react';
import axios from 'axios';
import {UserContext} from './UserContext';

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
    const { setUserContext } = useContext(UserContext);
    const url = 'http://a8d5-59-95-86-45.ngrok.io'

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

    // SIGNING USER 
    const signUp = useCallback(
        async data => {
            const response = await post('api/signup', data);
            if (response.success) {
                setUserContext({ token: response.response.token })
            }
            return response;
        },
        [post]
    );

    // LOGIN USER
    const signIn = useCallback(
        async data => {
            const response = await post('api/signin', data);
            if (response.success) {
                setUserContext({ token: response.response.token })
            }
            return response;
        },
        [post]
    );

    return (
        <ApiContext.Provider value={{ signUp, signIn }}>
            {children}
        </ApiContext.Provider>
    )
}

export default ApiContextProvider;