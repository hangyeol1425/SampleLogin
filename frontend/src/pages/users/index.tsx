import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const User = () => {
    const { isAuthenticated } = useAuth();
    return (
        <div>
            <Link to='/'>HOME</Link>
            <ul>
                {!isAuthenticated ? (
                    <>
                        <li>
                            <Link to='/users/login'>로그인</Link>
                        </li>
                        <li>
                            <Link to='/users/register'>회원가입</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>이미 로그인 중입니다.</li>
                        <li>My Page로 가서 로그아웃 {"->"}<Link to="/mypage">마이페이지</Link></li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default User;