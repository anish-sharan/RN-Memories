export const parseMemory = (data) => {
  if (!(data && data.response)) {
    return data;
  }

  if (data && data.response) {
    const userData = data?.response;

    const allMemories = userData?.map((item) => {
      return {
        title: item.title || "N/A",
        description: item.description || "N/A",
        updatedOn: item.date || "N/A",
      };
    });
    return {
      memories: allMemories,
    };
  }
};
