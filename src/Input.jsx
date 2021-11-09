import React from "react";

const InputField = ({ label, name, formik }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <input
          {...formik.getFieldProps(name)}
          className={
            formik.errors[name] && formik.touched[name]
              ? "input error"
              : "input"
          }
        />
        {formik.touched[name] && formik.errors[name] ? (
          <div className="input-feedback">{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
