const { ObjectId } = require("mongodb");
const User = require("../models/UserModel");

// When user sent request to other user
exports.connectUsers = async (req, res) => {
  const { senderId, recipientId } = req.params;
  try {
    const isSent = await User.findOne({
      _id: senderId,
      sent_pending_connections: recipientId,
    });
    if (isSent) return res.json({ status: false, message: "Already send" });
    // return res.json({ status: true, message: !isSent });

    if (senderId !== recipientId && !isSent) {
      const sender = await User.findByIdAndUpdate(senderId, {
        $push: { sent_pending_connections: recipientId },
      });
      const receiver = await User.findByIdAndUpdate(recipientId, {
        $push: { receive_pending_connections: senderId },
      });
      if (sender && receiver)
        return res.json({ status: true, message: "Connection Pending" });
    }
    return res.json({ status: false, message: "Something went wrong" });
  } catch (error) {
    res.status(500).json({ error: "Failed to connect users" });
  }
};

// When a user Receive connection request
exports.getConnections = async (req, res) => {
  const { userId } = req.params;
  //const { userId } = req.params.userId;
  try {
    // Retrieve user's connections
    const user = await User.findById(userId).populate(
      "receive_pending_connections",
      "firstName email"
    );
    //res.json(userId);
    res.json(user.receive_pending_connections);
  } catch (error) {
    res.status(500).json({ error: "Failed to get connections" });
  }
};

// When a user Sent connection request
exports.sentConnections = async (req, res) => {
  const { userId } = req.params;
  //const { userId } = req.params.userId;
  try {
    // Retrieve user's connections
    const user = await User.findById(userId).populate(
      "sent_pending_connections",
      "firstName email"
    );
    //res.json(userId);
    res.json(user.sent_pending_connections);
  } catch (error) {
    res.status(500).json({ error: "Failed to get connections" });
  }
};

exports.acceptConnection = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    // Find the requesting user and the target user
    const requestingUser = await User.findById(senderId);
    const targetUser = await User.findById(receiverId);
    if (!requestingUser || !targetUser ) {
      return res.status(400).json({ error: "Users not found" });
    }
    const requestingUserID = senderId;
    const targetUserID = receiverId;

    const res1 = await User.findByIdAndUpdate(
      { _id: targetUserID },
      {
        $unset: { sent_pending_connections: requestingUserID },
        $push: { connections: requestingUserID },
      }
    );
    const res2 = await User.findByIdAndUpdate(
      { _id: requestingUserID },
      {
        $pull: { receive_pending_connections: targetUserID },
        $push: { connections: targetUserID },
      },
      { new: true }
    );

    if(res1 && res2) return res.json({status: true, message: "Connection accepted" });
    else return res.json({status: false, message: "Something went wrong" });
  } catch (error) {
    res.status(500).json({ error: "Failed to accept connection" });
  }
};

// Ignore facility is for reciver of request
exports.ignoreConnection = async (req, res) => {
  const { receiverId, senderId } = req.body;

  const receiver = await User.findById(receiverId);
  const sender = await User.findById(senderId);

  if (!sender || !receiver) {
    return res.status(400).json({ error: "Users not found" });
  }

  await User.updateOne(
    { _id: receiver._id },
    {
      $pull: { receive_pending_connections: sender._id },
    }
  );
  console.log(sender._id);
  await User.updateOne(
    { _id: sender._id },
    { $pull: { sent_pending_connections: receiver._id } }
  );
  return res.json("ignore Successfully");
};

exports.dropConnection = async (req, res) => {
  const { senderId, receiverId } = req.body;

  await User.findByIdAndUpdate(senderId, {
    $pull: { sent_pending_connections: receiverId },
  });
  await User.findByIdAndUpdate(receiverId, {
    $pull: { receive_pending_connections: senderId },
  });
  return res.json("drop Successfully");
};

// Show My connections
exports.myConnections = async (req, res) => {
  const { userId } = req.params;
  //const { userId } = req.params.userId;
  try {
    // Retrieve user's connections
    const user = await User.findById(userId).populate(
      "connections",
      "firstName email"
    );
    //res.json(userId);
    res.json(user.connections);
  } catch (error) {
    res.status(500).json({ error: "Failed to get connections" });
  }
};

exports.deleteMyConnection = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const sender = await User.findByIdAndUpdate(senderId, {
      $pull: { connections: receiverId },
    });
    const receiver = await User.findByIdAndUpdate(receiverId, {
      $pull: { connections: senderId },
    });
    if (sender && receiver) {
      return res.json({ status: true, message: "removed successfully" });
    } else {
      return res.json({ status: false, message: "Something went wrong" });
    }
  } catch (error) {}
};

//Show all Users list
exports.users = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Fetch all users
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
