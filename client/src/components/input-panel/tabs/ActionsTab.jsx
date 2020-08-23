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

        </div>
    );
};

export default ActionsTab;