import React, { useCallback, createContext, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { MemoryContext } from "./MemoryContext";
import config from "../config";
import { parseMemory } from "../utils/dataparser";

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
  const { setUserContext, userContext } = useContext(UserContext);
  const { setMemoryContext, memoryContext } = useContext(MemoryContext);
  //   const url = config.URL;
  const url = "http://5ae7-59-95-85-211.ngrok.io";
  const token = userContext.token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const get = useCallback(async (endpoint) => {
    return axios
      .get(`${url}/${endpoint}`)
      .then((res) => {
        return { success: true, errorMsg: "", response: res.data };
      })
      .catch((err) => {
        console.log(`${url}/${endpoint} err`, err);
        return { success: false, errorMsg: err.message, response: {} };
      })
      .finally(() => console.log("finally"));
  });
  const post = useCallback(async (endpoint, data) => {
    return axios
      .post(`${url}/${endpoint}`, data)
      .then((res) => {
        return { success: true, errorMsg: "", response: res.data };
      })
      .catch((err) => {
        console.log(`${url}/${endpoint} err`, err);
        return { success: false, errorMsg: err.message, response: {} };
      })
      .finally(() => console.log("finally"));
  });

  // POST

  // SIGNING USER
  const signUp = useCallback(
    async (data) => {
      const response = await post("api/signup", data);
      if (response.success) {
        setUserContext({ token: response.response.token });
      }
      return response;
    },
    [post]
  );

  // LOGIN USER
  const signIn = useCallback(
    async (data) => {
      const response = await post("api/signin", data);
      if (response.success) {
        setUserContext({ token: response.response.token });
        console.log("JWT ", response.response.token);
      }
      await getMemory();
      return response;
    },
    [post]
  );

  // ADDING MEMORY
  const addMemory = useCallback(
    async (data) => {
      const response = await post("api/memory", data);
      await getMemory();
      return response;
    },
    [post, getMemory]
  );

  // GET

  // GET MEMORY
  const getMemory = useCallback(async () => {
    const memoryRes = await get("api/memory");
    console.log(`memoryRes-${memoryRes.response}`);
    const { success, response } = memoryRes;

    if (success) {
      setMemoryContext({ memories: parseMemory(response) });
    } else {
      setMemoryContext({ memories: [] });
    }
  }, [get]);

  return (
    <ApiContext.Provider value={{ signUp, signIn, addMemory, getMemory }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
