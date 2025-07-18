import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Private = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // if no login, redirects to token
  useEffect(() => {
    if (!store.token) {
      navigate("/login");
      return;
    }

    
    const fetchPrivateMessage = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });

        if (!resp.ok) {
          if (resp.status === 401) {
            // Token not valid
            dispatch({ type: "LOGOUT" });
            navigate("/login");
          }
          throw new Error("Error");
        }

        const data = await resp.json();
        setMessage(data.msg);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivateMessage();
  }, [store.token, navigate, dispatch]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Private Zone</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && <p>{message}</p>}
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Private;
