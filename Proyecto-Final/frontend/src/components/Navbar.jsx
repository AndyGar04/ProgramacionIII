import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
        <h1>Inventario App</h1>
        <div className="nav-links">
            <Link to="/">Productos</Link>
        </div>
        </nav>
    );
};

export default Navbar;
