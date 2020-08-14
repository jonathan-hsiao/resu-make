import React from "react";

const TextArea = ({
        label,
        placeholder,
        value,
        onChange,
        disabled = false,
        type = "text",
        customClassGroup,
        customClassInput,
        rows="3",
        labelClassName="input-label"
    }) => (

    <div className={"form-group " + customClassGroup}>
        <label className={labelClassName}>{label}</label>
        <textarea 
            className={"form-control input-text shadow-none " + customClassInput}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={event => onChange(event.target.value)}
            disabled={disabled}
        />
    </div>
    
);

export default TextArea;