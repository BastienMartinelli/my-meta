import React, { useReducer, useContext } from "react";

/**
 * Create a new store
 * @param {Function} reducer the store reducer
 * @param {Object} initial the store's initial state
 * @return {Object} the store
 */
function createStore(reducer, initial) {
  /**
   * Create a new React context
   */
  const StoreContext = React.createContext();

  /**
   * Store provider component
   * Automatically wrapping the cgild component
   * with the provider, passing the reducer as value
   * @param {*} props the component's props
   */
  const Provider = ({ children }) => (
    <StoreContext.Provider value={useReducer(reducer, initial)}>{children}</StoreContext.Provider>
  );

  /**
   * Store context consumer
   */
  const { Consumer } = StoreContext;

  /**
   * Hook allowing to use our store context directly
   * onto a function component
   * @return {Array} the [value, dispatch] of the store
   */
  const useStore = () => useContext(StoreContext);

  /**
   * HOC to automatically wrapp a component with
   * our store COnsumer, passing the state and the
   * dispatch function
   * @param {*} Comp the component to wrap
   */
  const withStore = Comp => (
    <StoreContext.Consumer>
      {([state, dispatch]) => <Comp state={state} dispatch={dispatch} />}
    </StoreContext.Consumer>
  );

  /**
   * Public API
   */
  return {
    useStore,
    withStore,
    Provider,
    Consumer
  };
}

export default createStore;
