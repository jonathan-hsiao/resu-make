import React, {useState, useContext} from "react";
import { v4 as uuidv4 } from 'uuid';

import AppContext from "../../../context/AppContext";
import TextField from "../misc/TextField";
import {DeleteItemButton, AddItemButton, MoveItemButton, HideShowButton, BMCButton} from "../misc/ButtonsEtc";

const SkillsTab = ({data, onChange}) => {
    const context = useContext(AppContext);
    const { dispatch } = context;
    
    const newItem = {
        id: uuidv4(),
        skill: "",
    };

    return (
        <div className="w-100">
            <TextField 
                label="Section Title"
                placeholder="Section Title"
                value={data.skills.heading}
                onChange={value => onChange("data.skills.heading", value)}
                type = "text"
                customClassInput="border-right-0"
                addonRightButton={
                    <HideShowButton 
                        dispatch={dispatch}
                        variant="light"
                        payloadKey={"data.skills.enable"}
                        customClass="w-100 text-left shadow-none border border-left-0"
                        currentState={data.skills.enable}
                    />
                }
            />
            <hr></hr>
            {data.skills.items.map((item, index) => (
                <SkillItem 
                    dispatch={dispatch}
                    item={data.skills.items[index]}
                    currentIndex ={index}
                    onChange={onChange}
                    id={"data.skills.items[" + index + "]"}
                />
            ))}
            <AddItemButton 
                dispatch={dispatch}
                payloadKey={"data.skills.items"}
                item={newItem}
                label="Add Skill"
                variant="light"
                customClass="w-100 text-left shadow-none border"
            />

            <hr className = "input-divider mb-4"></hr>
            <BMCButton/>
        </div>
    )
}

const SkillItem = ({dispatch, item, currentIndex, onChange, id}) => {

    return (
        <div className="mb-3">
            <TextField
                placeholder="Skill"
                value={item.skill}
                onChange={value => onChange(`${id}.skill`, value)}
                type="text"
                customClassGroup="border rounded"
                customClassInput=" border-0"
                buttonAppendGroupClass='input-addon-btn-narrow'
                addonLeftButton={
                    <MoveItemButton
                        dispatch={dispatch}
                        payloadKey="data.skills.items"
                        item={item}
                        currentIndex={currentIndex}
                        upIcon="keyboard_arrow_up"
                        downIcon="keyboard_arrow_down"
                        variant="light"
                        customClass="w-100 shadow-none"
                    />
                }
                addonRightButton={
                    <DeleteItemButton 
                        dispatch={dispatch}
                        payloadKey="data.skills.items"
                        item={item}
                        icon="delete"
                        variant="light"
                        customClass="w-100 shadow-none"
                    />
                }
            />
        </div>
    );
};

export default SkillsTab;