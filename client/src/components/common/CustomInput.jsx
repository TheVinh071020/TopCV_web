import React from "react";
import Form from "react-bootstrap/Form";

function CustomInput({
  label,
  type,
  name,
  formError,
  value,
  handleInputChange,
  placeholder,
  style,
  disabled,
}) {
  return (
    <div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={style}>{label}</Form.Label>
        <Form.Control
          type={type}
          name={name}
          placeholder={placeholder}
          defaultValue={value}
          onChange={handleInputChange}
          className={formError ? "error-input" : ""}
          disabled={disabled}
        />
        {formError && (
          <div className="error-feedback" style={{ color: "red" }}>
            {formError}
          </div>
        )}
      </Form.Group>
    </div>
  );
}

export default CustomInput;
