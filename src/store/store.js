import createStore from "./createStore";

const initial = {
  games: [],
  players: []
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
