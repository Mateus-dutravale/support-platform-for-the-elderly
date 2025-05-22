
// export async function buscarHospitaisComExame(exame) {
//   const response = await fetch(`http://localhost:3000/api/hospitais/get?exame=${encodeURIComponent(exame)}`);
//   if (!response.ok) {
//     throw new Error(`Erro ao buscar dados: ${response.statusText}`);
//   }
//   return await response.json();
// }
const API_URL = "https://support-platform-for-the-elderly.onrender.com"; 

export async function buscarHospitaisComExame(exame) {
  const res = await fetch(`${API_URL}/api/hospitais/get?exame=${encodeURIComponent(exame)}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar hospitais");
  }
  return await res.json();
}