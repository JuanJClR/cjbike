const admin = require('firebase-admin');
const db = admin.firestore();
const auth = admin.auth();

function registerUser(req, res) {
  const { name, email, password } = req.body;

  admin.auth().createUser({
    email: email,
    password: password,
    displayName: name // Añade el nombre como displayName
  })
  .then((userRecord) => {
    // Usuario creado exitosamente
    // Ahora, guardamos el nombre en Firestore
    return db.collection('usuarios').doc(userRecord.uid).set({
      nombre: name,
      email: email
    });
  })
  .then(() => {
    res.send(`Usuario registrado: ${userRecord.uid}`);
  })
  .catch((error) => {
    res.status(500).send(`Error al registrar usuario: ${error.message}`);
  });
}

function loginUser(req, res) {
  const { email, password } = req.body;

  admin.auth().getUserByEmail(email)
    .then((userRecord) => {
      const uid = userRecord.uid;
      console.log('Datos del usuario autenticado:', userRecord.toJSON());
      res.send({ uid });
    })
    .catch((error) => {
      res.status(500).send(`Error al autenticar usuario: ${error.message}`);
    });
}


function logoutUser(req, res) {
  auth.signOut()
    .then(() => {
      res.send('Usuario desconectado');
    })
    .catch((error) => {
      res.status(500).send(`Error al desconectar usuario: ${error.message}`);
    });
}


module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
