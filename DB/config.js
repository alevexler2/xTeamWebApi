const mongoose = require('mongoose');

module.exports = () => {
  const connect = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(
        process.env.CONNECTION_STRING,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log('Conexion exitosa!');
        resolve();
      })
      .catch((err) => {
        console.log('DB error', err);
        reject(err);
      });
    });
  }
  connect()
}
