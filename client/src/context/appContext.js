import React, { useContext, useReducer } from "react";
import reducer from "./reducers";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from "./actions";

import { Post } from "../utils/api-util.js";
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const location = localStorage.getItem("location");

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: (user && JSON.parse(user)) || null,
  token: token || null,
  userLocation: location || "",
  jobLocation: location || "",
  showSidebar: true,
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  // const [state] = useState(initialState);

  const [state, dispatch] = useReducer(reducer, initialState);

  // Register user.
  const setupUser = async ({ data, apiPath, alertMessage, isRegister }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await Post({ path: apiPath, data });
      // const { user, token, location } = response.data;
      const user = response.data.user;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, alertMessage },
      });

      console.log("isRegister", isRegister);
      if (isRegister === false) {
        console.log("addUserToLocalStorage");
        addUserToLocalStorage({ user });
      }

      return true;
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });

      return false;
    } finally {
      clearAlert();
    }
  };

  // Display Alert.
  const displayAlert = (message) => {
    dispatch({ type: DISPLAY_ALERT, message });
    clearAlert();
  };

  // Clear Alert.
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserToLocalStorage();
  };

  const toggleSidebar = () => {
    console.log("toggleSidebar", state.showSidebar);
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  // Add user to localStorage.
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("location", JSON.stringify(location));
  };

  // Remove user from localStorage.
  const removeUserToLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        showSidebar: state.showSidebar,
        logoutUser,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
