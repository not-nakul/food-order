import classes from "./Summary.module.css";

function Summary() {
  return (
    <section className={classes["summary"]}>
      <h2>Delicious Indian food, delivered at your doorstep</h2>

      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious breakfast, lunch or dinner at the convinience of
        your home.
      </p>

      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course, by experienced chefs! Have the delightful taste of the Indian
        flavor.
      </p>
    </section>
  );
}

export default Summary;
