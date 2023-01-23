import useInput from "../../hooks/useInput";

import classes from "./CheckoutForm.module.css";

function CheckoutForm(props) {
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChange: nameChange,
    blur: nameBlur,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChange: phoneChange,
    blur: phoneBlur,
    reset: phoneReset,
  } = useInput((value) => value.trim() !== "" && value.length === 10);

  const {
    value: address,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChange: addressChange,
    blur: addressBlur,
    reset: addressReset,
  } = useInput((value) => value.trim() !== "");

  const formIsValid = nameIsValid && phoneIsValid && addressIsValid;

  function submitForm(event) {
    event.preventDefault();
    if (!formIsValid) return;

    props.orderSubmit({
      name,
      phone,
      address,
    });

    nameReset();
    phoneReset();
    addressReset();
  }

  return (
    <form className={classes["form"]} onSubmit={submitForm}>
      <div
        className={`${classes["control"]} ${
          nameHasError && classes["invalid"]
        }`}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChange}
          onBlur={nameBlur}
        />
        {nameHasError && (
          <p className={classes["error-text"]}>
            Name field cannot be left empty.
          </p>
        )}
      </div>

      <div
        className={`${classes["control"]} ${
          phoneHasError && classes["invalid"]
        }`}
      >
        <label htmlFor="phone">Phone</label>
        <input
          type="number"
          id="phone"
          value={phone}
          onChange={phoneChange}
          onBlur={phoneBlur}
        />
        {phoneHasError && (
          <p className={classes["error-text"]}>
            Please enter a proper phone number.
          </p>
        )}
      </div>

      <div
        className={`${classes["control"]} ${
          addressHasError && classes["invalid"]
        }`}
      >
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={addressChange}
          onBlur={addressBlur}
        />
        {addressHasError && (
          <p className={classes["error-text"]}>
            Address field cannot be left empty.
          </p>
        )}
      </div>

      <div className={classes["actions"]}>
        <button onClick={props.cancelCheckout}>Cancel</button>
        <button className={classes["submit"]} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;
