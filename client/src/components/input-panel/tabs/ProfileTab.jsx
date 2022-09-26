import React, {useState, useContext} from "react";
import AppContext from "../../../context/AppContext";
import TextField from "../misc/TextField";
import TextArea from "../misc/TextArea";
import { HideShowButton, BMCButton } from "../misc/ButtonsEtc";

const ProfileTab = ({data, onChange}) => {
    const context = useContext(AppContext);
    const { dispatch } = context;

    return (
        <div className="w-100">
            <TextField 
                label="Section Title"
                placeholder="Section Title"
                value={data.profile.heading}
                onChange={value => onChange("data.profile.heading", value)}
                type = "text"
                customClassInput="border-right-0"
                addonRightButton={
                    <HideShowButton 
                        dispatch={dispatch}
                        variant="light"
                        payloadKey={"data.profile.enable"}
                        customClass="w-100 text-left shadow-none border border-left-0"
                        currentState={data.profile.enable}
                    />
                }
            />
            <hr></hr>
            <TextArea 
                label={data.profile.heading}
                placeholder="Tell your story!"
                value={data.profile.body}
                onChange={value => onChange("data.profile.body", value)}
                rows="15"
            />

            <hr className = "input-divider mb-4"></hr>
            <BMCButton/>
        </div>
    )
};

export default ProfileTab;