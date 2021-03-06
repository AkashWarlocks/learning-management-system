const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  eduatlasId: {
    type: String,
  },
  chats: [
    {
      senderId: {
        type: String,
      },

      senderName: {
        type: String,
      },
      message: {
        type: String,
      },
      date: {
        type: Number,
        default: new Date().getTime(),
      },
      seen: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
