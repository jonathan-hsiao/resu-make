import React, {useState, useContext, Profiler} from "react";
import AppContext from "../../context/AppContext";

import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import PersonalTab from "./tabs/PersonalTab";
import ProfileTab from "./tabs/ProfileTab";
import WorkTab from "./tabs/WorkTab";
import EducationTab from "./tabs/EducationTab";
import SkillsTab from "./tabs/SkillsTab";
import CertificationsTab from "./tabs/CertificationsTab";
import ExtrasTab from "./tabs/ExtrasTab";
import ActionsTab from "./tabs/ActionsTab";
import AccountTab from "./tabs/AccountTab";
import SupportTab from "./tabs/SupportTab";

const InputPanel = ({handlePrint, handleSaveAsPNG}) => {
    const context = useContext(AppContext);
    const {state, dispatch} = context;
    const {data, tabKey} = state;

    const tabs = [
        {key: "personal", name: data.personal.heading, isEnabled: true, type: "input"},
        {key: "profile", name: data.profile.heading, isEnabled: data.profile.enable, type: "input"},
        {key: "work", name: data.work.heading, isEnabled: data.work.enable, type: "input"},
        {key: "education", name: data.education.heading, isEnabled: data.education.enable, type: "input"},
        {key: "skills", name: data.skills.heading, isEnabled: data.skills.enable, type: "input"},
        {key: "certifications", name: data.certifications.heading, isEnabled: data.certifications.enable, type: "input"},
        {key: "extras", name: data.extras.heading, isEnabled: data.extras.enable, type: "input"},
        {key: "actions", name: "Control Panel", isEnabled: true, type: "action"},
        {key: "account", name: "My Account", isEnabled: true, type: "action"},
        {key: "support", name: "Get in Touch", isEnabled: true, type: "contact"},
    ];

    const onChange = (key, value) => {
        dispatch({
            type: "input",
            payload: {
                key,
                value
            }
        });
    };

    const handleSelect = (event) => {
        onChange("tabKey", event)
    };

    const renderTab = () => {
        switch(tabKey) {
            case "personal":
                return <PersonalTab data={data} onChange={onChange}/>
            case "profile":
                return <ProfileTab data={data} onChange={onChange}/>
            case "work":
                return <WorkTab data={data} onChange={onChange}/>
            case "education":
                return <EducationTab data={data} onChange={onChange}/>
            case "skills":
                return <SkillsTab data={data} onChange={onChange}/>
            case "certifications":
                return <CertificationsTab data={data} onChange={onChange}/>
            case "extras":
                return <ExtrasTab data={data} onChange={onChange}/>
            case "actions":
                return <ActionsTab data={data} onChange={onChange} handlePrint={handlePrint} handleSaveAsPNG={handleSaveAsPNG}/>
            case "account":
                return <AccountTab data={data} onChange={onChange}/>
            case "support":
                return <SupportTab data={data} onChange={onChange}/>
            default:
                return null
        }
    };

    return (
        <div className="container-fluid vh-100 p-0 bg-white input-panel-font">
            <div className="input-menu h-100 w-100 bg-white overflow-auto">
                {/* section dropdown */}
                <Dropdown as={ButtonGroup} onSelect={handleSelect}>
                    <Button className="section-btn shadow-none border" variant="btn-light">
                        {tabs.filter(tab => tab.key === tabKey)[0].name}
                    </Button>
                    <Dropdown.Toggle 
                        split
                        className="shadow-none border"
                        variant="light" 
                        id="dropdown-button"
                    />
                    <Dropdown.Menu alignRight>
                        <Dropdown.Header>Edit Section:</Dropdown.Header>
                        {tabs.filter(tab => tab.type === "input").map((tab) => (
                            <Dropdown.Item 
                                className={`section-menu-items ${!tab.isEnabled && "deactivated"}`} eventKey={tab.key}
                            >
                                {(!tab.isEnabled) && (<i className="material-icons input-icon-light">visibility_off</i>)}
                                {(!tab.isEnabled) && "\xa0"}
                                {(tab.name !== "") ? tab.name : "Untitled Section"}
                            </Dropdown.Item>
                        ))}
                        <Dropdown.Divider />
                        <Dropdown.Header>Other Actions:</Dropdown.Header>
                        {tabs.filter(tab => tab.type === "action").map((tab) => (
                            <Dropdown.Item className="section-menu-items" eventKey={tab.key}>
                                {tab.name}
                            </Dropdown.Item>
                        ))}
                        <Dropdown.Divider />
                        <Dropdown.Header>Contact Me:</Dropdown.Header>
                        {tabs.filter(tab => tab.type === "contact").map((tab) => (
                            <Dropdown.Item className="section-menu-items" eventKey={tab.key}>
                                {tab.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                {/* input forms */}
                <div>
                    {renderTab()}
                </div>
            </div>

        </div>
    )
}

export default InputPanel;