import { createContext, useEffect, useState } from 'react'
import { decrypt, encrypt } from '../utils/cryptography'

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [user, setUser] = useState({
        accessToken: '',
        refreshToken: '',
        name: '',
        email: '',
        role_id: ''
    })

    const isLoggedIn = () => {
        if (user?.accessToken === '') {
            return false
        } else {
            return true
        }
    }

    const getRole = () => {
        if (user?.role_id === 1) {
            return 'needy'
        }
        else if (user?.role_id === 2) {
            return 'donor'
        }
        else if (user?.role_id === 3) {
            return 'admin'
        }
        else {
            return null
        }

    }

    useEffect(() => {
        if (sessionStorage.getItem('sevaX_UserData')) {
            //fetching the encrypted text
            const encryptedText = sessionStorage.getItem('sevaX_UserData')

            //decrypt the text
            const decryptedText = decrypt(encryptedText)

            //check if data is valid, if, then save in state
            if (JSON.parse(decryptedText)?.accessToken) {
                const UserData = JSON.parse(decryptedText);
                setUser(UserData);
            }
        }
    }, [])

    useEffect(() => {
        sessionStorage.setItem('sevaX_UserData', encrypt(JSON.stringify(user)));
    }, [user])

    return (
        <UserContext.Provider value={[user, setUser, isLoggedIn, getRole]}>
            {props.children}
        </UserContext.Provider>
    )
}