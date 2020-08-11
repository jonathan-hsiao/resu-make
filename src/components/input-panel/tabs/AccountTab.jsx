import React, {useState, useContext, useEffect} from "react";
import AppContext from "../../../context/AppContext";
import UserContext from "../../../context/UserContext";
import TextField from "../misc/TextField";
import { CustomButton, TableButton, DeleteItemButton, LinkButton, GoogleButton } from "../misc/ButtonsEtc";

import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

import { clearAll, addItem, updateInput, importData, deleteItem, refreshFonts } from "../../../utils";
const { server } = require("../../../utils");

const AccountTab = ({data, onChange}) => {
    const context = useContext(AppContext);
    const { dispatch } = context;

    const userContext = useContext(UserContext);
    const { state: userState, dispatch: userDispatch } = userContext;
    const { userData } = userState;

    const [password, setPassword] = useState(""); //password input
    const [isLoggedIn, setIsLoggedIn] = useState(false); //indicate user is logged in or not
    const [openState, setOpen] = useState({openLogin: false, openRegister: false}); //show login or register forms
    const [openSaved, setOpenSaved] = useState(false); //show saved resumes
    const [showAlert, setShowAlert] = useState(false); //override alert
    const [selected, setSelected] = useState(""); //current selected resume (from loaded)
    const [needsRefresh, setNeedsRefresh] = useState(true); //refresh loaded resumes
    const [updated, setUpdated] = useState(false); //to force refresh
    const [loginErrMsg, setLoginErrMsg] = useState(""); //login error for label
    const [saveErrMsg, setSaveErrMsg] = useState(""); //save error for label
    const [delErrMsg, setDelErrMsg] = useState(""); //delete error for label

    useEffect(() => {
        if (needsRefresh) {
            clearErrors();
            loadData();
            refreshFonts(data);
            setNeedsRefresh(false);
        }
    });

    const clearErrors = () => {
        setSaveErrMsg("");
        setLoginErrMsg("");
        setDelErrMsg("");
    };
    
    const onUserChange = (key, value) => {
        userDispatch({
            type: "input",
            payload: {
                key,
                value
            }
        });
    };

    const handleLogin = async e => {
        e.preventDefault();
        const { email } = userData;
        const { success, data } = await server.postAsync("/auth/login", {
            email,
            password
        });
        if (success) {
            console.log(data);
            clearErrors();
            setOpen({openLogin: false, openRegister: false});
            setNeedsRefresh(true);
        } else {
            setLoginErrMsg(data);
            return;
        }
    };

    const handleRegister = async e => {
        e.preventDefault();
        const { email } = userData;
        const { success, data } = await server.postAsync("/auth/register", {
            email,
            password
        });
        if (success) {
            console.log(data);
            clearErrors();
            setOpen({openLogin: false, openRegister: false});
            setNeedsRefresh(true);
            return;
        } else {
            setLoginErrMsg(data);
            return;
        }
    };

    const handleLogout = async e => {
        e.preventDefault();
        const { success, data } = await server.getAsync("/auth/logout");
        if (success) {
            console.log(data);
            clearErrors();
            setIsLoggedIn(false);
            clearAll(userDispatch);
            setOpen({openLogin: false, openRegister: false});
            setOpenSaved(false);
            setNeedsRefresh(true);
        } else {
            console.log(data);
            return;
        }
    };

    const handleSave = async e => {
        e.preventDefault();

        if (!isLoggedIn) {
            setSaveErrMsg("sign in to save resumes");
            return;
        }

        if (data.resumeName === "") {
            setSaveErrMsg("resume name can't be blank");
            return;
        }

        const foundResume = userData.savedResumes.find(r => r.resumeName === data.resumeName);
        if (foundResume) {
            setShowAlert(true);
        } else {
            saveResumes();
        }
    };

    const saveResumes = async () => {
        const currentDate = new Date();

        const newResumes = userData.savedResumes.filter(r => r.resumeName !== data.resumeName);
        data.dateLastSaved = currentDate;
        newResumes.unshift(data);

        const { success, data: result } = await server.postAsync("/auth/saveData", { newResumes });

        if (success) {
            console.log(result);
            userData.savedResumes = newResumes;
            setSelected(data.resumeName);
            setOpenSaved(true);
            setNeedsRefresh(true);
            return;
        } else {
            setSaveErrMsg(result);
            return;
        }
    };

    const deleteResume = async (resumeToDelete) => {

        const newResumes = userData.savedResumes.filter(r => r.resumeName !== resumeToDelete.resumeName);

        const { success, data: result } = await server.postAsync("/auth/saveData", { newResumes });

        if (success) {
            console.log(result);
            userData.savedResumes = newResumes
            if (resumeToDelete.resumeName === selected) {
                setSelected("");
                clearAll(dispatch);
            }
            setNeedsRefresh(true);
            return;
        } else {
            setDelErrMsg(result);
            return;
        }
    };

    const loadData = async () => {
        const { success, data } = await server.getAsync("/auth/loadData");
        if (success && data) {
            userData.email = data.email;
            if (data.resumes) {
                const userResumes = data.resumes;
                userResumes.sort((a, b) => a.dateLastSaved < b.dateLastSaved ? 1 : -1);
                userData.savedResumes = userResumes;
            }
            setIsLoggedIn(true);
            return;
        } else {
            console.log(data);
            clearAll(userDispatch);
            setIsLoggedIn(false);
            return;
        }
    };

    return (
        <div className="w-100">
            <LoginCluster 
                isLoggedIn={isLoggedIn} 
                handleLogin={handleLogin}
                handleRegister={handleRegister}
                onUserChange={onUserChange}
                userData={userData}
                setOpen={setOpen}
                openState={openState}
                password={password}
                setPassword={setPassword}
                setNeedsRefresh={setNeedsRefresh}
                loginErrMsg={loginErrMsg}
                setLoginErrMsg={setLoginErrMsg}
                clearErrors={clearErrors}
            />
            <LogoutCluster 
                isLoggedIn={isLoggedIn}
                userData={userData}
                handleLogout={handleLogout}
            />
            <hr className="input-divider mt-3"></hr>

            <TextField
                label="current resume name"
                placeholder="resume-name"
                value={data.resumeName}
                onChange={value => onChange("data.resumeName", value)}
                type = "text"
                customClassGroup="mb-2"
            />
            <CustomButton 
                variant="light"
                label="Save Current Resume"
                icon="save"
                customClass="w-100 h-100 text-left shadow-none border"
                onClick={handleSave}
            />
            <Alert 
                fileName={data.resumeName}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                saveResumes={saveResumes}
            />
            <WarningAlert 
                message={saveErrMsg}
                setNeedsRefresh={setNeedsRefresh}
                clearErrors={clearErrors}
            />
            <WarningAlert 
                message={delErrMsg}
                setNeedsRefresh={setNeedsRefresh}
                clearErrors={clearErrors}
            />

            <hr className="input-divider mt-4 mb-4"></hr>

            <ResumesDropdown 
                resumes={userData.savedResumes}
                dispatch={dispatch}
                userDispatch={userDispatch}
                deleteResume={deleteResume}
                selected={selected}
                setSelected={setSelected}
                open={openSaved}
                setOpen={setOpenSaved}
            />

        </div>
    );
};

const AuthForm = ({title, label, icon, onClick, onChange, userData, setOpen, openState, stateName, password, setPassword, loginErrMsg, setLoginErrMsg, clearErrors}) => {
    const otherState = (stateName === "openLogin") ? "openRegister" : "openLogin"

    return (
        <div className="mb-2 border rounded">
            <Button 
                className="w-100 text-left shadow-none input-collapse-btn"
                variant="btn-light" 
                onClick={() => {
                    setOpen({
                        ...openState, 
                        [stateName]: !openState[stateName],
                        [otherState]: false
                    })
                    clearErrors();
                }}
                aria-controls="collapseItem"
                aria-expanded={openState[stateName]}
            >
                {title}
            </Button>
            <Collapse in={openState[stateName]}>
                <div className="form-group px-3 py-1" id="collapseItem">
                    <TextField
                        label="email"
                        placeholder="email"
                        value={userData.email}
                        onChange={value => onChange("userData.email", value)}
                        type = "email"
                        customClassGroup="mb-1"
                    />
                    <TextField
                        label="password"
                        placeholder="password"
                        value={password}
                        onChange={value => setPassword(value)}
                        type = "password"
                        customClassGroup="mb-3"
                    />
                    <CustomButton 
                        variant="light"
                        label={label}
                        icon={icon}
                        customClass="w-100 h-100 text-left shadow-none border mb-0"
                        onClick={onClick}
                    />
                    <label className="warning-label m-0 p-0">{loginErrMsg}</label>
                </div>
            </Collapse>
        </div>
    );
};

const LoginCluster = ({
        isLoggedIn, 
        handleLogin, 
        handleRegister,
        onUserChange, 
        userData, 
        setOpen, 
        openState, 
        password, 
        setPassword,
        setNeedsRefresh,
        loginErrMsg,
        setLoginErrMsg,
        clearErrors
    }) => {
    return (
        !isLoggedIn && (
            <div>
                <label className="input-label">login or create account</label>
                <AuthForm 
                    title="Sign In"
                    label="Sign in"
                    icon="login"
                    onClick={handleLogin}
                    onChange={onUserChange}
                    userData={userData}
                    setOpen={setOpen}
                    openState={openState}
                    stateName="openLogin"
                    password={password}
                    setPassword={setPassword}
                    loginErrMsg={loginErrMsg}
                    setLoginErrMsg={setLoginErrMsg}
                    clearErrors={clearErrors}
                />
                <AuthForm 
                    title="Register"
                    label="Register"
                    icon="how_to_reg"
                    onClick={handleRegister}
                    onChange={onUserChange}
                    userData={userData}
                    setOpen={setOpen}
                    openState={openState}
                    stateName="openRegister"
                    password={password}
                    setPassword={setPassword}
                    loginErrMsg={loginErrMsg}
                    setLoginErrMsg={setLoginErrMsg}
                    clearErrors={clearErrors}
                />
                <GoogleButton
                    href={`${process.env.REACT_APP_SERVER_API_URL}/auth/google`}
                    onClick={() => {setNeedsRefresh(true)}}
                />
            </div>
        )
    );
};

const LogoutCluster = ({
        isLoggedIn, 
        userData, 
        handleLogout
    }) => {
    return (
        isLoggedIn && (
            <div>
                <label className="input-label">currently logged in as</label>
                <CustomButton 
                    variant="light"
                    label={userData.email}
                    customClass="bg-white w-100 h-100 text-left shadow-none border mb-2"
                />
                <CustomButton 
                    variant="light"
                    label="Sign out"
                    icon="exit_to_app"
                    customClass="w-100 h-100 text-left shadow-none border mb-0"
                    onClick={handleLogout}
                />
            </div>
        )
    );
};

const Alert = ({fileName, showAlert, setShowAlert, saveResumes}) => {

    const handleConfirm = () => {
        setShowAlert(false);
        saveResumes();
    };

    const handleCancel = () => {
        setShowAlert(false);
    };

    return (
        <Modal show={showAlert}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Save</Modal.Title>
            </Modal.Header>
            <Modal.Body>{fileName} already exists. Do you want to replace it?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleConfirm}>
                    Yes
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

const WarningAlert = ({message, setNeedsRefresh, clearErrors}) => {

    const handleConfirm = () => {
        clearErrors();
        setNeedsRefresh(true);
    };

    return (
        <Modal show={(message !== "")}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleConfirm}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

const ResumesDropdown = ({resumes, dispatch, deleteResume, selected, setSelected, open, setOpen}) => {
    const separatorSpace = "\xa0\xa0"

    const onClick = (event, r) => {
        event.preventDefault();
        const foundResume = resumes.find(x => x.resumeName === r.resumeName);

        if (r.resumeName === selected) {
            setSelected("");
            clearAll(dispatch);
        } else {
            setSelected(r.resumeName);
            importData(dispatch, foundResume);
        }
    };

    const handleDelete = (event, r) => {
        event.stopPropagation();
        const foundResume = resumes.find(x => x.resumeName === r.resumeName);
        deleteResume(foundResume);
    };

    return (
        <div className="mb-2 border rounded">
            <Button 
                className="w-100 text-left shadow-none input-collapse-btn"
                variant="btn-light" 
                onClick={() => {
                    setOpen(!open);
                }}
                aria-controls="collapseItem"
                aria-expanded={open}
            >
                Load Saved Resumes
            </Button>
            <Collapse in={open}>
                <div className="form-group px-2 py-1" id="collapseItem">
                <hr className="mx-2 mt-1 mb-2"></hr>
                <label className="input-label px-2">choose resume:</label>
                    <ListGroup >
                        {resumes.map(r => {
                            const checkIcon = (r.resumeName === selected) && (<i className="material-icons input-icon">check</i>);
                            return (
                                <ListGroup.Item
                                    className="p-1 resume-list-item rounded border-0"
                                    action onClick={(event) => onClick(event, r)}
                                >
                                    <div className="row m-0 p-0">
                                        <div className="col-10 m-0 p-0 resume-list-text">
                                            <span>
                                                {checkIcon}
                                                {separatorSpace}
                                                {r.resumeName}
                                            </span>
                                        </div>
                                        <div className="col-2 m-0 p-0">
                                            <CustomButton 
                                                icon="remove_circle_outline"
                                                variant="light"
                                                customClass="border-0 h-100 bg-transparent"
                                                onClick={(event) => handleDelete(event, r)}
                                            />
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </div>
            </Collapse>
        </div>
    );
}

export default AccountTab;