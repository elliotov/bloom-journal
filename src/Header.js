import "./Header.css";
import { useAuth } from "./AuthContext";

export default function Header() {
    const { user, logout} = useAuth();

    return (
        <header className="header-container">
            <h1 className="header">Bloom Journal</h1>
            {user && (
                <button onClick={logout} className="logout-button">
                    Log Out
                </button>
            )}
        </header>
    );
}