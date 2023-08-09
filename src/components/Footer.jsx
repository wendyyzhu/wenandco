import './Footer.css'
import Logo from './Handmade.png'

export default function Footer() {
    return (
        <div className='bottom'>
            <img src={Logo} alt="" />
            <footer className="footer">
                <p>&copy; 2023 wendyyzhu</p>
            </footer>
        </div>
    )  
}