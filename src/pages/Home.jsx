

import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import DetailsModal from "../components/DetailsModal";

export const Home = () => {
    const { store, getPeople, getPlanets, dispatch } = useGlobalReducer();

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalType, setModalType] = useState("");
    const [modalProperties, setModalProperties] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => {
        getPeople();
        getPlanets();
    }, [getPeople, getPlanets]);

    const isFavorited = (uid, type) => {
        return store.favorites.some(f => f.uid === uid && f.type === type);
    };

    const toggleFavorite = (item) => {
        if (isFavorited(item.uid, item.type)) {
            dispatch({ type: "REMOVE_FAVORITE", payload: { uid: item.uid, type: item.type } });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: item });
        }
    };

    const openDetails = async (uid, type, name) => {
        setLoadingDetails(true);
        setModalTitle(name);
        setModalType(type);
        setModalProperties(null);
        setShowModal(true);

        try {
            const url = `https://www.swapi.tech/api/${type}/${uid}`;
            const res = await fetch(url);
            const json = await res.json();
            
            if (json && json.result && json.result.properties) {
                setModalProperties(json.result.properties);
            } else {
                setModalProperties(null);
            }
        } catch (err) {
            console.error("Error fetching details:", err);
            setModalProperties(null);
        } finally {
            setLoadingDetails(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalProperties(null);
    };

    return (
        <div className="container mt-4">
            <h2>Characters</h2>
            <div className="d-flex overflow-auto">
                {store.people.map((p) => (
                    <div key={p.uid} className="card m-2" style={{ minWidth: "200px" }}>
                        <img
                            src="https://www.verance.com/app/uploads/2017/01/400x200.png"
                            className="card-img-top"
                            alt={p.name}
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{p.name}</h5>

                            <div className="d-flex gap-2 mt-auto">
                                <button
                                    className={`btn ${isFavorited(p.uid, "people") ? "btn-warning" : "btn-outline-warning"}`}
                                    onClick={() => toggleFavorite({ name: p.name, uid: p.uid, type: "people" })}
                                    aria-label={`Toggle favorite ${p.name}`}
                                >
                                    <i
                                        className={`fa-solid fa-heart`}
                                        style={{ color: isFavorited(p.uid, "people") ? "#fff" : undefined }}
                                        aria-hidden="true"
                                    />
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => openDetails(p.uid, "people", p.name)}
                                >
                                    Learn more
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="mt-4">Planets</h2>
            <div className="d-flex overflow-auto">
                {store.planets.map((pl) => (
                    <div key={pl.uid} className="card m-2" style={{ minWidth: "200px" }}>
                        <img
                            src={`https://starwars-visualguide.com/assets/img/planets/${pl.uid}.jpg`}
                            className="card-img-top"
                            alt={pl.name}
                            onError={(e) => {
                                e.currentTarget.src =
                                    "https://www.verance.com/app/uploads/2017/01/400x200.png";
                            }}
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{pl.name}</h5>

                            <div className="d-flex gap-2 mt-auto">
                                <button
                                    className={`btn ${isFavorited(pl.uid, "planets") ? "btn-warning" : "btn-outline-warning"}`}
                                    onClick={() => toggleFavorite({ name: pl.name, uid: pl.uid, type: "planets" })}
                                    aria-label={`Toggle favorite ${pl.name}`}
                                >
                                    <i
                                        className={`fa-solid fa-heart`}
                                        style={{ color: isFavorited(pl.uid, "planets") ? "#fff" : undefined }}
                                        aria-hidden="true"
                                    />
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => openDetails(pl.uid, "planets", pl.name)}
                                >
                                    Learn more
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <DetailsModal
                show={showModal}
                onClose={closeModal}
                title={modalTitle + (loadingDetails ? " (loading...)" : "")}
                properties={modalProperties}
                type={modalType}
            />
        </div>
    );
};
