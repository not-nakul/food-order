import classes from "./Input.module.css";

function Input(props) {
  return (
    <div className={`${classes["input"]} ${props.className}`}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
}

export default Input;
