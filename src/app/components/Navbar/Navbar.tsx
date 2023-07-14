import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { reset } from "app/slices/auth";
import { logout } from "app/slices/auth";
import { useLocation } from "react-router-dom";
import LoginModal from "app/components/LoginModal/LoginModal";
import "app/components/Navbar/Navbar.css";
import { AppDispatch } from "app/store";

interface AuthState {
  auth: {
    isLoggedIn: boolean;
    user: any[] | null;
  };
}

const Navbar = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  const location = useLocation();
  const { pathname } = location;
  const isSignUpPage = pathname === "/register";
  const isSignInPage = pathname === "/login";
  const isLecturePage = pathname === "/lecture";
  const isSettingPage = pathname === "/settings";
  const isConsultingPage = pathname === "/consulting";
  const isMentorPage = pathname === "/mentor";

  const { isLoggedIn } = useSelector((state: AuthState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const logOut = useCallback(() => {
    dispatch(logout({ refreshToken, accessToken }));
  }, [dispatch, refreshToken, accessToken]);

  useEffect(() => {
    if (isLoggedIn && !accessToken) {
      dispatch(reset());
    }
  }, [dispatch, isLoggedIn, accessToken]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <LoginModal isOpen={isModalOpen} close={closeModal} />
      <nav className="navbar navbar-expand navbar-white">
        <div className="nav-container">
          <div>
            <Link to={"/"} className="navbar-brand">
              GPTUs
            </Link>
          </div>

          <div>
            <div className="nav ">
              <li className="nav-item ">
                <Link
                  to={"/lecture"}
                  className={`nav-link ${isLecturePage && "selected"}`}
                >
                  Lecture
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/consulting"}
                  className={`nav-link ${isConsultingPage && "selected"}`}
                >
                  Consulting
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/mentor"}
                  className={`nav-link ${isMentorPage && "selected"}`}
                >
                  Mentor
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      to={"/settings"}
                      className={`nav-link ${isSettingPage && "selected"}`}
                    >
                      Settings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="" className="nav-link" onClick={logOut}>
                      LogOut
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      to=""
                      // to={"/login"}
                      onClick={openModal}
                      className={`nav-link ${isSignInPage && "selected"}`}
                    >
                      Sign in
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to={"/register"}
                      className={`nav-link ${isSignUpPage && "selected"}`}
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;