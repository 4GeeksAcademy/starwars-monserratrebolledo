import React from "react";

const DetailsModal = ({ show, onClose, title, properties, type }) => {
  if (!show) return null;

  
  const val = (k) => (properties && properties[k] ? properties[k] : "unknown");

  const describePerson = () => {
    const name = val("name") !== "unknown" ? val("name") : title;
    const birth = val("birth_year");
    const gender = val("gender");
    const height = val("height");
    const mass = val("mass");
    const hair = val("hair_color");
    const skin = val("skin_color");
    const eye = val("eye_color");

    const parts = [];

   
    parts.push(
      `${name} is ${gender !== "unknown" ? gender : "of unknown gender"}${birth !== "unknown" ? `, born in ${birth}` : ""}.`
    );

  
    const physical = [];
    if (height !== "unknown") physical.push(`${height} cm tall`);
    if (mass !== "unknown") physical.push(`${mass} kg`);
    if (hair !== "unknown") physical.push(`hair: ${hair}`);
    if (skin !== "unknown") physical.push(`skin: ${skin}`);
    if (eye !== "unknown") physical.push(`eyes: ${eye}`);

    if (physical.length) {
      parts.push(`Physical characteristics: ${physical.join(", ")}.`);
    }

    parts.push(
      `This character is part of the Star Wars universe. More specific information (films, species, vehicles) can be consulted in the detailed API if available.`
    );

    return parts.join(" ");
  };

  const describePlanet = () => {
    const name = val("name") !== "unknown" ? val("name") : title;
    const climate = val("climate");
    const terrain = val("terrain");
    const population = val("population");
    const gravity = val("gravity");
    const orbital = val("orbital_period");

    const parts = [];

    parts.push(`${name} is a planet${climate !== "unknown" ? ` with ${climate} climate` : ""}${terrain !== "unknown" ? ` and ${terrain} terrain` : ""}.`);

    const stats = [];
    if (population !== "unknown") stats.push(`population: ${population}`);
    if (gravity !== "unknown") stats.push(`gravity: ${gravity}`);
    if (orbital !== "unknown") stats.push(`orbital period: ${orbital}`);
    if (stats.length) parts.push(`Key stats — ${stats.join(", ")}.`);

    parts.push(`This is summary information provided from the SWAPI dataset.`);

    return parts.join(" ");
  };

  const description = type === "people" ? describePerson() : describePlanet();

  const deriveIdFromUrl = (url) => {
    if (!url) return null;
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  };

  const idFromProps = properties?.url ? deriveIdFromUrl(properties.url) : null;
  const imageUrl =
    type === "people"
      ? idFromProps
        ? `https://starwars-visualguide.com/assets/img/characters/${idFromProps}.jpg`
        : ""
      : type === "planets"
      ? idFromProps
        ? `https://starwars-visualguide.com/assets/img/planets/${idFromProps}.jpg`
        : ""
      : "";

  const finalImage =
    imageUrl && !imageUrl.includes("undefined") ? imageUrl : "https://www.verance.com/app/uploads/2017/01/400x200.png";

  return (
    <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
        <div className="modal-content">
          
          <div className="modal-header border-0">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>

          
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row align-items-start">
                
                <div className="col-md-5">
                  <div className="ratio ratio-4x3 mb-3">
                    <img
                      src={finalImage}
                      alt={title}
                      onError={(e) => (e.currentTarget.src = "https://www.verance.com/app/uploads/2017/01/400x200.png")}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </div>
                </div>

                
                <div className="col-md-7">
                  <h2 className="fw-bold">{title}</h2>
                  <p className="text-muted">{description}</p>
                </div>
              </div>

              <hr className="my-4" />

              
              <div className="row text-center">
                {type === "people" ? (
                  <>
                    <div className="col-6 col-md-2 mb-3">
                      <div className="text-uppercase text-muted small">Name</div>
                      <div className="fw-bold text-danger">{val("name") !== "unknown" ? val("name") : title}</div>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                      <div className="text-uppercase text-muted small">Birth Year</div>
                      <div className="fw-bold text-danger">{val("birth_year")}</div>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                      <div className="text-uppercase text-muted small">Gender</div>
                      <div className="fw-bold text-danger text-capitalize">{val("gender")}</div>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                      <div className="text-uppercase text-muted small">Height</div>
                      <div className="fw-bold text-danger">{val("height")}</div>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                      <div className="text-uppercase text-muted small">Skin Color</div>
                      <div className="fw-bold text-danger text-capitalize">{val("skin_color")}</div>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                      <div className="text-uppercase text-muted small">Eye Color</div>
                      <div className="fw-bold text-danger text-capitalize">{val("eye_color")}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-6 col-md-2 mb-3">
                      <div className="text-uppercase text-muted small">Name</div>
                      <div className="fw-bold text-danger">{val("name") !== "unknown" ? val("name") : title}</div>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                      <div className="text-uppercase text-muted small">Climate</div>
                      <div className="fw-bold text-danger">{val("climate")}</div>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                      <div className="text-uppercase text-muted small">Population</div>
                      <div className="fw-bold text-danger">{val("population")}</div>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                      <div className="text-uppercase text-muted small">Terrain</div>
                      <div className="fw-bold text-danger">{val("terrain")}</div>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                      <div className="text-uppercase text-muted small">Gravity</div>
                      <div className="fw-bold text-danger">{val("gravity")}</div>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                      <div className="text-uppercase text-muted small">Orbital Period</div>
                      <div className="fw-bold text-danger">{val("orbital_period")}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;