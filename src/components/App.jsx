import React, { useContext, useRef } from 'react';
import AppContext from "../context/AppContext";
import InputPanel from "./input-panel/InputPanel";
import Resume from "./resume/Resume";
import { createPDF, refreshFonts } from "../utils";

import { PanZoom } from "react-easy-panzoom";

const App = () => {  
    const context = useContext(AppContext);
    const { state, dispatch } = context;
    const {data} = state;

    const componentRef = useRef();
    const panZoomRef = useRef();

    const handlePrint = () => {
        const html = componentRef.current;
        const fileName = data.exportFileName;
        createPDF(html, fileName, panZoomRef);
    };

    refreshFonts(data);

    return (
        <div className="d-flex">
            <div className="input-container p-0">
                <InputPanel 
                    handlePrint={handlePrint}
                />
            </div>
            <div className="container-fluid py-4 vh-100 overflow-auto resume-container bg-light">
                <PanZoom
                    ref={panZoomRef}     
                    minZoom="0.4"
                    autoCenter
                    enableBoundingBox
                    boundaryRatioVertical={0.8}
                    boundaryRatioHorizontal={0.8}
                    style={{ outline: 'none' }}
                >
                    <div ref={componentRef} className="shadow">
                        <Resume />
                    </div>
                </PanZoom>
            </div>
        </div>
    );
}

export default App;
