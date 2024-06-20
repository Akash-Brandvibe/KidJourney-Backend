const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();
const connectDB = require('./db/connect');
const cookieParser = require('cookie-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const helmet = require('helmet');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// Configure middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KidJourney APIs',
      version: '1.0.0',
      description: 'API Documentation for KidJourney',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./router/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api/v1/kidjourney/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define your routers
const loginsignupRouter = require('./router/loginsignup');
const superadminRouter = require('./router/superadmin');
const principalRouter = require('./router/principal');
const teacherRouter = require('./router/teacher');
const parentRouter = require('./router/parent');
const messageRouter = require('./router/messaging');

// Route handlers
app.use('/api/v1/kidjourney', loginsignupRouter);
app.use('/api/v1/kidjourney/superadmin', superadminRouter);
app.use('/api/v1/kidjourney/principal', principalRouter);
app.use('/api/v1/kidjourney/teacher', teacherRouter);
app.use('/api/v1/kidjourney/parent', parentRouter);
app.use('/api/v1/kidjourney/message', messageRouter);

// Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);
  socket.on('send-message', (message, room) => {

    if(room === ''){
      socket.broadcast.emit('receive-message', message)
    }
    socket.to(room).emit('receive-message', message)
  })
  
  socket.on('join-room', (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`);
  })

});

start();
