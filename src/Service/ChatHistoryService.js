import api from './api';

class ChatHistoryService {
    async getChatHistories() {
        try {
            return await api.post("/getChatHistories")
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default new ChatHistoryService();
