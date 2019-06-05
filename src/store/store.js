import createStore from "./createStore";
import shortid from "shortid";
import dayjs from "dayjs";

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
  notFirstTime: false,
  /**
   * theme
   */
  dark: false,
  /**
   * favorite format
   */
  favoriteFormat: 0
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    /**
     * Initial the store with the given value
     */
    case "@APP/INIT":
      const newState = payload || initial;

      return {
        ...newState
      };

    /**
     * Initial the store with the given value
     */
    case "@APP/TOGGLE_DARK":
      return {
        ...state,
        dark: !state.dark
      };

    /**
     * Initial the store with the given value
     */
    case "@APP/SET_FAVORITE_FORMAT":
      return {
        ...state,
        favoriteFormat: payload
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
        colors: payload.colors || [],
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
      const date = dayjs().format("YYYY/MM/DD");
      const number = state.games.length + 1;

      const newGame = {
        ...payload,
        id: shortid.generate(),
        number,
        date
      };

      return {
        ...state,
        games: [...state.games, newGame]
      };

    default:
      return state;
  }
};

/* get the player from the store */
export const getDeckById = state => deckId =>
  !!deckId && (state.decks.find(d => d.id === deckId) || { name: "???" });

/* get the deck from the store */
export const getPlayerById = state => playerId =>
  !!playerId && (state.players.find(p => p.id === playerId) || { name: "???" });

export default createStore(reducer, initial);
