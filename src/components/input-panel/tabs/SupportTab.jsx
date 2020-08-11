import React, {useState, useContext, useEffect} from "react";
import AppContext from "../../../context/AppContext";
import UserContext from "../../../context/UserContext";
import { BMCButton, CustomButton, LinkedInButton, IOSAppStoreButton, WebsiteButton } from "../misc/ButtonsEtc";
import TextField from "../misc/TextField";
import TextArea from "../misc/TextArea";

import Button from "react-bootstrap/Button";

const SupportTab = ({data, onChange}) => {
    const context = useContext(AppContext);
    const { dispatch } = context;

    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const sendEmail = () => {
        const mailTo = `mailto:jonathan.hsiao.dev@gmail.com?subject=${subject}&body=${body}`;
        window.open(mailTo, "_blank");
    };


    return (
        <div className="w-100">
            <label className="input-label">Leave a message</label>
            <TextField
                label="Subject"
                placeholder="Subject"
                value={subject}
                onChange={value => setSubject(value)}
                type="text"
                labelClassName="font-label mb-1 pl-1"
            />
            <TextArea 
                label="Message"
                placeholder="What's up?"
                value={body}
                onChange={value => setBody(value)}
                rows="11"
                labelClassName="font-label mb-1 pl-1"
                customClassGroup="mb-2"
            />
            <CustomButton 
                variant="light"
                label="Send Email"
                icon="email"
                customClass="w-100 h-100 text-left shadow-none border"
                onClick={() => sendEmail()}
            />

            <hr className = "input-divider mb-4"></hr>
            <BMCButton/>
            <LinkedInButton/>
            <IOSAppStoreButton/>
            <WebsiteButton />

        </div>
    );
};

export default SupportTab;