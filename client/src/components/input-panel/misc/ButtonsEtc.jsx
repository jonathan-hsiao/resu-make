import React, {useState} from "react";
import {updateInput, deleteItem, addItem} from "../../../utils";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import GoogleLogo from "../../../assets/images/googlelogo32px.png";
import BMCLogo from "../../../assets/images/bmc-button.png"
import LILogoBlue from "../../../assets/images/LIButtonBlue.png"
import LILogoGray from "../../../assets/images/LIButtonGray.png"
import IOSAppStoreLogo from "../../../assets/images/ios-app-store-logo.png"
import RSSGray from "../../../assets/images/rssgray.png"
import RSSBlack from "../../../assets/images/rssblack.png"

const DeleteItemButton = ({
        dispatch, 
        variant="outline-danger shadow-none", 
        payloadKey, 
        item, 
        label,
        icon, 
        customClass,
    }) => {

    const buttonIcon = (icon !== "") && (<i className="material-icons input-icon">{icon}</i>);
    
    return (
        <Button
            className={"input-button " + customClass}
            variant={variant}
            onClick={() => deleteItem(dispatch, payloadKey, item)}
        >
        {buttonIcon}{label}
        </Button>
    );
};

const AddItemButton = ({
        dispatch, 
        variant="outline-primary shadow-none", 
        payloadKey, 
        item, 
        label, 
        icon,
        customClass,
        getNewId,
    }) => {

    const buttonIcon = (icon !== "") && (<i className="material-icons input-icon">{icon}</i>);
    
    return (
        <Button
            className={"input-button " + customClass}
            variant={variant}
            onClick={() => {
                addItem(dispatch, payloadKey, item)
                getNewId && getNewId(item.id)
            }}
        >
        {buttonIcon}{label}
        </Button>
    );
};

const HideShowButton = ({
        dispatch, 
        variant="outline-primary shadow-none", 
        payloadKey, 
        customClass,
        currentState,
    }) => {
    
    return (
        <Button
            className={"hide-show-button " + customClass}
            variant={variant}
            onClick={() => {
                updateInput(dispatch, payloadKey, !currentState);
            }}
        >
        <i className="material-icons input-icon">{currentState ? "visibility" : "visibility_off"}</i>
        </Button>
    );
};

const CustomButton = ({
        variant="outline-primary shadow-none", 
        label, 
        icon,
        customClass,
        onClick,
    }) => {

    const useIcon = (icon !== "") && (<i className="material-icons input-icon">{icon}</i>);
    const separatorSpace = (icon && label) && ("\xa0\xa0")
    
    return (
        <Button
            className={"input-button " + customClass}
            variant={variant}
            onClick={onClick}
        >
        <div className="row input-button-row ml-0">
            <div className="input-button-row">
                {useIcon}
            </div>
            <div className="input-button-row">
                {separatorSpace}{label}
            </div>
        </div>
        </Button>
    );
};

const LinkButton = ({
        href,
        variant="outline-primary shadow-none", 
        label, 
        icon,
        customClass,
        onClick,
    }) => {

    const buttonIcon = (icon !== "") && (<i className="material-icons input-icon">{icon}</i>);
    const separatorSpace = (icon && label) && ("\xa0\xa0")
    
    return (
        <Button
            href={href}
            className={"input-button " + customClass}
            variant={variant}
            onClick={onClick}
        >
        <div className="row input-button-row ml-0">
            <div className="input-button-row">
                {buttonIcon}
            </div>
            <div className="input-button-row">
                {separatorSpace}{label}
            </div>
        </div>
        </Button>
    );
};

const GoogleButton = ({
        href,
        onClick,
    }) => {
    
    return (
        <Button
            href={href}
            className={"btn-google w-100 h-100 text-left shadow-none border mb-2 p-0"}
            onClick={onClick}
        >
            <div className="h-100 d-inline-block bg-white google-logo">
                <img src={GoogleLogo} className=""/>
            </div>
            <div className="d-inline-block pl-2">
                Sign in with Google
            </div>
        </Button>
    );
};

const BMCButton = () => {
    return (
        <Button
            className={"btn-bmc w-100 text-left shadow-none border mb-2 p-0"}
            onClick={() => window.open("https://www.buymeacoffee.com/jonathanhsiao", "_blank")}
        >
            <div className="h-100 d-inline-block bmc-logo">
                <img src={BMCLogo} className=""/>
            </div>
            <div className="d-inline-block pl-2 btn-bmc-text">
                Buy me a coffee
            </div>
        </Button>
    );
};

const LinkedInButton = () => {
    const [logo, setLogo] = useState(LILogoGray);
    return (
        <Button
            className="btn-li shadow-none border-0 mb-2 ml-1 p-0 float-right"
            onClick={() => {
                window.open("https://www.linkedin.com/in/hsiao-jonathan/", "_blank");
                setLogo(LILogoGray);
            }}
            onMouseEnter={() => setLogo(LILogoBlue)}
            onMouseOut={() => setLogo(LILogoGray)}
        >
            <div className="h-100 d-inline-block li-logo">
                <img src={logo} className="h-100"/>
            </div>
        </Button>
    );
};

const IOSAppStoreButton = () => {
    return (
        <Button
            className="btn-ios shadow-none border-0 mb-2 ml-1 p-0 float-right"
            onClick={() => {
                window.open("https://apps.apple.com/us/developer/jonathan-hsiao/id1480319313", "_blank");
            }}
        >
            <div className="h-100 d-inline-block ios-logo">
                <img src={IOSAppStoreLogo} className="h-100"/>
            </div>
        </Button>
    );
};

const WebsiteButton = () => {
    const [logo, setLogo] = useState(RSSGray);
    return (
        <Button
            className="btn-rss shadow-none border-0 mb-2 ml-1 p-0 float-right"
            onClick={() => {
                window.open("https://www.jonathanhsiao.com", "_blank");
                setLogo(RSSGray);
            }}
            onMouseEnter={() => setLogo(RSSBlack)}
            onMouseOut={() => setLogo(RSSGray)}
        >
            <div className="h-100 d-inline-block rss-logo">
                <img src={logo} className="h-100"/>
            </div>
        </Button>
    );
};

export {
    DeleteItemButton,
    AddItemButton,
    HideShowButton,
    CustomButton,
    LinkButton,
    GoogleButton,
    BMCButton,
    LinkedInButton,
    IOSAppStoreButton,
    WebsiteButton,
}