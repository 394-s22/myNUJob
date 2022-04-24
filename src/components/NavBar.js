import '../styles/NavBar.css'
import Search from './Search.js';

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="nav-title">
        my<span className="nav-title-nu">NU</span>Job
      </div>
      <div className="form-outline">
        {/* <Search/> */}
      </div>
    </nav>
  )
}

export default NavBar;