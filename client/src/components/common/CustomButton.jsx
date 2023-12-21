import React from "react";
import Button from "react-bootstrap/Button";

function CustomButton({ className, variant, type, label, style, onClick }) {
  return (
    <div>
      <Button
        onClick={onClick}
        className={className}
        variant={variant}
        type={type}
        style={style}
      >
        {label}
      </Button>
    </div>
  );
}

export default CustomButton;
