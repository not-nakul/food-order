import { useState } from "react";

function useInput(validation) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = validation(value);
  const hasError = !isValid && touched;

  function valueChange(event) {
    setValue(event.target.value);
  }

  function blur() {
    setTouched(true);
  }

  function reset() {
    setTouched(false);
    setValue("");
  }

  return { value, isValid, hasError, valueChange, blur, reset };
}

export default useInput;
