import React, { createContext, useReducer, useEffect } from "react";
import get from "lodash/get";
import set from "lodash/set";
import remove from "lodash/remove";


const initialState = {
    userData: {
        email: "",
        savedResumes: [],
    },
};

const reducer = (state, {type, payload}) => {
    let items;
    const newState = JSON.parse(JSON.stringify(state));

    switch (type) {
        case "input":
            return set({...newState}, payload.key, payload.value);

        case "deleteItem":
            items = get({...newState}, payload.key, []);
            remove(items, item => item.resumeName === payload.value.resumeName);
            return set({...newState}, payload.key, items);

        case "addItem":
            items = get({...newState}, payload.key, []);
            items.push(payload.value);
            return set({...newState}, payload.key, items);

        case 'importData':
            if (payload === null) return initialState;

            for (const k of Object.keys(initialState.userData)) {
                if (!(k in payload.data)) {
                    payload.data[k] = initialState.userData[k];
                }
            }
            console.log(newState);
            
            console.log(payload.data);
            

            return {
                ...newState,
                ...payload,
            };

        case 'clearAll':
            return initialState;

        default:
            return newState;
    }
};

const localState = JSON.parse(localStorage.getItem("userContext"));

const UserContext = createContext(initialState);

const StateProvider = ({ children }) => {
    const {Provider} = UserContext;
    const [state, dispatch] = useReducer(reducer, localState || initialState);

    useEffect(() => {
        localStorage.setItem("userContext", JSON.stringify(state));
    }, [state]);

    const value = {state, dispatch};
    return <Provider value={value}>{children}</Provider>;
};

export const UserProvider = StateProvider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;