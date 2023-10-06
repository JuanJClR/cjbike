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

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.send({ uid: user.uid });
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
