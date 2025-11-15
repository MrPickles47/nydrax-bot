const users = new Map();

export const userService = {
  setUser(chatId, data) {
    users.set(chatId, { ...users.get(chatId), ...data });
  },

  getUser(chatId) {
    return users.get(chatId) || {};
  },
};
