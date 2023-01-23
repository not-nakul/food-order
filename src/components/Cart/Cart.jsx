import { useContext, useState } from "react";

import CartContext from "../../store/cart-context";

import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import Modal from "../UI Elements/Modal";

import classes from "./Cart.module.css";
import success from "../../assets/confirmIcon.png";

function Cart() {
  const [checkout, setCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);
  const cartItems = cartCtx.items;
  const hasItems = cartCtx.items.length > 0;

  function cartAddItem(item) {
    cartCtx.cartAddItem({ ...item, amount: 1 });
  }
  function cartRemoveItem(id) {
    cartCtx.cartRemoveItem(id);
  }

  function toggleCheckout() {
    setCheckout((prev) => !prev);
  }

  async function orderSubmit(userData) {
    setSubmitting(true);
    await fetch(
      "https://react-https-nakul-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: cartItems,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setSubmitting(false);
    setSubmitted(true);
    cartCtx.clearCart();
  }

  const loading = (
    <div className={classes["order-placed"]}>
      <h1>Placing your order...</h1>
    </div>
  );

  const orderPlaced = (
    <div className={classes["order-placed"]}>
      <img src={success} alt="successIcon" />
      <h1>Your order was placed!</h1>
      <p>We will try to deliver it at your doorstep as soon as possible 😋</p>
      <div className={classes["actions"]}>
        <button onClick={cartCtx.toggleCart} className={classes["button--alt"]}>
          Okay
        </button>
      </div>
    </div>
  );

  const cartContent = (
    <>
      <ul className={classes["cart-items"]}>
        {cartItems.map((item) => {
          return (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.name}
              amount={item.amount}
              price={item.price}
              cartAddItem={cartAddItem}
              cartRemoveItem={cartRemoveItem}
            />
          );
        })}
      </ul>

      <div className={classes["total"]}>
        <p>Total Amount</p>
        <p>₹ {cartCtx.totalAmount.toFixed(2)}</p>
      </div>

      {checkout && (
        <CheckoutForm
          cancelCheckout={toggleCheckout}
          orderSubmit={orderSubmit}
        />
      )}

      {!checkout && (
        <div className={classes["actions"]}>
          <button
            onClick={cartCtx.toggleCart}
            className={classes["button--alt"]}
          >
            Close
          </button>
          {hasItems && (
            <button className={classes["button"]} onClick={toggleCheckout}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  return (
    <Modal onClick={cartCtx.toggleCart}>
      {!submitting && !submitted && cartContent}
      {submitting && loading}
      {!submitting && submitted && orderPlaced}
    </Modal>
  );
}

export default Cart;
