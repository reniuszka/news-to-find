import React, { useContext, useEffect, useReducer } from 'react';
import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_NUMBER_PAGE,
  HANDLE_SEARCH,
} from './actions';
import reducer from './reducer';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const initialState = {
  isLoading: true,
  //hits(our data from api),query,page(which page) and nbpages(how many pages in total) coming from the api
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
  number: 1,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //set up the use reducer hok, we get two values = state and dispatch and we need to pass in two things: reducer function and the initial state
  const [state, disptach] = useReducer(reducer, initialState);

  //if i want to change anything in my state I want to dispatch an action so -I need to use dispatch, and in dispatch I pass an object -> inside this object there is a type property and value for ex: SET_LOADING which is gonna be described in the reducer function
  const fetchStories = async (url) => {
    disptach({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data, 'data from fetch');
      //now I want to dispatch action to change hits:[] to full array with payload to see the number of total of pages
      disptach({
        type: SET_STORIES,
        //it comes form api data there are keys hits and nbPages, want to take them to put them as values in reducer
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeStory = (id) => {
    console.log(id, 'id');
    disptach({ type: REMOVE_STORY, payload: id });
  };

  const findQuery = (query) => {
    console.log(query, 'query value');
    disptach({ type: HANDLE_SEARCH, payload: query });
  };
  //a value is a string :increase or decrease
  const handlePage = (value) => {
    console.log(value);
    disptach({ type: HANDLE_PAGE, payload: value });
  };

  const goToPage = (number) => {
    console.log(number, typeof number, 'number and its type');
    disptach({ type: HANDLE_NUMBER_PAGE, payload: number });
  };
  // we fetch data afeter changing the page or changing the value in query
  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);
  //everytime te value in my query changes we want to downoal data again
  //in value I pass in my state (all properties that are coming from useReducer from Initialstate)
  return (
    <AppContext.Provider
      value={{ ...state, removeStory, findQuery, handlePage, goToPage }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use - the hook that provides my context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
