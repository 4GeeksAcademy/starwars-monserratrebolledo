import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    const removeFavorite = (uid, type) => {
        dispatch({
            type: "REMOVE_FAVORITE",
            payload: { uid, type }
        });
    };

    const logoSrc =  "https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg";

    return (
        <nav className="navbar navbar-dark bg-dark mb-3">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img
                        src={logoSrc}
                        alt="Star Wars"
                        style={{ height: 36, objectFit: "contain" }}
                        className="me-2"
                    />
                </a>

                <div className="ms-auto">
                    <div className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="favoritesDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="fa-solid fa-heart me-1" aria-hidden="true" />
                            Favorites <span className="badge bg-secondary ms-2">{store.favorites.length}</span>
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end p-2" aria-labelledby="favoritesDropdown" style={{ minWidth: 220 }}>
                            {store.favorites.length === 0 ? (
                                <li className="dropdown-item text-muted">No favorites yet</li>
                            ) : (
                                store.favorites.map((fav, index) => (
                                    <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong style={{ fontSize: 14 }}>{fav.name}</strong>
                                            <div className="text-muted" style={{ fontSize: 12, lineHeight: 1 }}>
                                                <span className="text-capitalize">{fav.type}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => removeFavorite(fav.uid, fav.type)}
                                                aria-label={`Remove ${fav.name} from favorites`}
                                            >
                                                <i className="fa-solid fa-trash" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;