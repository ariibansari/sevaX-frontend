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

    useEffect(() => {
        if (localStorage.getItem('UserData')) {
            //fetching the encrypted text
            const encryptedText = localStorage.getItem('UserData')

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
        localStorage.setItem('UserData', encrypt(JSON.stringify(user)));
    }, [user])

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}