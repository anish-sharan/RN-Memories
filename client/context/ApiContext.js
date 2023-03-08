import React, { useCallback, createContext, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { MemoryContext } from "./MemoryContext";
import {
  parseMemory,
  parseUser,
  parseFavouriteMemory,
} from "../utils/dataparser";

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
  const { setUserContext, userContext } = useContext(UserContext);
  const { setMemoryContext } = useContext(MemoryContext);
  //   const url = config.URL;
  const url = "http://b701-59-95-84-213.ngrok.io";
  const token = userContext?.userData?.token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  console.log(`JWT ${token}`);
  const get = useCallback(async (endpoint) => {
    return axios
      .get(`${url}/${endpoint}`)
      .then((res) => {
        return { success: true, errorMsg: "", response: res.data };
      })
      .catch((err) => {
        console.log(`GET: ${url}/${endpoint} err`, err);
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
        console.log(`POST: ${url}/${endpoint} err`, err);
        return { success: false, errorMsg: err.message, response: {} };
      })
      .finally(() => console.log("finally"));
  });

  const put = useCallback(async (endpoint, data) => {
    return axios
      .put(`${url}/${endpoint}`, data)
      .then((res) => {
        return { success: true, errorMsg: "", response: res.data };
      })
      .catch((err) => {
        console.log(`PUT: ${url}/${endpoint} err`, err);
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
      const parsedData = parseUser(response);
      if (response.success) {
        setUserContext({
          userData: parsedData.response,
        });
        console.log("JWT ", parsedData);
      }
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

  // ADDING MEMORY TO FAVORITES
  const addFavouriteMemory = useCallback(
    async (userId, data) => {
      console.log("🚀 ~ file: ApiContext.js:87 ~ userId:", userId);
      const response = await put(`api/favorite/${userId}`, data);
      await getMemory();
      return response;
    },
    [put, getMemory]
  );

  // GET

  // GET MEMORY
  const getMemory = useCallback(async () => {
    const memoryRes = await get("api/memory");
    const { success, response } = memoryRes;
    const parsedMemory = parseMemory(
      response,
      userContext?.userData?.favourites
    );
    const parsedFavouriteMemory = parseFavouriteMemory(
      userContext?.userData?.favourites,
      parsedMemory?.memories
    );
    if (success) {
      setMemoryContext({
        memories: parsedMemory?.memories,
      });
    } else {
      setMemoryContext({ memories: [] });
    }
  }, [get]);

  // SEARCH MEMORY
  const searchMemory = useCallback(
    async (toSearch) => {
      const searchMemoryRes = await get(`api/search?title=${toSearch}`);
      console.log(`api/search/memory?title=${toSearch}`);
      const { success, response } = searchMemoryRes;
      let parsedData = [];
      if (success) {
        parsedData = parseMemory(response);
      }
      return parsedData;
    },
    [get]
  );

  // GET FOUORITE MEMORY
  const getFavouriteMemory = useCallback(
    async (userId) => {
      const favouriteMemoryRes = await get(`api/favourite/${userId}`);
      const { success, response } = favouriteMemoryRes;
      let parsedData = [];
      if (success) {
        parsedData = parseFavouriteMemory(response);
        console.log("🚀 ~ file: ApiContext.js:165 ~ parsedData:", parsedData);
        setMemoryContext({ faouriteMemories: parsedData?.favourites });
      }
      return parsedData;
    },
    [get]
  );

  return (
    <ApiContext.Provider
      value={{
        signUp,
        signIn,
        addMemory,
        getMemory,
        searchMemory,
        addFavouriteMemory,
        getFavouriteMemory,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
