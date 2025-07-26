import React from "react";

interface Props {
  id: string;
  value: boolean;
  label: string;
  onChange: (value: boolean) => void;
  error?: string;
}

const CheckboxInput: React.FC<Props> = ({
  id,
  label,
  value,
  onChange,
  error,
}) => (
  <div className="form-group">
    <label htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={value || false}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
    {error && <p className="error">{error}</p>}
  </div>
);

export default CheckboxInput;
