import { PasswordContext } from "../context/PasswordContext";
import { useContext } from "react";

export const usePasswordsContext = () => {
    const context = useContext(PasswordContext)

    if(!context){
        throw Error('usePasswordsContext must be used inside a PasswordsContextsProvider')
    }

    return context
}