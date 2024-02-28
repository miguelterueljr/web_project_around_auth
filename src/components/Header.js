import usLogo from '../images/around-the-us-logo.png';

function Header () {
  return (
    <section className="header">
      <div className="header__logo">
        <img src={usLogo} alt="Logotipo around US" className="header__image" />
      </div>
      <hr className="header__line" />
    </section>
  )
}

export default Header;