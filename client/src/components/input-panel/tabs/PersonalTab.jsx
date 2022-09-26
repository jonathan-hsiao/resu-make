import React, {useState, useContext} from "react";
import TextField from "../misc/TextField";
import {BMCButton} from "../misc/ButtonsEtc";

const PersonalTab = ({data, onChange}) => {

    return (
        <div className="w-100">
            <TextField 
                label="Section Title"
                placeholder="Section Title"
                value={data.personal.heading}
                onChange={value => onChange("data.personal.heading", value)}
                type = "text"
            />
            <hr></hr>
            <div className="form-row">
                <div className="col">
                    <TextField 
                        label="First Name"
                        placeholder="Jon"
                        value={data.personal.firstName}
                        onChange={value => onChange("data.personal.firstName", value)}
                        type = "text"
                    />
                </div>
                <div className="col">
                    <TextField 
                        label="Last Name"
                        placeholder="Snow"
                        value={data.personal.lastName}
                        onChange={value => onChange("data.personal.lastName", value)}
                        type = "text"
                    />
                </div>
            </div>
            <TextField 
                label="Heading"
                placeholder="King in the North"
                value={data.personal.subtitle}
                onChange={value => onChange("data.personal.subtitle", value)}
                type = "text"
            />
            <TextField 
                label="Profile Picture"
                placeholder="https://imgur.com/..."
                value={data.personal.photo}
                onChange={value => onChange("data.personal.photo", value)}
                type = "text"
            />
            <hr></hr>
            <TextField 
                label="Phone"
                placeholder="(777) 777-7777"
                value={data.personal.phone}
                onChange={value => onChange("data.personal.phone", value)}
                type = "text"
            />
            <TextField 
                label="Email"
                placeholder="jon.snow@gmail.com"
                value={data.personal.email}
                onChange={value => onChange("data.personal.email", value)}
                type = "text"
            />
            <TextField 
                label="Location"
                placeholder="Winterfell"
                value={data.personal.location}
                onChange={value => onChange("data.personal.location", value)}
                type = "text"
            />

            <hr className = "input-divider mb-4"></hr>
            <BMCButton/>
        </div>
    )
};

export default PersonalTab;