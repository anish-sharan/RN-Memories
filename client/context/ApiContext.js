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
  const url = process.env.URL;
  const customUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`;

  const token = userContext?.userData?.token;
  console.log(
    "🚀 ~ file: ApiContext.js:19 ~ ApiContextProvider ~ token:",
    token
  );
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
      .finally(() => console.log("finally GET"));
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
      .finally(() => console.log("finally Post"));
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
      });
    // .finally(() => console.log("finally Put"));
  });

  const customPost = useCallback(async (endpoint, data) => {
    try {
      const response = await fetch(endpoint, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const json = await response.json();
      return { response: json, success: true };
    } catch (error) {
      console.error("err", error);
    }
  });

  // POST

  // VERIFY OTP
  const verifyOtp = useCallback(
    async (data, otp) => {
      const response = await post(`api/verify/otp/${otp}`, data);
      return response.response;
    },
    [post]
  );

  // VRERIFY EMAIL
  const verifyEmail = useCallback(
    async (data) => {
      const response = await post("api/verify/email", data);
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
      } else {
        setUserContext({});
      }
      return response;
    },
    [post]
  );

  // ADDING MEMORY Data
  const addMemory = useCallback(
    async (data) => {
      const response = await post("api/memory", data);
      await getMemory();
      return response;
    },
    [post, getMemory]
  );

  // UPLOADING IMAGE And Memory TO DB
  const uploadImageToDb = useCallback(
    async (imageData, userId, memoryData) => {
      const res = await customPost(customUrl, imageData);
      if (res?.success) {
        console.log(res?.response?.url);
        memoryData.imageUrl = res?.response?.url;
        const addMemoryRes = await addMemory(memoryData);
        return addMemoryRes;
      }
    },
    [post]
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
    await getFavouriteMemory(userContext?.userData?.userId);
    const { success, response } = memoryRes;
    console.log(
      "🚀 ~ file: ApiContext.js:130 ~ getMemory ~ memoryRes:",
      memoryRes
    );
    const parsedMemory = parseMemory(
      response,
      userContext?.userData?.favourites
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
        parsedData = parseMemory(response.data);
      }
      return parsedData;
    },
    [get]
  );

  // GET FAVOURITE MEMORY
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
        signIn,
        addMemory,
        getMemory,
        searchMemory,
        addFavouriteMemory,
        getFavouriteMemory,
        uploadImageToDb,
        verifyOtp,
        verifyEmail,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
