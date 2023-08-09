import './Logo.css'
import { Link } from 'react-router-dom';
import logo from './logo.png';


export default function Logo() {
    return (
        <Link to="/">
            <img className='logo' src={logo} alt="logo" />
        </Link>
    )
}