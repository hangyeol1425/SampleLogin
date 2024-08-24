import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const project = () => {
    const { t } = useTranslation();

    return (
        <>
            <Link to='/'>HOME</Link>
            <ul>
                <li>
                    <Link to='/project/write'>{t('write_project')}</Link>
                </li>

            </ul>
        </>
    )
}

export default project;