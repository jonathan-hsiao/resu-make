import React, {useState, useContext} from "react";
import { v4 as uuidv4 } from 'uuid';

import AppContext from "../../../context/AppContext";
import TextField from "../misc/TextField";
import TextArea from "../misc/TextArea";
import {DeleteItemButton, AddItemButton, MoveItemButton, HideShowButton, BMCButton } from "../misc/ButtonsEtc";

import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

const CertificationsTab = ({data, onChange}) => {
    const context = useContext(AppContext);
    const { dispatch } = context;
    const [newItemId, setNewItemId] = useState();
    
    const newItem = {
        id: uuidv4(),
        institutionName: "",
        subItems: [],
    };

    const getNewId = (id) => {
        setNewItemId(id);
    }

    return (
        <div className="w-100">
            <TextField 
                label="Section Title"
                placeholder="Section Title"
                value={data.certifications.heading}
                onChange={value => onChange("data.certifications.heading", value)}
                type = "text"
                customClassInput="border-right-0"
                addonRightButton={
                    <HideShowButton 
                        dispatch={dispatch}
                        variant="light"
                        payloadKey={"data.certifications.enable"}
                        customClass="w-100 text-left shadow-none border border-left-0"
                        currentState={data.certifications.enable}
                    />
                }
            />
            <hr></hr>
            {data.certifications.items.map((item, index) => (
                <CertificationItem 
                    dispatch={dispatch}
                    item={data.certifications.items[index]}
                    currentIndex ={index}
                    onChange={onChange}
                    id={"data.certifications.items[" + index + "]"}
                    shouldOpen={(item.id === newItemId)}
                />
            ))}
            <AddItemButton 
                dispatch={dispatch}
                payloadKey={"data.certifications.items"}
                item={newItem}
                label="Add Item"
                variant="light"
                customClass="w-100 text-left shadow-none border"
                getNewId={getNewId}
            />

            <hr className = "input-divider mb-4"></hr>
            <BMCButton/>
        </div>
    );
};

const CertificationCert = ({dispatch, cert, currentIndex, onChange, parentid, subid, needsDivider}) => {
    const divider = needsDivider && (
        <hr class="input-divider"></hr>
    );
    
    return (
        <div>
            <TextField 
                label="Name"
                placeholder="Name"
                value={cert.name}
                onChange={value => onChange(`${subid}.name`, value)}
                type="text"
                buttonAppendGroupClass='input-addon-btn-narrow'
                addonLeftButton={
                    <MoveItemButton
                        dispatch={dispatch}
                        payloadKey={parentid + ".subItems"}
                        item={cert}
                        currentIndex={currentIndex}
                        upIcon="keyboard_arrow_up"
                        downIcon="keyboard_arrow_down"
                        variant="light"
                        customClass="border-top border-bottom w-100 shadow-none"
                    />
                }
                addonRightButton={
                    <DeleteItemButton 
                        dispatch={dispatch}
                        payloadKey={parentid + ".subItems"}
                        item={cert}
                        icon="delete"
                        variant="light"
                        customClass="border-top border-right border-bottom w-100 shadow-none"
                    />
                }
            />
            <TextArea 
                label="Description"
                placeholder=""
                value={cert.description}
                onChange={value => onChange(`${subid}.description`, value)}
                rows="4"
            />
            {divider}
        </div>
    )
}

const CertificationItem = ({dispatch, item, currentIndex, onChange, id, shouldOpen=false}) => {
    const [open, setOpen] = useState(shouldOpen);

    const newSubItem = {
        id: uuidv4(),
        name: "",
        description: "",
    };

    return (
        <div className="mb-3 border rounded">
            <div className="form-row w-100 m-0">
                <div className="col-10">
                    <Button 
                        className="w-100 text-left shadow-none input-collapse-btn"
                        variant="btn-light" 
                        onClick={() => setOpen(!open)}
                        area-controls="collapseItem"
                        area-expanded={open}
                    >
                        {!item.institutionName ? "Untitled" : item.institutionName}
                    </Button>
                </div>
                <div className="col-1 p-0">
                    <MoveItemButton
                        dispatch={dispatch}
                        payloadKey="data.certifications.items"
                        item={item}
                        currentIndex={currentIndex}
                        upIcon="keyboard_arrow_up"
                        downIcon="keyboard_arrow_down"
                        customClass="w-100 h-100 p-0 shadow-none"
                        variant="light shadow-none border-0"
                    />
                </div>
                <div className="col-1 p-0">
                    <DeleteItemButton 
                        dispatch={dispatch}
                        payloadKey="data.certifications.items"
                        item={item}
                        icon="delete"
                        customClass="w-100 h-100 p-0 shadow-none"
                        variant="light shadow-none border-0"
                    />
                </div>
            </div>
            <Collapse in={open}>
                <div className="form-group p-3" id="collapseItem">
                    <TextField
                        label="Institution Name"
                        placeholder="Institution Name"
                        value={item.institutionName}
                        onChange={value => onChange(`${id}.institutionName`, value)}
                        type="text"
                    />
                    <hr className="input-divider"></hr>
                    {item.subItems.map((cert, index, arr) => (
                        <CertificationCert
                            dispatch={dispatch}
                            cert={cert}
                            currentIndex={index}
                            onChange={onChange}
                            subid={id + ".subItems[" + index + "]"}
                            parentid={id}
                            needsDivider={true}
                        />
                    ))}
                    <AddItemButton 
                        dispatch={dispatch}
                        payloadKey={id + ".subItems"}
                        item={newSubItem}
                        icon="add"
                        variant="light"
                        customClass="shadow-none"
                    />
                </div>
            </Collapse>
        </div>
    );
};


export default CertificationsTab