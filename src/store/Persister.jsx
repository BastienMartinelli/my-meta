import { useEffect } from "react";

import store from "./store";

/**
 * Component that will persist in local storage
 * all changes of the state
 */
function Persister({ children }) {
  const [state, dispatch] = store.useStore();

  /**
   * Get the localstorage store at component mount
   */
  useEffect(() => {
    const jsonData = localStorage.getItem("store");

    if (!jsonData) return;

    const data = JSON.parse(jsonData);

    if (data) {
      dispatch({
        type: "@STORE/INIT",
        payload: data
      });
    }
  }, [dispatch]);

  /**
   * Set the local storage at each state change
   */
  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(state));
  }, [state]);

  return children;
}

export default Persister;
