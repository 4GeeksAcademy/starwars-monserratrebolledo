
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: [],
            vehicles: [],
            planets: [],
            favorites: []
        },
        actions: {
            
            getPeople: async () => {
                try {
                    const res = await fetch("https://www.swapi.tech/api/people");
                    const data = await res.json();
                    setStore({ people: data.results });
                } catch (err) {
                    console.error("Error cargando personas", err);
                }
            },

            getVehicles: async () => {
                try {
                    const res = await fetch("https://www.swapi.tech/api/vehicles");
                    const data = await res.json();
                    setStore({ vehicles: data.results });
                } catch (err) {
                    console.error("Error cargando vehículos", err);
                }
            },

            getPlanets: async () => {
                try {
                    const res = await fetch("https://www.swapi.tech/api/planets");
                    const data = await res.json();
                    setStore({ planets: data.results });
                } catch (err) {
                    console.error("Error cargando planetas", err);
                }
            },

            addFavorite: (item) => {
                const store = getStore();
                if (!store.favorites.find(fav => fav.uid === item.uid && fav.type === item.type)) {
                    setStore({ favorites: [...store.favorites, item] });
                }
            },

            
            removeFavorite: (uid, type) => {
                const store = getStore();
                setStore({
                    favorites: store.favorites.filter(fav => !(fav.uid === uid && fav.type === type))
                });
            }
        }
    };
};

export const initialStore = {
    people: [],
    vehicles: [],
    planets: [],
    favorites: []
};

export const storeReducer = (state, action) => {
    switch (action.type) {
        case "SET_PEOPLE":
            return { ...state, people: action.payload };
        case "SET_VEHICLES":
            return { ...state, vehicles: action.payload };
        case "SET_PLANETS":
            return { ...state, planets: action.payload };
        case "ADD_FAVORITE":
            if (!state.favorites.find(fav => fav.uid === action.payload.uid && fav.type === action.payload.type)) {
                return { ...state, favorites: [...state.favorites, action.payload] };
            }
            return state;
        case "REMOVE_FAVORITE":
            return {
                ...state,
                favorites: state.favorites.filter(fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type))
            };
        default:
            return state;
    }
};

export default getState;