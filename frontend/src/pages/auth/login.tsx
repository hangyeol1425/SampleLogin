import React, { useRef, useState, useCallback } from 'react';
import axiosInstance from '../../api';
import styled from 'styled-components';
import { ToastContainer, ToastOptions, ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSpring, animated } from 'react-spring';
import { useValidation } from './useValidation';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
    const { login } = useAuth();
    const { t } = useTranslation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const passwordInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const toastDefult: ToastOptions<unknown> = {
        position: 'top-center' as ToastPosition,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    };

    const showToastError = (message: string) => {
        toast.error(message, { ...toastDefult });
    };

    const errorMessages: { [key: string]: string } = {
        'ERR_NETWORK': t('network_error'),
        404: t('prompt_sign_up'),
        401: t('verify_credentials')
    };

    const navigate = useNavigate();
    const { emailError, passwordError } = useValidation(email, password, '');

    const handleSubmit = useCallback(async () => {
        if (isSubmitting) return;

        if (emailError || passwordError || email.trim() === '' || password.trim() === '') {
            emailInputRef.current?.focus();
            return;
        }

        setIsSubmitting(true);

        emailInputRef.current?.blur();
        passwordInputRef.current?.blur();

        try {
            const response = await axiosInstance.post('/auth/login', {
                email,
                password,
            });

            const { accesstoken, refreshToken } = response.data;
            login(accesstoken, refreshToken);
            navigate('/');
        } catch (error: any) {
            const errorCode = error.code;
            const statusCode = error?.response?.status;
            const message = errorMessages[errorCode] || errorMessages[statusCode] || t('unexpected_error');
            showToastError(message);
        } finally {
            await new Promise((resolve) => setTimeout(resolve, 500));
            setIsSubmitting(false);
        }
    }, [email, password, emailError, passwordError, isSubmitting, navigate]);

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
                    handleSubmit();
                }
            }
        },
        [passwordError, password, handleSubmit]
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

                <SubmitButton
                    style={submitButtonSpring}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? t('status_processing') : t('login')}
                </SubmitButton>
            </InputContainer>
            <StyledLinkContainer>
                <StyledLink to="/auth/register">{t('register')}</StyledLink>
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