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
    db.collection('usuarios').doc(userRecord.uid).set({
      nombre: name,
      email: email
    })
    .then(() => {
      res.send(`Usuario registrado: ${userRecord.uid}`);
    })
    .catch((error) => {
      res.status(500).send(`Error al guardar el nombre en Firestore: ${error.message}`);
    });
  })
  .catch((error) => {
    res.status(500).send(`Error al registrar usuario: ${error.message}`);
  });
}

module.exports = {
  registerUser,
}
