import React, { createContext, useReducer, useEffect } from "react";
import {arrayMove} from "../utils";
import get from "lodash/get";
import set from "lodash/set";
import remove from "lodash/remove";

import sampleData from "../assets/sampleData.json";

const initialState = {
    data: {
        resumeName: "",
        dateLastSaved: "",
        exportFileName: "",
        personal: {
            heading: "Personal Information",
            photo: "",
            firstName: "",
            lastName: "",
            subtitle: "",
            location: "",
            phone: "",
            website: "",
            email: "",
        },
        profile: {
            enable: true,
            heading: "Profile",
            body: "",
        },
        work: {
            enable: true,
            heading: "Work Experience",
            items: [],
        },
        education: {
            enable: true,
            heading: "Education",
            items: [],
        },
        skills: {
            enable: true,
            heading: "Skills",
            items: [],
        },
        certifications: {
            enable: true,
            heading: "Certifications",
            items: [],
        },
        extras: {
            enable: false,
            heading: "Additional Information",
            items: [],
        },
        colors: {
            header: {
                background: {name: "background", value: "#274e72"},
                title: {name: "title font", value: "#ffffff"},
                subTitle: {name: "subtitle font", value: "#ffffff"},
                rule: {name: "accent lines", value: "#d9e6f2"},
                photoBorder: {name: "photo border", value: "#d9e6f2"},
                photoBackground: {name: "photo background", value: "#274e72"},
            },

            panel: {
                background: {name: "background", value: "#d9e6f2"},
                sectionHeader: {name: "section title font", value: "#274e72"},
                itemHeader: {name: "entry title font", value: "#336699"},
                itemSubHeader: {name: "entry subtitle font", value: "#000000"},
                text: {name: "entry text", value: "#000000"},
                contactIcons: {name: "contact icons", value: "#274e72"},
                rule: {name: "accent lines", value: "#7aa7d1"},
            },

            body: {
                background: {name: "background", value: "#ffffff"},
                sectionHeader: {name: "section title font", value: "#274e72"},
                itemHeader: {name: "entry title font", value: "#336699"},
                itemSubHeader: {name: "entry subtitle font", value: "#000000"},
                date: {name: "dates", value: "#000000"},
                dateDivider: {name: "date dividers", value: "#000000"},
                text: {name: "entry text", value: "#000000"},
                rule: {name: "accent lines", value: "#7aa7d1"},
            },
        },
        fonts: {
            titles: {
                mainTitle: {name: "main title", family: "", style: "", size: "44", weight: "400"},
                subTitle: {name: "subtitle", family: "", style: "", size: "20", weight: "300"},
                sectionTitle: {name: "section title", family: "", style: "", size: "16", weight: "600"},
                itemTitle: {name: "entry title", family: "", style: "", size: "16", weight: "600"},
                itemSubTitle: {name: "entry subtitle", family: "", style: "", size: "15", weight: "500"},
            },
            text: {
                itemText: {name: "entry text", family: "", style: "", size: "15", weight: "300"},
                profileText: {name: "profile text", family: "", style: "", size: "15", weight: "400"},
                skillsText: {name: "skills text", family: "", style: "", size: "15", weight: "400"},
                dateText: {name: "date text", family: "", style: "", size: "15", weight: "400"},
                contactText: {name: "contact text", family: "", style: "", size: "15", weight: "400"},
            },
        },
        layout: {
            dimensions: {
                headerHeight: {name: "header height", value: "17.5", min: "0", max: "100", step: "0.5", unit: "%"},
                panelWidth: {name: "panel width", value: "32", min: "0", max: "100", step: "0.5", unit: "%"},
                photoDiameter: {name: "photo diameter", value: "145", min: "0", max: "300", step: "1.0", unit: "px"},
            },
        },
    },
    tabKey: "personal",
};

const reducer = (state, {type, payload}) => {
    let items;
    const newState = JSON.parse(JSON.stringify(state));

    switch (type) {
        case "input":
            return set({...newState}, payload.key, payload.value);

        case "deleteItem":
            items = get({...newState}, payload.key, []);
            remove(items, item => item.id === payload.value.id);
            return set({...newState}, payload.key, items);

        case "addItem":
            items = get({...newState}, payload.key, []);
            items.push(payload.value);
            return set({...newState}, payload.key, items);

        case "moveItem":
            items = get({...newState}, payload.key, []);
            let newIndex = (payload.direction === "down") ? 
                Math.min(payload.currentIndex + 1, items.length - 1) : 
                Math.max(payload.currentIndex - 1, 0)

            arrayMove(items, payload.currentIndex, newIndex)
            return set({...newState}, payload.key, items);

        case 'importData':
            if (payload === null) return {
                data: initialState.data, 
                tabKey: newState.tabKey
            };;

            for (const k of Object.keys(initialState.data)) {
                if (!(k in payload.data)) {
                    payload.data[k] = initialState.data[k];
                }
            }

            return {
            ...newState,
            ...payload,
            };

        case 'loadExample':
            return {
                ...newState,
                ...sampleData,
            };

        case 'clearAll':
            return {
                data: initialState.data, 
                tabKey: newState.tabKey
            };

        default:
            return newState;
    }
};

const localState = JSON.parse(sessionStorage.getItem("appContext"));

const AppContext = createContext(initialState);

const StateProvider = ({ children }) => {
    const {Provider} = AppContext;
    const [state, dispatch] = useReducer(reducer, localState || initialState);

    useEffect(() => {
        sessionStorage.setItem("appContext", JSON.stringify(state));
    }, [state]);

    const value = {state, dispatch};
    return <Provider value={value}>{children}</Provider>;
};

export const AppProvider = StateProvider;
export const AppConsumer = AppContext.Consumer;
export default AppContext;