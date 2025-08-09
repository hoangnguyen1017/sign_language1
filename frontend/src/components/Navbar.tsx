import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.svg";
import user_icon from "../assets/user_icon.svg";
import { useNavigate } from "react-router-dom";

type User = {
  username: string;
};

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target as Node)
      ) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setShowLogout(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-black sticky-top">
      <div className="container">
        <div className="row w-100 align-items-center">
          <div
            className="col-6 d-flex align-items-center gap-2"
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            role="button"
          >
            <img src={logo} alt="Logo" width="40" height="40" />
            <span className="text-white fs-5 fw-bold">THỦ</span>
          </div>

          <div className="col-6 d-flex justify-content-between align-items-center gap-4">
            <button
              onClick={() => navigate("/feedback")}
              className="btn btn-link text-light fs-5 text-decoration-none p-0">
              PHẢN HỒI
            </button>

            {user ? (
              <div ref={logoutRef}>
                {showLogout ? (
                  <button
                    className="btn text-white fs-5"
                    style={{
                      backgroundColor: "#777",
                      borderRadius: "12px",
                      padding: "6px 16px",
                    }}
                    onClick={handleLogout}>
                    ĐĂNG XUẤT
                  </button>
                ) : (
                  <button
                    className="btn text-white fs-5 d-flex align-items-center gap-2"
                    onClick={() => setShowLogout(true)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                    }}>
                    {user.username}
                    <img src={user_icon} alt="User" width="24" height="24" />
                  </button>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-link text-light fs-5 text-decoration-none p-0">
                  ĐĂNG NHẬP
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="btn btn-link text-light fs-5 text-decoration-none p-0">
                  ĐĂNG KÝ
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
