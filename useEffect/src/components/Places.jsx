import React from "react";

function Places({ title, place, fallbackText, onSelectPlace }) {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {place.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {place.length > 0 && (
        <ul className="places">
          {place.map((el) => (
            <li key={el.id} className="place-item">
              <button onClick={() => onSelectPlace(el.id)}>
                <img src={el.image.src} alt={el.image.alt} />
                <h3>{el.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Places;
