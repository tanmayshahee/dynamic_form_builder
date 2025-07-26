import React from "react";
import { SelectOption } from "../../types/schema";

interface Props {
  id: string;
  value: string;
  label: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: string;
}

const SelectInput: React.FC<Props> = ({
  id,
  label,
  value,
  options,
  onChange,
  error,
}) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="error">{error}</p>}
  </div>
);

export default SelectInput;
