import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { useTheme } from "../contexts/thema-context";
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    const { toggleTheme, themeType } = useTheme();

    const link = [
        { link: "/users", name: `${t('login')}/${t('register')}` },
        { link: "/project", name: `${t('project')}`}
    ]

    const { isAuthenticated } = useAuth();

    return (
        <div>
            <ul>
                {link.map((item, index) => (
                    <li key={index}>
                        <Link to={item.link}>{item.name}</Link>
                    </li>
                ))}
                { isAuthenticated && (
                    <li><Link to="/mypage">{t('mypage')}</Link></li>
                )}
                <li>
                    <button onClick={toggleTheme}>{themeType == 'dark' ? `${t('light_mode')}` : `${t('dark_mode')}`}</button>
                </li>
            </ul>
        </div>
    )
}

export default Home;