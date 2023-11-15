import api from './api';

class ChatHistoryService {
    async getChatHistories(jsonChatRoomId) {
        try {
            return await api.post("/v1/getChatHistories", jsonChatRoomId)
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default new ChatHistoryService();
