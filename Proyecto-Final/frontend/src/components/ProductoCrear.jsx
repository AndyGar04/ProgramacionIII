import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../styles/ProductoCrear.css'; 

export default function ProductoCrear() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoriaId: ''
    });
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:3001/api/categorias')
            .then(res => res.json())
            .then(data => setCategorias(data))
            .catch(() => setCategorias([]));

        if (id) {
            fetch(`http://localhost:3001/api/productos/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('No se pudo cargar el producto');
                return res.json();
            })
            .then(data => {
                const { nombre, descripcion, precio, stock, categoriaId } = data;
                setForm({ nombre, descripcion, precio, stock, categoriaId });
            })
            .catch(err => setError(err.message));
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const method = id ? 'PUT' : 'POST';
        const url = id
            ? `http://localhost:3001/api/productos/${id}`
            : 'http://localhost:3001/api/productos';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(async res => {
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Error al guardar');
            }
            navigate('/');
            })
            .catch(err => setError(err.message));
    };

    return (
        <div className="form-page-container"> {}
            <div className="form-card"> {}
                <h2 className="form-title">📝 Nuevo Producto</h2> {}
                {error && <p className="form-error-message">⚠️ {error}</p>} {}

                <form onSubmit={handleSubmit} className="form-grid"> {}
                    <input
                        name="nombre"
                        placeholder="Nombre del Producto"
                        className="form-input"
                        onChange={handleChange}
                        value={form.nombre || ''}
                        required
                    />
                    <textarea
                        name="descripcion"
                        placeholder="Descripción detallada del producto"
                        rows="4"
                        className="form-textarea"
                        onChange={handleChange}
                        value={form.descripcion || ''}
                    />
                    <input
                        name="precio"
                        type="number"
                        step="0.01"
                        placeholder="Precio (ej: 29.99)"
                        className="form-input"
                        onChange={handleChange}
                        value={form.precio || ''}
                        required
                    />
                    <input
                        name="stock"
                        type="number"
                        placeholder="Stock disponible"
                        className="form-input"
                        onChange={handleChange}
                        value={form.stock || ''}
                    />
                    <select
                        name="categoriaId"
                        className="form-select"
                        onChange={handleChange}
                        value={form.categoriaId || ''}
                        required
                    >
                        <option value="" disabled>Seleccionar categoría</option>
                        {categorias.map(c => (
                            <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                    </select>
                    <div className="form-buttons-container"> {}
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="form-button cancel"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="form-button save"
                        >
                            Guardar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}