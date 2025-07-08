import {Routes, Route } from 'react-router-dom';
import ProductoList from './components/ProductoList';
import ProductoCrear from './components/ProductoCrear';
import Navbar from './components/Navbar';

function App() {
    return (
        <>
            <Navbar />
                    <Routes>
                    <Route path="/" element={<ProductoList />} />
                    <Route path="/productos" element={<ProductoList />} />
                    <Route path="/productos/nuevo" element={<ProductoCrear />} />
                    <Route path="/productos/:id/editar" element={<ProductoCrear />} />
                </Routes>
        </>
    );
}

export default App;
