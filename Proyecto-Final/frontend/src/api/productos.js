//const API = process.env.REACT_APP_API_URL;
const API = 'http://localhost:3001/api';

export async function getProductos() {
    const res = await fetch(`${API}/productos`);
    if (!res.ok) throw new Error('Error al obtener productos');
    return await res.json();
}