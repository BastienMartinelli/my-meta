import createStore from "./createStore";
import shortid from "shortid";

const initial = {
  /**
   * Game history list
   */
  games: [],
  /**
   * List of the players of the playgroup
   */
  players: [],
  /**
   * List of the decks of the playgroup
   */
  decks: [],
  /**
   * Is it the first time app load
   */
  notFirstTime: false
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    /**
     * Initial the store with the given value
     */
    case "@STORE/INIT":
      const newState = payload || initial;

      return {
        ...newState
      };

    /**
     * Add an new player to the list
     */
    case "@PLAYERS/ADD":
      const newPlayer = {
        ...payload,
        id: shortid.generate()
      };

      return {
        ...state,
        players: [...state.players, newPlayer]
      };

    /**
     * Delete the given player from the list
     */
    case "@PLAYERS/DELETE":
      return {
        ...state,
        players: state.players.filter(m => m.name !== payload)
      };

    /**
     * Add a deck to the list
     */
    case "@DECKS/ADD":
      const newDeck = {
        ...payload,
        id: shortid.generate()
      };

      return {
        ...state,
        decks: [...state.decks, newDeck]
      };

    /**
     * Delete the given deck from the list
     */
    case "@DECKS/DELETE":
      return {
        ...state,
        decks: state.decks.filter(d => d.name !== payload)
      };

    /**
     * Active the first time app load fla
     */
    case "@APP/FIRST_TIME":
      return {
        ...state,
        notFirstTime: true
      };

    /**
     * Add a new game to the game history list
     */
    case "@GAMES/ADD":
      const today = new Date();

      const newGame = {
        ...payload,
        id: shortid.generate(),
        date: today.toString()
      };

      return {
        ...state,
        games: [...state.games, newGame]
      };

    default:
      return state;
  }
};

export default createStore(reducer, initial);
