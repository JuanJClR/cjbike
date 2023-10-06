const admin = require('firebase-admin');
const db = admin.firestore();
const auth = admin.auth();

function registerUser(req, res) {
  const { email, password } = req.body;

  admin.auth().createUser({
    email: email,
    password: password,
  })
  .then((userRecord) => {
    // El usuario ha sido creado exitosamente
    res.send(`Usuario registrado: ${userRecord.uid}`);
  })
  .catch((error) => {
    // Hubo un error al crear el usuario
    res.status(500).send(`Error al registrar usuario: ${error.message}`);
  });
}


module.exports = {
  registerUser,
}
