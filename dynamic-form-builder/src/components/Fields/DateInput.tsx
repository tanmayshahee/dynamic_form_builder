import React from "react";

interface Props {
  id: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
  error?: string;
}

const DateInput: React.FC<Props> = ({ id, label, value, onChange, error }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      type="date"
      id={id}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <p className="error">{error}</p>}
  </div>
);

export default DateInput;
