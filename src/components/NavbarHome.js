import { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from '../context/UserProvider';


function NavbarHome() {
  const [user, setUser] = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let { pathname } = useLocation()
  pathname = pathname.slice(1, pathname.length)

  const navigate = useNavigate()

  const logout = () => {
    setUser({
      accessToken: '',
      refreshToken: '',
      name: '',
      email: '',
      role_id: ''
    })
    navigate('/login')
  }

  return (
    <nav className="nav">
      <div className='container'>
        <div className="nav-left">
          <NavLink to="/" className="logo">Seva<span>X</span></NavLink>
        </div>

        <div className='nav-right'>
          <NavLink to="/">Home</NavLink>

          {user?.accessToken === ""
            ?
            <>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <Dropdown className={`dropdown-link ${(pathname === "register-donor" || pathname === "register-needy") && "active"}`}>
                <Dropdown.Toggle>
                  Register
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <NavLink className='dropdown-item' to="/register-donor">Donor</NavLink>
                  <NavLink className='dropdown-item' to="/register-needy">Needy</NavLink>

                </Dropdown.Menu>
              </Dropdown>
              <NavLink to="/login" className='nav-btn'>Login</NavLink>
            </>

            :
            <>
              {user?.role_id === 3    //means admin
                &&
                <>
                  <NavLink to="/manage-donors">Manage Donors</NavLink>
                  <NavLink to="/manage-needy">Manage Needy</NavLink>
                </>
              }
              <a onClick={logout} className='cursor-pointer'>Logout</a>
            </>
          }
        </div>

        <div className='toggle-btn-container'>
          <input type="checkbox" checked={isMenuOpen} onChange={() => setIsMenuOpen(!isMenuOpen)} />
          <div className='toggle-btn' style={{ justifyContent: `${isMenuOpen ? 'center' : 'space-evenly'}` }}>
            <span className='line1' style={{ transform: `rotate(${isMenuOpen ? '45deg' : '0deg'}) translateY(${isMenuOpen ? '2px' : '0'})` }} />
            <span className='line2' style={{ opacity: `${isMenuOpen ? 0 : 1}` }} />
            <span className='line3' style={{ transform: `rotate(${isMenuOpen ? '-45deg' : '0deg'}) translateY(${isMenuOpen ? '-1px' : '0'})` }} />
          </div>
        </div>

        <div className='nav-menu' style={{ left: `${isMenuOpen ? '0' : '100vw'}` }}>
          <NavLink to="/" onClick={() => setIsMenuOpen(!isMenuOpen)}>Home</NavLink>
          {user.accessToken === ""
            ? <>
              <NavLink to="/about" onClick={() => setIsMenuOpen(!isMenuOpen)}>About</NavLink>
              <NavLink to="/contact" onClick={() => setIsMenuOpen(!isMenuOpen)}>Contact</NavLink>
              <NavLink to="/register-donor" onClick={() => setIsMenuOpen(!isMenuOpen)}>Donor Registration</NavLink>
              <NavLink to="/register-needy" onClick={() => setIsMenuOpen(!isMenuOpen)}>Needy Registration</NavLink>
              <NavLink to="/login" onClick={() => setIsMenuOpen(!isMenuOpen)}>Login</NavLink>
            </>

            :
            <>
              {user?.role_id === 3    //means admin
                &&
                <>
                  <NavLink to="/manage-donors" onClick={() => setIsMenuOpen(!isMenuOpen)}>Manage Donors</NavLink>
                  <NavLink to="/manage-needy" onClick={() => setIsMenuOpen(!isMenuOpen)}>Manage Needy</NavLink>
                </>
              }
              <a className='cursor-pointer' onClick={() => { logout(); setIsMenuOpen(false) }}>Logout</a>
            </>
          }
        </div>
      </div>
    </nav>
  );
}

export default NavbarHome;