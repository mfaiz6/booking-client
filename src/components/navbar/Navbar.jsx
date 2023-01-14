import './navbar.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {

  const { user } = useContext(AuthContext)

  return (

    <div className='navbar'>

      <div className="navContainer">

        <Link to="/">
          <span className="logo"><img src={logo} alt="" /></span>
        </Link>

        {user ? user.username : (<div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>)}

      </div>

    </div>

  )
}

export default Navbar