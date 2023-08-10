import './Footer.css'
import Logo from './Handmade.png'
import { Link } from 'react-router-dom'

export default function Footer() {

    function handleClick() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    
    return (
        <div className='bottom'>
            <Link to="/" onClick={handleClick}>
                <img src={Logo} alt="" />
            </Link>
            <footer className="footer">
                <p>&copy; 2023 wendyyzhu</p>
            </footer>
        </div>
    )  
}