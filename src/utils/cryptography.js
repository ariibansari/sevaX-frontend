import { AES, enc } from 'crypto-js';

export const encrypt = _stringToEncrypt => {
    return AES.encrypt(_stringToEncrypt, process.env.REACT_APP_ENCRYPTION_SECRET_KEY).toString()
}

export const decrypt = _encryptedString => {
    return AES.decrypt(_encryptedString, process.env.REACT_APP_ENCRYPTION_SECRET_KEY).toString(enc.Utf8)
}