import createStore from "./createStore";

const initial = {
  games: [],
  players: [],
  decks: [],
  notFirstTime: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "@STORE/INIT":
      return {
        ...action.payload
      };
    case "@PLAYERS/ADD":
      return {
        ...state,
        players: [...state.players, action.payload]
      };
    case "@PLAYERS/DELETE":
      return {
        ...state,
        players: state.players.filter(m => m.name !== action.payload)
      };
    case "@DECKS/ADD":
      return {
        ...state,
        decks: [...state.decks, action.payload]
      };
    case "@DECKS/DELETE":
      return {
        ...state,
        decks: state.decks.filter(d => d.name !== action.payload)
      };
    case "@APP/FIRST_TIME":
      return {
        ...state,
        notFirstTime: true
      };
    case "@GAMES/ADD":
      const today = new Date();
      const newGame = {
        ...action.payload,
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
