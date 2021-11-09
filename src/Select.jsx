import React from "react";
import Select from "react-select";

const ReactSelect = ({
  label,
  name,
  placeholder,
  onChange,
  onBlur,
  error,
  touched,
  options,
  value,
  multi,
  className,
  isClearable = false,
  isSearchable = true,
  isDisabled = false,
  noOptionsMessage = "No options"
}) => {
  return (
    <div
      error={`error ${
        error && error.split("_")[0] === "invalid" ? "invalid" : ""
      } ${!!error && touched ? "active" : "inactive"}`}
    >
      {label ? <label htmlFor={label}>{label}</label> : null}
      <div>
        <Select
          id={name}
          options={options}
          onChange={(value) => {
            onChange(value);
          }}
          onBlur={onBlur}
          value={value}
          name={name}
          placeholder={placeholder}
          isClearable={isClearable}
          isSearchable={isSearchable}
          noOptionsMessage={() => noOptionsMessage}
          isMulti={multi}
          autoBlur
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default ReactSelect;
