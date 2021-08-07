import React from "react";
import InputGroup from "react-bootstrap/InputGroup";

const TextField = ({
        label,
        prefix,
        suffix,
        buttonAppendGroupClass,
        addonLeftButton,
        addonRightButton,
        placeholder,
        value,
        onChange,
        disabled = false,
        type = "text",
        customClassGroup,
        customClassInput,
        noSpace,
        labelClassName="input-label"
    }) => {
    
    const textLabel = (label) && (<label className={labelClassName}>{label}</label>)
    const prefixAppend = (prefix) && (
        <InputGroup.Prepend>
            <InputGroup.Text className="input-addon">{prefix}</InputGroup.Text>
        </InputGroup.Prepend>
    );
    const suffixAppend = (suffix) && (
        <InputGroup.Append>
            <InputGroup.Text className="input-addon">{suffix}</InputGroup.Text>
        </InputGroup.Append>
    );
    const leftButton = (addonLeftButton) && (
        <InputGroup.Append className={buttonAppendGroupClass}>
            {addonLeftButton}
        </InputGroup.Append>
    );
    const rightButton = (addonRightButton) && (
        <InputGroup.Append className={buttonAppendGroupClass}>
            {addonRightButton}
        </InputGroup.Append>
    );
        
    return (
        <div className={noSpace ? "mb-0" : "mb-2"}>
            {textLabel}
            <InputGroup className={customClassGroup}>
                {prefixAppend}
                <input 
                    className={"form-control input-text shadow-none " + customClassInput}
                    type={type} 
                    placeholder={placeholder}
                    value={value}
                    onChange={event => onChange(event.target.value)}
                    disabled={disabled}
                />
                {suffixAppend}
                {leftButton}
                {rightButton}
            </InputGroup>
        </div>
    );
};

export default TextField;
