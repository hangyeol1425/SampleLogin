import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useTranslation } from 'react-i18next';

const User = () => {
    const { t } = useTranslation();
    const { isAuthenticated } = useAuth();
    return (
        <div>
            <Link to='/'>HOME</Link>
            <ul>
                {!isAuthenticated ? (
                    <>
                        <li>
                            <Link to='/users/login'>{t('login')}</Link>
                        </li>
                        <li>
                            <Link to='/users/register'>{t('register')}</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>{t('isAuthenticated_massage')}</li>
                        <li>{t('go_to_my_page_and_logout')} {"->"}<Link to="/mypage">{t('mypage')}</Link></li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default User;