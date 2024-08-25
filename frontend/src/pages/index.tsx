import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { useTheme } from '../contexts/thema-context';
import { useTranslation } from 'react-i18next';
import { Link as LinkType } from '../types'

const Home = () => {
    const { t, i18n } = useTranslation();
    const { toggleTheme, themeType } = useTheme();
    const { isAuthenticated } = useAuth();

    const handleTokenTest = async () => {
        try {
            console.log("아직 구현 하지 않음");
        } catch (error) {
            console.log(error);
        }
    }

    const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    const link = [
        { path: "/auth", name: `${t('login')}/${t('register')}` },
        { path: "/links", name: `${t('link_collection')}` }
    ]

    return (
        <div>
            <ul>
                {link.map((item: LinkType, index: number) => (
                    <li key={index}>
                        <Link to={item.path}>{item.name}</Link>
                    </li>
                ))}
                {isAuthenticated && (
                    <li><Link to="/mypage">{t('mypage')}</Link></li>
                )}
                <li>
                    <button onClick={handleTokenTest}>{t('token_test')}</button>
                </li>
                <li>
                    <button onClick={toggleTheme}>
                        {themeType === 'dark' ? `${t('light_mode')}` : `${t('dark_mode')}`}
                    </button>
                </li>
                <li>
                    <select onChange={changeLanguage} defaultValue={i18n.language}>
                        <option value="ko">한국어</option>
                        <option value="en">English</option>
                    </select>
                </li>
            </ul>
        </div>
    );
};

export default Home;