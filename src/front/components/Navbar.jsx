import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>

        <div className="ml-auto d-flex gap-3 align-items-center">
          {store.isLoggedIn ? (
            <>
              <span className="me-2">Hola, {store.userEmail}</span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-outline-primary">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-outline-success">Signup</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
