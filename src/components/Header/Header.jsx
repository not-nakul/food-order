import CartButton from "./CartButton";

import heroImage from "../../assets/hero-image.jpg";

import classes from "./Header.module.css";

function Header() {
  return (
    <>
      <nav className={classes["header"]}>
        <h1>The Indian Thali</h1>
        <CartButton />
      </nav>

      <figure className={classes["main-image"]}>
        <img src={heroImage} alt="Indian Thali" />
      </figure>
    </>
  );
}

export default Header;
