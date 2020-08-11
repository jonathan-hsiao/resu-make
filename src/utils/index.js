import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import WebFont from "webfontloader";

const server = require("./server");

const updateInput = (dispatch, key, value) => {
    dispatch({
        type: "input",
        payload: {
            key,
            value
        }
    });
};

const deleteItem = (dispatch, key, value) => {
    dispatch({
        type: "deleteItem",
        payload: {
            key,
            value
        }
    });
};

const addItem = (dispatch, key, value) => {
    dispatch({
        type: "addItem",
        payload: {
            key,
            value
        }
    });
};

const importData = (dispatch, data) => {
    dispatch({
        type: "importData",
        payload: {
            data
        }
    });
};

const clearAll = (dispatch) => {
    dispatch({type: "clearAll"});
};

const loadExample = (dispatch) => {
    dispatch({type: "loadExample"});
};

const isColor = (strColor) => {
    const s = new Option().style;
    s.color = strColor;
    // const test1 = s.color == strColor.toLowerCase();
    // const test2 = /^#([0-9A-F]{3}){1,2}$/i.test(strColor);
    // if(test1 || test2){
    //     return true;
    // } else{
    //     return false;
    // }
    if (s.color !== "") {
        return true
    } else {
        return false
    }
};

const replaceColor = (strColor, defaultColor) => {
    if (isColor(strColor)) {
        return strColor;
    } else {
        return defaultColor;
    }
}

const refreshFonts = (data) => {
    const fonts = Object.keys(data.fonts.titles).map(key => (data.fonts.titles[key].family))
        .concat(
            Object.keys(data.fonts.text).map(key => (data.fonts.text[key].family))
        );
    const fontsToLoad = fonts.filter(font => font !== "")
    
    console.log(fontsToLoad);

    if (fontsToLoad.length === 0) {
        return
    }

    WebFont.load({
        google: {
            families: fontsToLoad
        },
        fontinactive: function(fontFamily, fontDescription) {
            console.log(fontFamily + " not loaded");
        },
        timeout: 1500
    });
};

let pdfTimer = null;
const createPDF = (html, fileName, panZoomRef) => {
    if (pdfTimer) {
        return;
    }
    return new Promise(resolve => {
        panZoomRef.current.autoCenter(1);
        //panZoomRef.current.reset();

        pdfTimer = setTimeout(() => {
            html2canvas(html, {
                scale: 5,
                useCORS: true,
                allowTaint: true,
            }).then(canvas => {
                const image = canvas.toDataURL("image/jpeg");
                const doc = new jsPDF({
                    orientation: "portrait",
                    unit: "px",
                    format: "letter",
                });

                const width = doc.internal.pageSize.getWidth();
                const height = doc.internal.pageSize.getHeight();

                doc.addImage(image, "jpeg", 0, 0, width, height, null, "NONE");
                doc.save(`${fileName}.pdf`);

                pdfTimer = null;
                resolve();
            });
        }, 250);
    });
};

export {
    updateInput,
    deleteItem,
    addItem,
    importData,
    clearAll,
    loadExample,
    isColor,
    replaceColor,
    refreshFonts,
    createPDF,
    server,
};