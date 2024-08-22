import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useTheme } from "../context/thema-context";

const Home = () => {

    const { toggleTheme } = useTheme();

    const link = [
        { link: "/users", name: "로그인/회원가입" }
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
                    <li><Link to="/mypage">마이페이지</Link></li>
                )}
                <li>
                    <button onClick={toggleTheme}>토글테마</button>
                </li>
            </ul>
        </div>
    )
}

export default Home;