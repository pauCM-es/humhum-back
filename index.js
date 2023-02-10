const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')

const auth = require('./src/utils/auth/index');
auth.authActivate();

//DB CONNECTION
const db = require('./src/utils/db');
db.connectDB();

//ROUTES IMPORT
const collectionsRoutes = require('./src/api/collections/collection.routes')
const titlesRoutes = require('./src/api/titles/title.routes')
const usersRoutes = require('./src/api/users/user.routes')


const PORT = process.env.PORT || 3100;

const server = express();
server.use(cors());
server.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {maxAge: 30 * 60 * 1000},
  store: MongoStore.create({ mongoUrl: db.DB_URL})
}))
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(passport.initialize());
server.use(passport.session());



//SERVER ROUTES
// server.use('/genres', genresRoutes);
// server.use('/sources', sourcesRoutes);
server.use('/users', usersRoutes);
server.use('/titles', titlesRoutes);
server.use('/collections', collectionsRoutes);

server.use('*', (req, res, next) => {{
  return res.status(404).json("No se encuentra la URL. Prueba con otra URL")
}})


//ERROR CONTROLLER
server.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Unexpected Error";
  return res.status(status).json(message);
});


server.listen(PORT, () => {
  console.log(`[Server] Conectado en http://localhost:${PORT}`);
});