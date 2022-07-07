import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_NUMBER_PAGE,
  HANDLE_SEARCH,
} from './actions';
//in reducer we pass in the state - current the state just before the update and the action. we use swithc to chose which type of action we gonna do and whatwever is the case
const reducer = (state, action) => {
  switch (action.type) {
    //set all my actions as variables to avoid mistakes in writing so instead of thext we import it here
    // case 'SET_LOADING':
    case SET_LOADING:
      //want to return the previous value and change the loading
      return { ...state, isLoading: true };
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        //instead of hits:[]
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case REMOVE_STORY:
      return {
        ...state,
        //instead of hits:[full of data -remove one sotry]
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      };
    case HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload,
        page: 0,
      };
    // nbPages(numberPages) is 50,it means that lenght it is 49, as the array starts itx index at 0
    case HANDLE_PAGE:
      if (action.payload === 'increasePage') {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }
        return {
          ...state,
          page: nextPage,
        };
      }
      if (action.payload === 'decreasePage') {
        let prevPage = state.page - 1;
        if (prevPage < 0) {
          prevPage = state.nbPages - 1;
        }
        return {
          ...state,
          page: prevPage,
        };
      }
    case HANDLE_NUMBER_PAGE:
      let newNumber = action.payload;
      console.log(newNumber, 'new number');
      if (newNumber < 0 || newNumber > state.nbPages) {
        newNumber = 1;
        return {
          ...state,
          number: newNumber,
          page: parseInt(newNumber) - 1,
        };
      } else {
        return {
          ...state,
          // page: newNumber,
          number: newNumber,
          page: parseInt(newNumber) - 1,
        };
      }
    // let newNumber = parseInt(action.payload);

    //default set - if there are not matching cases(actions.type)
    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
};
export default reducer;
