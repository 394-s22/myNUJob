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
      <a className="nav-item nav-link nav-about" data-testid="about-link" href="/">
        <div className="nav-about-text">About</div>
      </a>
    </nav>
  )
}

export default NavBar;