import api from './api';

class ChatHistoryService {
    async getChatHistories(jsonChatRoomId) {
        try {
            return await api.post("/getChatHistories", jsonChatRoomId)
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default new ChatHistoryService();
