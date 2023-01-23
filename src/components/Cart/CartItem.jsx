import classes from "./CartItem.module.css";

function CartItem(props) {
  function onAdd() {
    const { id, title: name, price } = props;
    props.cartAddItem({ id, name, price });
  }

  function onRemove() {
    props.cartRemoveItem(props.id);
  }

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.title}</h2>

        <div className={classes["summary"]}>
          <span className={classes["price"]}>₹ {props.price.toFixed(2)}</span>
          <span className={classes["amount"]}>x {props.amount}</span>
        </div>
      </div>

      <div className={classes["actions"]}>
        <button onClick={onRemove}>-</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
}

export default CartItem;
