export const parseMemory = (data, favourites) => {
  if (!data) {
    return data;
  }
  if (data && data.length > 0 && favourites) {
    const userData = data;
    console.log("🚀 ~ file: dataparser.js:7 ~ parseMemory ~ data:", data);

    const allMemories = userData?.map((item) => {
      return {
        id: item._id,
        title: item.title || "N/A",
        description: item.description || "N/A",
        updatedOn: item.date || "N/A",
        isLiked: favourites?.some((eachItem) => eachItem.id == item._id),
      };
    });
    return {
      memories: allMemories,
    };
  }
};

export const parseUser = (data) => {
  if (!(data && data.response)) {
    return data;
  }

  if (data && data.response) {
    const userData = data?.response?.user;
    const parsedData = {
      token: data?.response?.token || "N/A",
      userId: userData?._id || "N/A",
      firstName: userData?.firstName || "N/A",
      email: userData?.email || "N/A",
      favourites: userData?.favorites || "N/A",
    };

    return {
      response: parsedData,
    };
  }
};

export const parseFavouriteMemory = (data, allMemories) => {
  const parsedData = [];
  if (data && data.length > 0 && allMemories && allMemories.length > 0) {
    data.map((eachItem) => {
      const foundMemory = allMemories?.find(
        (eachMemory) => eachMemory?.id == eachItem?.id
      );
      parsedData.push(foundMemory);
    });
  }

  return { response: parsedData };
};
