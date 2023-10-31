// Import the functions you need from the SDKs you need
const firebase = require('firebase/app');
const firebaseAuth = require('firebase/auth');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRrX4Eqrj7y5mi-ctBnsMdSI7arGj5hbk",
  authDomain: "jcbike-74f69.firebaseapp.com",
  databaseURL: "https://jcbike-74f69-default-rtdb.firebaseio.com",
  projectId: "jcbike-74f69",
  storageBucket: "jcbike-74f69.appspot.com",
  messagingSenderId: "238225156704",
  appId: "1:238225156704:web:02646297275406f3543105",
  measurementId: "G-J3S1P61MVM"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebaseAuth.getAuth(app);

async function Login(req, res) {
  try {
    const { email, password } = req.body;

    // Inicia sesión con correo electrónico y contraseña
    await firebaseAuth.signInWithEmailAndPassword(auth, email, password);

    return res.status(200).send('Sesión iniciada con éxito');
  } catch (error) {
    console.log('Error al iniciar sesión:', error);
    return res.status(500).send('Error al iniciar sesión');
  }
}
module.exports = Login;
