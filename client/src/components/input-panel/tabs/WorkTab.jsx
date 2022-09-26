import React, {useState, useContext} from "react";
import { v4 as uuidv4 } from 'uuid';

import AppContext from "../../../context/AppContext";
import TextField from "../misc/TextField";
import TextArea from "../misc/TextArea";
import {DeleteItemButton, AddItemButton, MoveItemButton, HideShowButton, BMCButton} from "../misc/ButtonsEtc";

import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

const WorkTab = ({data, onChange}) => {
    const context = useContext(AppContext);
    const { dispatch } = context;
    const [newItemId, setNewItemId] = useState();
    
    const newItem = {
        id: uuidv4(),
        companyName: "",
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
                value={data.work.heading}
                onChange={value => onChange("data.work.heading", value)}
                type = "text"
                customClassInput="border-right-0"
                addonRightButton={
                    <HideShowButton 
                        dispatch={dispatch}
                        variant="light"
                        payloadKey={"data.work.enable"}
                        customClass="w-100 text-left shadow-none border border-left-0"
                        currentState={data.work.enable}
                    />
                }
            />
            <hr></hr>
            {data.work.items.map((item, index) => (
                <WorkItem 
                    dispatch={dispatch}
                    item={data.work.items[index]}
                    currentIndex ={index}
                    onChange={onChange}
                    id={"data.work.items[" + index + "]"}
                    shouldOpen={(item.id === newItemId)}
                />
            ))}
            <AddItemButton 
                dispatch={dispatch}
                payloadKey={"data.work.items"}
                item={newItem}
                label="Add Employer"
                variant="light"
                customClass="w-100 text-left shadow-none border"
                getNewId={getNewId}
            />

            <hr className = "input-divider mb-4"></hr>
            <BMCButton/>
        </div>
    );
};

const WorkRole = ({dispatch, role, currentIndex, onChange, parentid, subid, needsDivider}) => {
    const divider = needsDivider && (
        <hr class="input-divider"></hr>
    );
    
    return (
        <div>
            <TextField 
                label="Position"
                placeholder="King in the North"
                value={role.title}
                onChange={value => onChange(`${subid}.title`, value)}
                type="text"
                buttonAppendGroupClass='input-addon-btn-narrow'
                addonLeftButton={
                    <MoveItemButton
                        dispatch={dispatch}
                        payloadKey={parentid + ".subItems"}
                        item={role}
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
                        item={role}
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
                        value={role.start}
                        onChange={value => onChange(`${subid}.start`, value)}
                        type="text"
                    />
                </div>
                <div className="col">
                    <TextField 
                        label="End Date"
                        placeholder="Dec 2020"
                        value={role.end}
                        onChange={value => onChange(`${subid}.end`, value)}
                        type="text"
                    />
                </div>
            </div>
            <TextArea 
                label="Description"
                placeholder=""
                value={role.description}
                onChange={value => onChange(`${subid}.description`, value)}
                rows="4"
            />
            {divider}
        </div>
    )
}

const WorkItem = ({dispatch, item, currentIndex, onChange, id, shouldOpen=false}) => {
    const [open, setOpen] = useState(shouldOpen);

    const newSubItem = {
        id: uuidv4(),
        title: "",
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
                        {!item.companyName ? "Untitled" : item.companyName}
                    </Button>
                </div>
                <div className="col-1 p-0">
                    <MoveItemButton
                        dispatch={dispatch}
                        payloadKey="data.work.items"
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
                        payloadKey="data.work.items"
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
                        label="Employer Name"
                        placeholder="Employer Name"
                        value={item.companyName}
                        onChange={value => onChange(`${id}.companyName`, value)}
                        type="text"
                    />
                    <hr className="input-divider"></hr>
                    {item.subItems.map((role, index, arr) => (
                        <WorkRole 
                            dispatch={dispatch}
                            role={role}
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

export default WorkTab