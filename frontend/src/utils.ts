export const ERROR_MESSAGES = {
    INVALID_EMAIL: '유효한 이메일 주소를 입력하세요.',
    PASSWORD_LENGTH: '비밀번호는 12글자 이내로 해야 합니다.',
    PASSWORD_SPECIAL_CHAR: '특수문자가 포함되어야 합니다: #, $, !, *, &',
    NAME_LENGTH: '이름은 12글자 이내로 해야 합니다.',
    NAME_SPECIAL_CHAR: '특수문자가 포함되면 안됩니다.'
};

export const validateEmail = (email: string): string => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return ERROR_MESSAGES.INVALID_EMAIL;
    return '';
};

export const validatePassword = (password: string): string => {
    if (password.length > 12) return ERROR_MESSAGES.PASSWORD_LENGTH;
    if (!/[#\$!\*=&]/.test(password)) return ERROR_MESSAGES.PASSWORD_SPECIAL_CHAR;
    return '';
};

export const validateName = (name : string): string => {
    if(name.length > 12) return ERROR_MESSAGES.NAME_LENGTH;
    return '';
}