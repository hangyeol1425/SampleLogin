import React, { useRef, useState, useCallback } from 'react';
import axiosInstance from '../../api';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSpring, animated } from 'react-spring';
import { useValidation } from './useValidation';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
    const [showNameInput, setShowNameInput] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const { emailError, passwordError, nameError } = useValidation(email, password, name);

    const handleSubmit = useCallback(async () => {
        if (isSubmitting) return;

        if (emailError || passwordError || nameError || email.trim() === '' || password.trim() === '' || password.trim() === '') {
            emailInputRef.current?.focus();
            return;
        }

        setIsSubmitting(true);

        emailInputRef.current?.blur();
        passwordInputRef.current?.blur();
        nameInputRef.current?.blur();

        try {
            const result = await axiosInstance.post('/auth/register', {
                username: name,
                email: email,
                password: password,
            });
            if (result) navigate('/auth/login');
        } catch (error: any) {
            if (error.code == 'ERR_NETWORK') {
                toast.error(t('network_error'), {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            } else if (error?.response?.status === 409) {
                toast.error(t('email_already_registered'), {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            } else {
                toast.error(t('unexpected_error'), {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            }
        } finally {
            await new Promise((resolve) => setTimeout(resolve, 500));
            setIsSubmitting(false);
        }
    }, [email, password, name, emailError, passwordError, nameError, isSubmitting, navigate]);

    const handleEmailEnterPress = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (!emailError && email.trim() !== '') {
                    setShowPasswordInput(true);
                    setTimeout(() => passwordInputRef.current?.focus(), 100);
                }
            }
        },
        [emailError, email]
    );

    const handlePasswordEnterPress = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (!passwordError && password.trim() !== '') {
                    setShowNameInput(true);
                    setTimeout(() => nameInputRef.current?.focus(), 100);
                }
            }
        },
        [passwordError, password]
    );

    const handleNameEnterPress = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (!nameError && name.trim() !== '') {
                    handleSubmit();
                }
            }
        },
        [nameError, name, handleSubmit]
    );

    const submitButtonSpring = useSpring({
        transform: isSubmitting ? 'scale(0.95)' : 'scale(1)',
        config: { tension: 300, friction: 10 },
    });

    return (
        <Container>
            <InputContainer>
                <FieldContainer>
                    <Input
                        ref={emailInputRef}
                        type="text"
                        value={email}
                        onKeyDown={handleEmailEnterPress}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('prompt_email')}
                        aria-label={t('label_email')}
                        aria-invalid={!!emailError && email.trim() !== ''}
                        aria-describedby={emailError ? 'email-error' : undefined}
                        disabled={isSubmitting}
                    />
                    {emailError && email.trim() !== '' && (
                        <ErrorMessage id="email-error">
                            {emailError}
                        </ErrorMessage>
                    )}
                </FieldContainer>

                {showPasswordInput && (
                    <FieldContainer>
                        <Input
                            ref={passwordInputRef}
                            type="password"
                            value={password}
                            onKeyDown={handlePasswordEnterPress}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t('prompt_password')}
                            aria-label={t('label_password')}
                            aria-invalid={!!passwordError && password.trim() !== ''}
                            aria-describedby={passwordError ? 'password-error' : undefined}
                            disabled={isSubmitting}
                        />
                        {passwordError && password.trim() !== '' && (
                            <ErrorMessage id="password-error">
                                {passwordError}
                            </ErrorMessage>
                        )}
                    </FieldContainer>
                )}

                {showNameInput && (
                    <FieldContainer>
                        <Input
                            ref={nameInputRef}
                            type='text'
                            value={name}
                            onKeyDown={handleNameEnterPress}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('prompt_name')}
                            aria-label={t('label_name')}
                            aria-invalid={!!nameError && name.trim() !== ''}
                            aria-describedby={nameError ? 'name-error' : undefined}
                            disabled={isSubmitting}
                        />
                        {nameError && name.trim() !== '' && (
                            <ErrorMessage id='name-error'>
                                {nameError}
                            </ErrorMessage>
                        )}
                    </FieldContainer>
                )}

                <SubmitButton
                    style={submitButtonSpring}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? t('status_processing') : t('register')}
                </SubmitButton>
            </InputContainer>
            <StyledLinkContainer>
                <StyledLink to="/auth/login">{t('login')}</StyledLink>
                <StyledLink to="/">{t('go_to_home')}</StyledLink>
            </StyledLinkContainer>
            <ToastContainer />
        </Container>
    );
};

export default Login;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 0 20px;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: ${({ theme }) => theme.inputBackground};
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 20px ${({ theme }) => theme.cardShadow};
    width: 100%;
    max-width: 400px;
`;

const Input = styled.input<{ disabled: boolean }>`
    padding: 15px;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 8px;
    font-size: 16px;
    background-color: ${({ theme, disabled }) =>
        disabled ? theme.inputSubmit : theme.inputBackground};
    color: ${({ theme }) => theme.inputText};
    transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s;
    &:focus {
        border-color: ${({ theme }) => theme.buttonBackground};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.inputFocusShadow};
        outline: none;
    }
`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ErrorMessage = styled.div`
    margin-top: 5px;
    color: ${({ theme }) => theme.errorColor};
    font-size: 14px;
`;

const StyledLinkContainer = styled.div`
    display: flex;
    margin-top: 20px;
    width: 100%;
    max-width : 400px;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const StyledLink = styled(Link)`
    margin: 0px 8px;
    text-decoration: none;
    color: ${({ theme }) => theme.text}
`;

const SubmitButton = styled(animated.button) <{ disabled: boolean }>`
    padding: 15px;
    border: none;
    border-radius: 8px;
    background-color: ${({ theme, disabled }) =>
        disabled ? theme.buttonSubmit : theme.buttonBackground};
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s, transform 0.3s;
    &:hover {
        background-color: ${({ theme, disabled }) =>
        !disabled && theme.buttonHover};
    }
`;