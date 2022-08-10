const initialState = {
  allDogs: [],
  temperaments: [],
  details: [],
  dogs:[],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        allDogs: action.payload,
        dogs:action.payload
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "GET_BYNAME":
      return {
        ...state,
        allDogs: action.payload,
      };
    case "GET_BYID":
      return {
        ...state,
        details: action.payload,
      };
    case "ORDER_BY_NAME":
      const ordenados =
        action.payload === "Ascendente"
          ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              //va a descendente
              if (a.name < b.name) return 1;
              if (a.name > b.name) return -1;
              return 0;
            });
      return {
        ...state,
        allDogs: ordenados,
      };
    case "ORDER_BY_WEIGHT":
      const ordernadosXpeso =
        action.payload === "Mayor"
          ? state.allDogs.sort((a, b) => {
              if (typeof action.payload.weight === "string") {
                if (a.weight > b.weight) return 1;
                if (a.weight < b.weight) return -1;
                return 0;
              } else {
                if (parseInt(a.weight) > parseInt(b.weight)) return 1;
                if (parseInt(a.weight) < parseInt(b.weight)) return -1;
                return 0;
              }
            })
          : state.allDogs.sort((a, b) => {
              if (typeof action.payload.weight === "string") {
                if (a.weight < b.weight) return 1;
                if (a.weight > b.weight) return -1;
                return 0;
              } else {
                if (parseInt(a.weight) < parseInt(b.weight)) return 1;
                if (parseInt(a.weight) > parseInt(b.weight)) return -1;
                return 0;
              }
            });
      return {
        ...state,
        allDogs: ordernadosXpeso,
      };

    case "FILTER_BY_TEMPERAMENTS":
      const everyDog = state.allDogs;
      const filteredDogs = everyDog.filter((ele) =>
        ele.temperament?.includes(action.payload)
      );
      return {
        ...state,
        dogs: filteredDogs,
      };
    case "FILTER_IF_DB_CREATED":
      const filteredByCreation =
        action.payload === 'created'
          ? state.allDogs.filter((el) => el.DB_created)
          : state.allDogs.filter((ele) => !ele.DB_created);
        return{
            ...state,
            dogs:action.payload === 'all' ? state.allDogs : filteredByCreation
        };
    default:
      return state;
  }
}

export default rootReducer;
