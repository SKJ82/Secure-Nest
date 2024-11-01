import {useAuthContext} from './useAuthContext'
import {usePasswordsContext} from './usePasswordsContext'

export const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch : passwordsDispatch} = usePasswordsContext()

    const logout = () => {
        localStorage.removeItem('user')

        dispatch({type : 'LOGOUT'})
        passwordsDispatch({type : 'SET_PASSWORDS', payload : null})
    }

    return {logout}
}