import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../api/productos';
import '../styles/ProductoList.css';

export default function ProductoList() {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
        const res = await fetch(`http://localhost:3001/api/productos/${id}`, {
        method: 'DELETE',
        });

        if (!res.ok) throw new Error('Error al eliminar');

        setProductos(productos.filter(p => p.id !== id));
    } catch (err) {
        setError(err.message);
    }
    };


    useEffect(() => {
        getProductos()
        .then(setProductos)
        .catch(err => setError(err.message));
    }, []);
    
    return (
        <div className="producto-list-container">
            <h2 className="producto-list-title">📦 Listado de Productos</h2>
            <button onClick={() => navigate('/productos/nuevo')} className="btn-primary"> Nuevo producto </button>
            {error && <p className="error-message">⚠️ {error}</p>}
            {productos.length === 0 ? (
                <p className="no-products-message">No hay productos aún en el inventario.</p>
            ) : (
                <div className="table-wrapper">
                    <table className="product-table">
                        <thead className="product-table-header">
                            <tr>
                                <th>Producto</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Utilidades</th>
                            </tr>
                        </thead>
                        <tbody className="product-table-body">
                            {productos.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.nombre}</td>
                                    <td>{p.categoria?.nombre || 'Sin categoría'}</td>
                                    <td>${parseFloat(p.precio).toFixed(2)}</td>
                                    <td>{p.stock}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => navigate(`/productos/${p.id}/editar`)}>Editar</button>
                                        <button className="btn-delete" onClick={() => handleDelete(p.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}