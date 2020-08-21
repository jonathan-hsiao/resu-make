import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../context/AppContext";
import TextField from "../misc/TextField";
import { CustomButton, TooltipButton } from "../misc/ButtonsEtc";
import { clearAll, loadExample, isColor, replaceColor, refreshFonts } from "../../../utils";

import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import RangeSlider from 'react-bootstrap-range-slider';

const ActionsTab = ({data, handlePrint, handleSaveAsPNG, onChange}) => {
    const context = useContext(AppContext);
    const { dispatch } = context;

    return (
        <div className="w-100">
            <label className="input-label">file name for export</label>
            <TooltipButton 
                tooltipMessage="Exporting works best with Google Chrome browser on non-mobile devices"
            />
            <TextField
                placeholder="file-name"
                suffix=".pdf"
                value={data.exportFileName}
                onChange={value => onChange("data.exportFileName", value)}
                type = "text"
                customClassGroup="mb-2"
            />
            <CustomButton 
                variant="light"
                label="Print"
                icon="print"
                customClass="w-100 h-100 text-left shadow-none border mb-2"
                onClick={handlePrint}
            />
            <CustomButton 
                variant="light"
                label="Save as PDF (png)"
                icon="save"
                customClass="w-100 h-100 text-left shadow-none border"
                onClick={handleSaveAsPNG}
            />
            <hr className="input-divider mt-4 mb-3"></hr>
            <div className="form-row">
                <div className="col-6">
                    <label className="input-label">Clear All</label>
                    <CustomButton 
                        variant="light"
                        label="Clear"
                        icon="cancel"
                        customClass="w-100 text-left shadow-none border"
                        onClick={() => clearAll(dispatch)}
                    />
                </div>
                <div className="col-6">
                    <label className="input-label">Load Example</label>
                    <CustomButton 
                        variant="light"
                        label="Load"
                        icon="description"
                        customClass="w-100 text-left shadow-none border"
                        onClick={() => {
                            loadExample(dispatch);
                            refreshFonts(data);
                        }}
                    />
                </div>
            </div>

            <hr className="input-divider mt-4 mb-3"></hr>
            <label className="input-label">Customize Colors</label>
            <TooltipButton 
                tooltipMessage="valid formats: black, #000000, rgb(0,0,0)"
            />
            <ColorForm 
                label="Header Colors"
                onChange={onChange}
                data={data}
                section="header"
            />
            <ColorForm 
                label="Left Panel Colors"
                onChange={onChange}
                data={data}
                section="panel"
            />
            <ColorForm 
                label="Main Body Colors"
                onChange={onChange}
                data={data}
                section="body"
            />

            <hr className="input-divider mt-4 mb-3"></hr>
            <label className="input-label">Customize Fonts</label>
            <TooltipButton 
                tooltipMessage="powered by Google Fonts https://fonts.google.com/"
            />
            <FontForm 
                label="Title Fonts"
                onChange={onChange}
                data={data}
                section="titles"
            />
            <FontForm 
                label="Text Fonts"
                onChange={onChange}
                data={data}
                section="text"
            />

            <hr className="input-divider mt-4 mb-3"></hr>
            <label className="input-label">Customize Layout</label>
            <LayoutForm
                label="Dimensions"
                onChange={onChange}
                data={data}
                section="text"
            />

        </div>
    );
};

const FontForm = ({label, onChange, data, section}) => {    
    const [openState, setOpen] = useState(false);
    return (
        <div className="mb-2 border rounded">
            <Button 
                className="w-100 text-left shadow-none input-collapse-btn"
                variant="btn-light" 
                onClick={() => {
                    setOpen(!openState)
                }}
                aria-controls="collapseItem"
                aria-expanded={openState}
            >
                {label}
            </Button>
            <Collapse in={openState}>
                <div className="form-group px-3 py-1" id="collapseItem">
                    {Object.keys(data.fonts[section]).map((key, index) => {
                        const divider = (index + 1 !== Object.keys(data.fonts[section]).length) &&
                            <hr className="input-divider"></hr>
                        return (
                            <div className="mb-2">
                                <label className="input-label mb-2">{data.fonts[section][key].name}</label>
                                <div className="form-group row pr-2 mb-2">
                                    <label class="col-2 px-0 col-form-label font-label text-right">Font:</label>
                                    <div className="col-6 pl-1 pr-1">
                                        <input 
                                            className="form-control input-text shadow-none h-100"
                                            type="text"
                                            placeholder="Font family"
                                            value={data.fonts[section][key].family}
                                            onChange={event => {
                                                onChange(`data.fonts.${section}.${key}.family`, event.target.value);
                                                refreshFonts(data);
                                            }}
                                            disabled={false}
                                        />
                                    </div>
                                    
                                    <label class="col-2 px-0 col-form-label font-label text-right">Italic:</label>
                                    <div className="col-2 d-flex pl-2 pr-0">
                                        <input 
                                            className="form-control font-checkbox my-auto"
                                            type="checkbox"
                                            value={data.fonts[section][key].style === "italic"}
                                            onChange={event => {onChange(`data.fonts.${section}.${key}.style`, event.target.checked ? "italic" : "")
                                                console.log(event.target.checked);
                                            }}
                                            disabled={false}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row pr-2">
                                    <label class="col-2 px-0 col-form-label font-label text-right">Size:</label>
                                    <div className="col-4 pl-1 pr-2">
                                        <select
                                            className="form-control font-selector form-control-sm"
                                            value={data.fonts[section][key].size}
                                            onChange={event => onChange(`data.fonts.${section}.${key}.size`, event.target.value)}
                                        >
                                            {Array.from(Array(72), (_, i) => i + 1).map(i => (
                                                <option>{i}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <label class="col-2 px-0 col-form-label font-label text-right">Weight:</label>
                                    <div className="col-4 pl-1 pr-2">
                                        <select
                                            className="form-control font-selector form-control-sm"
                                            value={data.fonts[section][key].weight}
                                            onChange={event => onChange(`data.fonts.${section}.${key}.weight`, event.target.value)}
                                        >
                                            <option>100</option>
                                            <option>200</option>
                                            <option>300</option>
                                            <option>400</option>
                                            <option>500</option>
                                            <option>600</option>
                                            <option>700</option>
                                            <option>800</option>
                                            <option>900</option>
                                        </select>
                                    </div>
                                </div>
                                {divider}
                            </div>
                        )
                    })}
                </div>
            </Collapse>
        </div>
    );

};

const ColorForm = ({label, onChange, data, section}) => {    
    const [openState, setOpen] = useState(false);
    return (
        <div className="mb-2 border rounded">
            <Button 
                className="w-100 text-left shadow-none input-collapse-btn"
                variant="btn-light" 
                onClick={() => {
                    setOpen(!openState)
                }}
                aria-controls="collapseItem"
                aria-expanded={openState}
            >
                {label}
            </Button>
            <Collapse in={openState}>
                <div className="form-group px-3 py-1" id="collapseItem">
                    {Object.keys(data.colors[section]).map(key => {
                        const invalidColorWarning = !isColor(data.colors[section][key].value) &&
                            (data.colors[section][key].value !== "") &&
                            <label className="warning-label m-0 p-0 pl-1">not a valid color string</label>
                        return (
                            <div className="mb-2">
                                <TextField
                                    label={data.colors[section][key].name}
                                    placeholder="#ffffff"
                                    value={data.colors[section][key].value}
                                    onChange={value => onChange(`data.colors.${section}.${key}.value`, value)}
                                    addonRightButton={
                                        <Button 
                                            style={{
                                                backgroundColor: replaceColor(data.colors[section][key].value, "white"), 
                                                width: "55px",
                                                borderColor: "black",
                                                borderWidth: "2px"
                                            }}
                                            className="color-button"
                                        />
                                    }
                                    noSpace={true}
                                    customClassInput="input-color"
                                />
                                {invalidColorWarning}
                            </div>
                        )
                    })}
                </div>
            </Collapse>
        </div>
    );
};

const LayoutForm = ({label, onChange, data}) => {    
    const [openState, setOpen] = useState(false);
    return (
        <div className="mb-2 border rounded">
            <Button 
                className="w-100 text-left shadow-none input-collapse-btn"
                variant="btn-light" 
                onClick={() => {
                    setOpen(!openState)
                }}
                aria-controls="collapseItem"
                aria-expanded={openState}
            >
                {label}
            </Button>
            <Collapse in={openState}>
                <div className="form-group px-3 py-1" id="collapseItem">
                    {Object.keys(data.layout.dimensions).map((key, index) => {
                        return (
                            <div className="mb-3">
                                <label className="input-label mb-0">{data.layout.dimensions[key].name}</label>
                                <RangeSlider
                                    value={data.layout.dimensions[key].value}
                                    onChange={event => onChange(`data.layout.dimensions.${key}.value`, event.target.value)}
                                    size="sm"
                                    variant="secondary"
                                    tooltipLabel={currentValue => `${currentValue + data.layout.dimensions[key].unit}`}
                                    min={parseFloat(data.layout.dimensions[key].min)}
                                    max={parseFloat(data.layout.dimensions[key].max)}
                                    step={parseFloat(data.layout.dimensions[key].step)}
                                />
                            </div>
                        )})
                    }
                </div>
            </Collapse>
        </div>
    );
};

export default ActionsTab;