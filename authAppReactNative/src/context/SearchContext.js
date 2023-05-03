import React, { createContext, useReducer } from 'react';

export const SearchContext = createContext();

export const UPDATE_SEARCH = 'UPDATE_SEARCH';

export const updateSearchAction = (guests, destination, numberOfDays, dateRange) => ({
    type: UPDATE_SEARCH,
    payload: { guests, destination, numberOfDays, dateRange },
});

const initialState = {
    guests: 1,
    destination: '',
    numberOfDays: 1,
    dateRange: []
};

const searchReducer = (state, action) => {
    console.log("state search ", state)
    console.log("action search ", action.payload)
    switch (action.type) {
        case UPDATE_SEARCH:
            return {
                ...state,
                guests: action.payload.guests,
                destination: action.payload.destination,
                numberOfDays: action.payload.numberOfDays,
                dateRange: action.payload.dateRange,
            };
        default:
            return state;
    }
};

export const SearchProvider = ({ children }) => {
    const [state, dispatch] = useReducer(searchReducer, initialState);

    const updateSearch = (guests, destination, numberOfDays, dateRange) => {
        dispatch(updateSearchAction(guests, destination, numberOfDays, dateRange));
    };
    return (
        <SearchContext.Provider value={{ ...state, updateSearch }}>
            {children}
        </SearchContext.Provider>
    );
};
