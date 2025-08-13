import React, { createContext, useReducer, useContext } from "react";


const initialState = {
    people: [],
    vehicles: [],
    planets: [],
    favorites: []
};

function storeReducer(state, action) {
    switch (action.type) {
        case "SET_PEOPLE":
            return { ...state, people: action.payload };
        case "SET_VEHICLES":
            return { ...state, vehicles: action.payload };
        case "SET_PLANETS":
            return { ...state, planets: action.payload };
        case "ADD_FAVORITE":
            if (state.favorites.some(f => f.uid === action.payload.uid && f.type === action.payload.type)) {
                return state; 
            }
            return { ...state, favorites: [...state.favorites, action.payload] };
        case "REMOVE_FAVORITE":
            return {
                ...state,
                favorites: state.favorites.filter(
                    fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
                )
            };
        default:
            return state;
    }
}


const StoreContext = createContext(null);


export const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(storeReducer, initialState);

    
    const getPeople = async () => {
        const res = await fetch("https://www.swapi.tech/api/people/");
        const data = await res.json();
        dispatch({ type: "SET_PEOPLE", payload: data.results });
    };

    const getVehicles = async () => {
        const res = await fetch("https://www.swapi.tech/api/vehicles/");
        const data = await res.json();
        dispatch({ type: "SET_VEHICLES", payload: data.results });
    };

    const getPlanets = async () => {
        const res = await fetch("https://www.swapi.tech/api/planets/");
        const data = await res.json();
        dispatch({ type: "SET_PLANETS", payload: data.results });
    };

    return (
        <StoreContext.Provider value={{ store, dispatch, getPeople, getVehicles, getPlanets }}>
            {children}
        </StoreContext.Provider>
    );
};

export default function useGlobalReducer() {
    return useContext(StoreContext);
}