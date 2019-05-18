import createStore from "./createStore";

const initial = {
  games: [],
  members: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "@STORE/INIT":
      return {
        ...action.payload
      };
    case "@MEMBERS/ADD":
      return {
        ...state,
        members: [...state.members, action.payload]
      };
    case "@MEMBERS/DELETE":
      return {
        ...state,
        members: state.members.filter(m => m.name !== action.payload)
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
