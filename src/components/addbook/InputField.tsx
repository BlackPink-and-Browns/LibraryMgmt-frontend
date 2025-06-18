import React from "react";

const InputField = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 w-full inputfield"
    />
  </div>
);

export default InputField;
