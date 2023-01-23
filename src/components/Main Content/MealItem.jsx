import { useContext, useRef } from "react";

import CartContext from "../../store/cart-context";
import Input from "../UI Elements/Input";

import classes from "./MealItem.module.css";

function MealItem(props) {
  const cartCtx = useContext(CartContext);

  const inputRef = useRef();

  function addItem(event) {
    event.preventDefault();

    if (
      inputRef.current.value.trim() === "" ||
      inputRef.current.value > 5 ||
      inputRef.current.value < 1
    )
      return;

    const item = {
      id: props.id,
      name: props.title,
      amount: +inputRef.current.value,
      price: props.price,
    };
    cartCtx.cartAddItem(item);
  }

  return (
    <li className={classes["meal"]}>
      <section>
        <h3>{props.title}</h3>
        <p className={classes["description"]}>{props.description}</p>
        <p className={classes["price"]}>₹ {props.price.toFixed(2)}</p>
      </section>

      <section>
        <form className={classes["form"]}>
          <Input
            label="Quantity"
            input={{
              ref: inputRef,
              id: props.id,
              type: "number",
              defaultValue: "1",
              min: "1",
              max: "5",
              step: "1",
            }}
          />
          <button onClick={addItem}>Add</button>
        </form>
      </section>
    </li>
  );
}

export default MealItem;
