import classes from "./Modal.module.css";

function Modal(props) {
  return (
    <>
      <div className={classes["modal"]}>{props.children}</div>

      <div onClick={props.onClick} className={classes["backdrop"]}></div>
    </>
  );
}

export default Modal;
