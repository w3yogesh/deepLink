const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http"); // Import the 'http' module

const connectDB = require('./config/dbConnect');
require("dotenv").config(); 

const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoutes");


// Connect to MongoDB by calling the imported connectDB function
connectDB()
  .then(() => {
    // Start your server once the MongoDB connection is established
    const port = process.env.PORT || 3000;

    // Create the HTTP server
    const server = http.createServer(app);

    // Attach Socket.io to the HTTP server
    const io = require("socket.io")(server, {
      cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    const userConnections = new Map();

    io.on('connection', (socket) => {
      const userId = socket.handshake.query.userId; // Extract user ID from query parameters
      userConnections.set(userId, socket);
    
      socket.on('private-message', ({ to, message }) => {
        const toSocket = userConnections.get(to);
        if (toSocket) {
          toSocket.emit('private-message', { from: userId, message });
        }
      });
    
      socket.on('disconnect', () => {
        userConnections.delete(userId);
      });
    });

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use('/fetchImage', express.static('uploads'));
app.use('/fetchUserPostImage', express.static('uploads/user/post'));
app.use('/fetchProfileImage', express.static('uploads/user/profile'));

app.use('/fetchCompanyImage', express.static('uploads/company'));
app.use('/fetchCompanyPostImage', express.static('uploads/company/post'));


app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);
