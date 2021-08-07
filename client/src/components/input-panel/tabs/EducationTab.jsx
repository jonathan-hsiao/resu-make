import React, {useState, useContext} from "react";
import { v4 as uuidv4 } from 'uuid';

import AppContext from "../../../context/AppContext";
import TextField from "../misc/TextField";
import TextArea from "../misc/TextArea";
import {DeleteItemButton, AddItemButton, MoveItemButton, HideShowButton} from "../misc/ButtonsEtc";

import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

const EducationTab = ({data, onChange}) => {
    const context = useContext(AppContext);
    const { dispatch } = context;
    const [newItemId, setNewItemId] = useState();
    
    const newItem = {
        id: uuidv4(),
        schoolName: "",
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
                value={data.education.heading}
                onChange={value => onChange("data.education.heading", value)}
                type = "text"
                customClassInput="border-right-0"
                addonRightButton={
                    <HideShowButton 
                        dispatch={dispatch}
                        variant="light"
                        payloadKey={"data.education.enable"}
                        customClass="w-100 text-left shadow-none border border-left-0"
                        currentState={data.education.enable}
                    />
                }
            />
            <hr></hr>
            {data.education.items.map((item, index) => (
                <EducationItem 
                    dispatch={dispatch}
                    item={data.education.items[index]}
                    currentIndex ={index}
                    onChange={onChange}
                    id={"data.education.items[" + index + "]"}
                    shouldOpen={(item.id === newItemId)}
                />
            ))}
            <AddItemButton 
                dispatch={dispatch}
                payloadKey={"data.education.items"}
                item={newItem}
                label="Add Education"
                variant="light"
                customClass="w-100 text-left shadow-none border"
                getNewId={getNewId}
            />
        </div>
    );
};

const EducationMajor = ({dispatch, major, currentIndex, onChange, parentid, subid, needsDivider}) => {
    const divider = needsDivider && (
        <hr class="input-divider"></hr>
    );
    
    return (
        <div>
            <TextField 
                label="Degree"
                placeholder="Degree"
                value={major.degree}
                onChange={value => onChange(`${subid}.degree`, value)}
                type="text"
                buttonAppendGroupClass='input-addon-btn-narrow'
                addonLeftButton={
                    <MoveItemButton
                        dispatch={dispatch}
                        payloadKey={parentid + ".subItems"}
                        item={major}
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
                        item={major}
                        icon="delete"
                        variant="light"
                        customClass="border-top border-right border-bottom w-100 shadow-none"
                    />
                }
            />
            <div className="form-row">
                <div className="col">
                    <TextField 
                        label="Start Date"
                        placeholder="Jan 2020"
                        value={major.start}
                        onChange={value => onChange(`${subid}.start`, value)}
                        type="text"
                    />
                </div>
                <div className="col">
                    <TextField 
                        label="End Date"
                        placeholder="Dec 2020"
                        value={major.end}
                        onChange={value => onChange(`${subid}.end`, value)}
                        type="text"
                    />
                </div>
            </div>
            <TextArea 
                label="Description"
                placeholder=""
                value={major.description}
                onChange={value => onChange(`${subid}.description`, value)}
                rows="4"
            />
            {divider}
        </div>
    )
}

const EducationItem = ({dispatch, item, currentIndex, onChange, id, shouldOpen=false}) => {
    const [open, setOpen] = useState(shouldOpen);

    const newSubItem = {
        id: uuidv4(),
        degree: "",
        grade: "",
        start: "",
        end: "",
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
                        aria-controls="collapseItem"
                        aria-expanded={open}
                    >
                        {!item.schoolName ? "Untitled" : item.schoolName}
                    </Button>
                </div>
                <div className="col-1 p-0">
                    <MoveItemButton
                        dispatch={dispatch}
                        payloadKey="data.education.items"
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
                        payloadKey="data.education.items"
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
                        label="School Name"
                        placeholder="School Name"
                        value={item.schoolName}
                        onChange={value => onChange(`${id}.schoolName`, value)}
                        type="text"
                    />
                    <hr className="input-divider"></hr>
                    {item.subItems.map((major, index, arr) => (
                        <EducationMajor
                            dispatch={dispatch}
                            major={major}
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

export default EducationTab