const admin = require('firebase-admin');

// Obtén una referencia a la instancia de Firestore
const db = admin.firestore();

// Habilita ignoreUndefinedProperties
db.settings({ ignoreUndefinedProperties: true });

async function editarPerfil(req, res) {
  try {
    const { name, address, neighborhood, phoneNumber, city, nombreUsuario, email } = req.body;
    
    const snapshot = await admin.firestore().collection('usuarios').where('usuario', '==', nombreUsuario).get();

    if (snapshot.empty) {
      return res.status(404).send({ message: 'No se encontró al usuario' });
    } else {
      const doc = snapshot.docs[0];

      // Actualizar los datos del perfil del usuario en Firestore
      await doc.ref.update({
        name: name,
        address: address,
        neighborhood: neighborhood,
        phoneNumber: phoneNumber,
        city: city,
        email: email,
        nombreUsuario, nombreUsuario,
        // Otros campos que desees actualizar...
      });

      return res.status(200).send({
        message: 'Perfil de usuario editado con éxito',
        updatedData: { name, address, neighborhood, phoneNumber, city }
      });
    }
  } catch (error) {
    console.error('Error al editar el perfil del usuario:', error);
    return res.status(500).send({ message: 'Error al editar el perfil del usuario' });
  }
}

module.exports = editarPerfil;
