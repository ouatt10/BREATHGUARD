require('dotenv').config();
const mongoose = require('mongoose');

async function verifierDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connecté à MongoDB\n');

    const collections = await mongoose.connection.db.listCollections().toArray();
    
    console.log('📦 COLLECTIONS TROUVÉES :');
    console.log('========================');
    collections.forEach(col => console.log(`  ✓ ${col.name}`));
    
    console.log('\n📊 NOMBRE DE DOCUMENTS :');
    console.log('========================');
    
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`  ${col.name.padEnd(25)} ${count} document(s)`);
    }
    
    console.log('\n👤 DERNIER UTILISATEUR :');
    console.log('========================');
    const user = await mongoose.connection.db.collection('users').findOne({}, { sort: { _id: -1 } });
    if (user) {
      console.log(JSON.stringify({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        age: user.age,
        sexe: user.sexe,
        pathologies: user.pathologies
      }, null, 2));
    }
    
    console.log('\n🫀 DERNIÈRE DONNÉE BIOMÉTRIQUE :');
    console.log('================================');
    const donnee = await mongoose.connection.db.collection('donneebiometriques').findOne({}, { sort: { _id: -1 } });
    if (donnee) {
      console.log(JSON.stringify({
        type: donnee.type,
        valeur: donnee.valeur,
        unite: donnee.unite,
        statut: donnee.statut,
        message: donnee.message,
        couleur: donnee.couleur
      }, null, 2));
    }
    
    console.log('\n✅ Vérification terminée !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await mongoose.connection.close();
  }
}

verifierDB();