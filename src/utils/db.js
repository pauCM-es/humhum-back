const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(DB_URL);
    const {name, host, port} = db.connection;
    console.log(`[Server] Conectado con exito a: ${name} em host ${host} en puerto ${port}`);
  }
  catch (error) {
    console.log(`[Server ERROR] conectando a la base de datos`, error);
  }
}

module.exports = {
  connectDB,
  DB_URL
}
