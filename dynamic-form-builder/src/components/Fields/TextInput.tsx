import React from "react";

interface Props {
  id: string;
  type: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
  error?: string;
}

const TextInput: React.FC<Props> = ({
  id,
  type,
  label,
  value,
  onChange,
  error,
}) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <p className="error">{error}</p>}
  </div>
);

export default TextInput;
