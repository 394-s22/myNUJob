import '../styles/NavBar.css'

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="nav-title">
        my<span className="nav-title-nu">NU</span>Job
      </div>
      <div class="form-outline">
        {/* <input type="search" id="form1" class="form-control" placeholder="Search Query" aria-label="Search" /> */}
      </div>
      <a className="nav-item nav-link nav-about" data-testid="about-link" href="/">
        <div className="nav-about-text">About</div>
      </a>
    </nav>
  )
}

export default NavBar;