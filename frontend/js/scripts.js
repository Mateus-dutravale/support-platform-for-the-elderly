// const { MongoClient } = require("mongodb");

// const uri = 'mongodb+srv://admin:trilhas@cluster0.1mg08br.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // substitua pela sua URI de conexão
// const client = new MongoClient(uri);

// export async function buscarHospitaisComExame(exame) {
//   try {
//     await client.connect();
//     const database = client.db("infosaude"); // ex: "hospitaisDB"
//     const collection = database.collection("Unidade de Saude"); // ex: "hospitais"

//     // Busca hospitais que tenham o exame em "sadt"
//     const query = { servicos: exame };

//     // Projeção para retornar apenas nome e endereço
//     const projection = { projection: { nome: 1, endereco: 1, _id: 0 } };

//     const hospitais = await collection.find(query, projection).toArray();

//     return hospitais;
//   } finally {
//     await client.close();
//   }
// }

// // Exemplo de uso:
// // buscarHospitaisComExame("Urgência e Emergência - 24H")
// //   .then(hospitais => console.log(hospitais))
// //   .catch(err => console.error(err));

// // module.exports = buscarHospitaisComExame;


export async function buscarHospitaisComExame(exame) {
  const response = await fetch(`http://localhost:3000/api/hospitais/get?exame=${encodeURIComponent(exame)}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }
  return await response.json();
}
