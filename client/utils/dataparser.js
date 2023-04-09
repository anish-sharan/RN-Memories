export const parseMemory = (data, favourites) => {
  if (!data) {
    return [];
  }

  if (data && data.length > 0) {
    const allMemories = data?.map((item) => {
      return {
        id: item._id,
        title: item.title || "N/A",
        description: item.description || "N/A",
        updatedOn: item.date || "N/A",
        isLiked: favourites?.some((eachItem) => eachItem == item._id),
        imageUrl: item.imageUrl || "https://picsum.photos/800",
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

  if (data && data?.response) {
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

export const parseFavouriteMemory = (data) => {
  if (!data) {
    return data;
  }

  if (data && data?.data?.length > 0) {
    const userData = data?.data;
    const allFavouriteMemories = userData?.map((item) => {
      return {
        id: item._id,
        title: item.title || "N/A",
        description: item.description || "N/A",
        updatedOn: item.date || "N/A",
      };
    });
    return {
      favourites: allFavouriteMemories,
    };
  }
};
