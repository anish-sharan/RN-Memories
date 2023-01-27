import React, { useCallback, createContext, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { MemoryContext } from './MemoryContext';
import config from '../config';
import { parseMemory } from '../utils/dataparser';

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
    const { setUserContext, userContext } = useContext(UserContext);
    const { setMemoryContext, memoryContext } = useContext(MemoryContext);

    const url = 'http://59b6-117-198-10-193.ngrok.io';

    // const url = config.URL;
    const token = userContext.token;

    const get = useCallback(
        async (endpoint, header) => {
            return axios.get(`${url}/${endpoint}`, header)
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
                setUserContext({ token: response.response.token });
                console.log('JWT ', response.response.token);
            }
            await getMemory();
            return response;
        },
        [post]
    );

    // ADDING MEMORY
    const addMemory = useCallback(
        async data => {
            const response = await post('api/memory', data);
            return response;
        },
        [post]
    );

    // GET

    // GET MEMORY
    const getMemory = useCallback(
        async () => {
            console.log("GET MEMORY CALLED");
            const response = await get('api/memory', {} , { headers: { "Authorization": `Bearer ${token}` } });
            let res = parseMemory(response)
            console.log('res from api context ', res)
            setMemoryContext({ memories: { res } })
            return res;
        },
        [get]
    );


    return (
        <ApiContext.Provider value={{ signUp, signIn, addMemory, getMemory }}>
            {children}
        </ApiContext.Provider>
    )
}

export default ApiContextProvider;