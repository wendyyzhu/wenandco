import { Link } from 'react-router-dom';
import './NavBar.css'
import * as userService from '../utilities/users-service';

const cartLogo = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>

const menuLogo = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        <>
            <nav className='navbar'>
                <Link to="/">Home</Link>
                <Link to="/Shop">Shop</Link>
                { user 
                    ? <>
                        <Link to="/user">Hello, {user.name}!</Link>
                        <Link to="/" onClick={handleLogOut}>Logout</Link>
                    </>
                    : <Link to="/login">Login</Link>
                }
                <Link to="/cart">{cartLogo}</Link>
            </nav>

            <div className="dropdown">
                <button className="dropbtn">{menuLogo}</button>
                <div className="dropdown-content">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    { user 
                        ? <>
                            <Link to="/user">Hello, {user.name}!</Link>
                            <Link to="/" onClick={handleLogOut}>Logout</Link>
                        </>
                        : <Link to="/login">Login</Link>
                    }
                    <Link to="/cart">{cartLogo}</Link>
                </div>
            </div>
        </>
    )
}