import { useState, useEffect } from 'react';
import { validateEmail, validateName, validatePassword } from '../../utils';

export const useValidation = (email: string, password: string, name: string) => {
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');

    useEffect(() => {
        setEmailError(validateEmail(email));
        setPasswordError(validatePassword(password));
        setNameError((validateName(name)))
    }, [email, password, name]);

    return { emailError, passwordError, nameError };
};
