import React, { useContext, useReducer } from "react";
import reducer from "./reducers";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "./actions";

// import { server } from "../utils/api-util.js";
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

  const server = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  server.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers.common["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  server.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);

      if (error.response.status === 401) {
        console.log("AUTH ERROR");
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  // Update user
  const updateUser = async (data) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const response = await server.patch("auth/profile", data);
      const user = response.data.user;
      const token = response.data.token;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    } finally {
      clearAlert();
    }
  };

  // Register user.
  const setupUser = async ({ data, apiPath, alertMessage, isRegister }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await server.post(apiPath, data); // Post({ path: apiPath, data });
      // const { user, token, location } = response.data;
      const user = response.data.user;
      const token = response.data.token;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, alertMessage },
      });

      if (isRegister === false) {
        addUserToLocalStorage({ user, token });
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
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  // Add user to localStorage.
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
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
        updateUser,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
