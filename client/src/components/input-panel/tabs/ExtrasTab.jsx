import React, {useState, useContext} from "react";
import { v4 as uuidv4 } from 'uuid';

import AppContext from "../../../context/AppContext";
import TextField from "../misc/TextField";
import TextArea from "../misc/TextArea";
import {DeleteItemButton, AddItemButton, MoveItemButton, HideShowButton, BMCButton } from "../misc/ButtonsEtc";

import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

const ExtrasTab = ({data, onChange}) => {
    const context = useContext(AppContext);
    const { dispatch } = context;
    const [newItemId, setNewItemId] = useState();
    
    const newItem = {
        id: uuidv4(),
        title: "",
        subtitle: "",
        description: "",
    };

    const getNewId = (id) => {
        setNewItemId(id);
    }

    return (
        <div className="w-100">
            <TextField 
                label="Section Title"
                placeholder="Section Title"
                value={data.extras.heading}
                onChange={value => onChange("data.extras.heading", value)}
                type = "text"
                customClassInput="border-right-0"
                addonRightButton={
                    <HideShowButton 
                        dispatch={dispatch}
                        variant="light"
                        payloadKey={"data.extras.enable"}
                        customClass="w-100 text-left shadow-none border border-left-0"
                        currentState={data.extras.enable}
                    />
                }
            />
            <hr></hr>
            {data.extras.items.map((item, index) => (
                <ExtraItem 
                    dispatch={dispatch}
                    item={data.extras.items[index]}
                    currentIndex ={index}
                    onChange={onChange}
                    id={"data.extras.items[" + index + "]"}
                    shouldOpen={(item.id === newItemId)}
                />
            ))}
            <AddItemButton 
                dispatch={dispatch}
                payloadKey={"data.extras.items"}
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

const ExtraItem = ({dispatch, item, currentIndex, onChange, id, shouldOpen=false}) => {
    const [open, setOpen] = useState(shouldOpen);

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
                        {!item.title ? "Untitled" : item.title}
                    </Button>
                </div>
                <div className="col-1 p-0">
                    <MoveItemButton
                        dispatch={dispatch}
                        payloadKey="data.extras.items"
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
                        payloadKey="data.extras.items"
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
                        label="Title"
                        placeholder="Title"
                        value={item.title}
                        onChange={value => onChange(`${id}.title`, value)}
                        type="text"
                    />
                    <TextField
                        label="Subitle"
                        placeholder="Subtitle"
                        value={item.subtitle}
                        onChange={value => onChange(`${id}.subtitle`, value)}
                        type="text"
                    />
                    <TextArea 
                        label="Description"
                        placeholder=""
                        value={item.description}
                        onChange={value => onChange(`${id}.description`, value)}
                        rows="4"
                    />
                </div>
            </Collapse>
        </div>
    );
};

export default ExtrasTab;