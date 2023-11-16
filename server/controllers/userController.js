const User = require("../models/UserModel");

// When user sent request to other user
exports.connectUsers = async (req, res) => {
  const { senderId, recipientId } = req.body;
  try {
    await User.findByIdAndUpdate(senderId, {
      $push: { sent_pending_connections: recipientId },
    });
    await User.findByIdAndUpdate(recipientId, {
      $push: { receive_pending_connections: senderId },
    });

    res.json({ message: "Connection Pending" });
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
  const { senderId, receiverId } = req.body;
  try {
    // Find the requesting user and the target user
    const requestingUser = await User.findById(senderId);
    const targetUser = await User.findById(receiverId);
    if ((!requestingUser || !targetUser) || (requestingUser === targetUser)) {
      return res.status(400).json({ error: "Users not found" });
    }
    const requestingUserID = requestingUser._id;
    const targetUserID = targetUser._id;

    //console.log(requestingUserID,targetUserID);
    console.log(requestingUserID,targetUserID);
    // Update requestingUser
    await User.updateOne(
      {_id: requestingUserID},
      {
        $push: { connections: targetUserID },
        $pull: { sent_pending_connections: receiverId },
        
      }
    );
    // Update targetUser
    await User.updateOne(
      {_id: targetUserID},
      {
        $push: { connections: requestingUserID },
        $pull: { receive_pending_connections: senderId },
       
      }
    );
    console.log("Connected");
    
    res.json({ message: "Connection accepted" });
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
  const { senderId, receiverId } = req.body;
  try {
    await User.findByIdAndUpdate(senderId, {
      $pull: {connections: receiverId },
    });
    await User.findByIdAndUpdate(receiverId, {
      $pull: { connections: senderId },
    });
    return res.json("delete succesfully")
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
