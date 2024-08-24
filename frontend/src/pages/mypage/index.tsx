import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

const MyPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
            <Link to='/'>HOME</Link>
            <ul>
                <li>
                    <button onClick={handleLogout}>로그아웃</button>
                </li>
            </ul>
        </>
    )
}

export default MyPage;