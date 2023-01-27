export const parseMemory = data => {
    if (data && data.response && data.response.memory) {
        const memories = data.response.memory.map((item) => {
            return {
                title: item.title || 'N/A',
                description: item.description || 'N/A',
                updatedOn: item.date || 'N/A'
            }
        })
        return {
            memories
        }
    }

};