const Message = require("../models/messageModel");

exports.sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  try {
    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();

    // Emit the new message through sockets
    req.io.emit("newMessage", newMessage);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getChatHistory = async (req, res) => {
  const userId = req.user._id;

  try {
    const chatHistory = await Message.find({
      $or: [
        { sender: userId, receiver: req.params.userId },
        { receiver: userId, sender: req.params.userId },
      ],
    }).sort({ timestamp: "asc" });

    res.status(200).json({ chatHistory });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
