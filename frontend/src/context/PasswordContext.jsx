import { createContext, useReducer } from "react"

export const PasswordContext = createContext()

export const passwordsReducer = (state, action) => {
    switch (action.type){
        case 'SET_PASSWORDS':
            return {
                passwords: action.payload
            } 

        case 'CREATE_PASSWORD':
            return {
                passwords : [action.payload, ...state.passwords]
            }

        case 'DELETE_PASSWORD':
            return {
                passwords : state.passwords.filter((w) => w._id !== action.payload._id)
            }

        default:
            return state
    }
}

export const PasswordsContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(passwordsReducer, {passwords : null})

    return (
        <PasswordContext.Provider value = {{...state, dispatch}}>
            { children }
        </PasswordContext.Provider>
    )
}