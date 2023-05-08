import { useContext, useEffect, useState } from 'react';
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

  const [isNavBgActive, setIsNavBgActive] = useState(false)

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

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      if(window.scrollY > 70){
        setIsNavBgActive(true)
      }else{
        setIsNavBgActive(false)
      }
    })
  }, [])

  return (
    <nav className={`nav ${isNavBgActive ? 'nav-bg-active' : ''}`}>
      <div className='container'>
        <div className="nav-left">
          <NavLink to="/" className="logo">Seva<span>X</span></NavLink>
        </div>

        <div className='nav-right'>
          <NavLink to="/">Home</NavLink>

          {user?.accessToken === ""
            ?
            <>
              <Dropdown className={`dropdown-link ${(pathname === "register-donor" || pathname === "register-needy") && "active"}`}>
                <Dropdown.Toggle>
                  Join
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <NavLink className='dropdown-item' to="/register-donor">for making donation</NavLink>
                  <NavLink className='dropdown-item' to="/register-needy">for receiving donation</NavLink>

                </Dropdown.Menu>
              </Dropdown>
              <NavLink to="/login" className='nav-btn nav-btn-highlighted'>Login</NavLink>
            </>

            :
            <>
              {user?.role_id === 3    //means admin
                ?   //ADMIN LINKS
                <>
                  <NavLink to="/manage-donors">Manage Donors</NavLink>
                  <NavLink to="/manage-needy">Manage Needy</NavLink>
                </>

                :
                <>
                  {user?.role_id === 2
                    ?   //DONOR LINKS
                    <>
                      <NavLink to="/all-item">All Items</NavLink>
                      <NavLink to="/add-item">Add Item</NavLink>

                    </>

                    :   //NEEDY LINKS
                    <>
                      <NavLink to="/all-items">All Items</NavLink>
                      <NavLink to="/requested-items">Requested Items</NavLink>
                      <NavLink to="/accepted-items">Accepted Items</NavLink>

                    </>
                  }
                </>
              }
              <Dropdown className='dropdown-link'>
                <Dropdown.Toggle>
                  {console.log(user)}
                  <div className='profile-pic' style={{ backgroundImage: `url(${user.profilePictureSrc ? `${process.env.REACT_APP_BASE_URL}${user.profilePictureSrc}` : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'})` }} />
                  {/* <img src= className='profile-pic' /> */}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <NavLink className='dropdown-item' to="/profile">My Profile</NavLink>
                  <a onClick={logout} className='dropdown-item cursor-pointer'>Logout</a>
                </Dropdown.Menu>
              </Dropdown>
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
              <NavLink to="/register-donor" onClick={() => setIsMenuOpen(!isMenuOpen)}>Register - for making donation</NavLink>
              <NavLink to="/register-needy" onClick={() => setIsMenuOpen(!isMenuOpen)}>Register - for receiving donation</NavLink>
              <NavLink to="/login" onClick={() => setIsMenuOpen(!isMenuOpen)}>Login</NavLink>
            </>

            :
            <>
              {user?.role_id === 3
                ?   //ADMIN LINKS
                <>
                  <NavLink to="/manage-donors" onClick={() => setIsMenuOpen(!isMenuOpen)}>Manage Donors</NavLink>
                  <NavLink to="/manage-needy" onClick={() => setIsMenuOpen(!isMenuOpen)}>Manage Needy</NavLink>
                  <NavLink to="/profile" onClick={() => setIsMenuOpen(!isMenuOpen)}>My Profile</NavLink>
                  <NavLink to="/update-password" onClick={() => setIsMenuOpen(!isMenuOpen)}>Update Password</NavLink>
                </>

                :
                <>
                  {user?.role_id === 2
                    ?   //DONOR LINKS
                    <>
                      <NavLink to="/all-item" onClick={() => setIsMenuOpen(!isMenuOpen)}>All Items</NavLink>
                      <NavLink to="/add-item" onClick={() => setIsMenuOpen(!isMenuOpen)}>Add Item</NavLink>
                    </>

                    :   //NEEDY LINKS
                    <>
                      <NavLink to="/all-items" onClick={() => setIsMenuOpen(!isMenuOpen)}>All Items</NavLink>
                      <NavLink to="/requested-items" onClick={() => setIsMenuOpen(!isMenuOpen)}>My Requests</NavLink>

                    </>
                  }
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