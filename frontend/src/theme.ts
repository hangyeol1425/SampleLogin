export type ThemeType = 'light' | 'dark';

export const theme = {
    light: {
        background: '#f7f9fc',      // 페이지 전체 배경
        text: '#333',               // 기본 텍스트 색상
        inputBackground: '#fff',    // 입력 필드 배경
        inputText: '#000',          // 입력 필드 텍스트
        inputFocusShadow: 'rgba(0, 123, 255, 0.25)', // 입력 필드 포커스 그림자
        inputSubmit: '#f0f0f0',     // 입력 필드 제출 중 배경색
        buttonBackground: '#007bff',// 버튼 배경
        buttonHover: '#0056b3',     // 버튼 호버 상태 배경
        buttonSubmit: '#aaa',       // 버튼 제출 중 배경색
        errorColor: '#e74c3c',      // 에러 메시지 색상
        borderColor: '#ddd',        // 테두리 색상
        cardBackground: '#ffffff',  // 카드 컴포넌트 배경
        cardShadow: 'rgba(0, 0, 0, 0.1)', // 카드 그림자
        headerBackground: '#007bff', // 헤더 배경색
        headerText: '#ffffff',      // 헤더 텍스트 색상
    },
    dark: {
        background: '#181818',      // 페이지 전체 배경
        text: '#f7f9fc',            // 기본 텍스트 색상
        inputBackground: '#333',    // 입력 필드 배경
        inputText: '#fff',          // 입력 필드 텍스트
        inputFocusShadow: 'rgba(0, 123, 255, 0.5)', // 입력 필드 포커스 그림자
        inputSubmit: '#555',        // 입력 필드 제출 중 배경색
        buttonBackground: '#0056b3',// 버튼 배경
        buttonHover: '#003f7f',     // 버튼 호버 상태 배경
        buttonSubmit: '#555',       // 버튼 제출 중 배경색
        errorColor: '#ff6b6b',      // 에러 메시지 색상
        borderColor: '#444',        // 테두리 색상
        cardBackground: '#282828',  // 카드 컴포넌트 배경
        cardShadow: 'rgba(0, 0, 0, 0.3)', // 카드 그림자
        headerBackground: '#181818', // 헤더 배경색
        headerText: '#f7f9fc',      // 헤더 텍스트 색상
    },
};
