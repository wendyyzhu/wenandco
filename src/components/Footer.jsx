import './Footer.css'
import Logo from './Handmade.png'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className='bottom'>
            <Link to="/">
                <img src={Logo} alt="" />
            </Link>
            <footer className="footer">
                <p>&copy; 2023 wendyyzhu</p>
            </footer>
        </div>
    )  
}