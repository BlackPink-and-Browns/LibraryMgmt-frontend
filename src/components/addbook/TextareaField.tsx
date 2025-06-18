import React from "react";

const TextareaField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 w-full input h-28 resize-none inputfield"
    />
  </div>
);

export default TextareaField;
