
import { useState } from "react";

function StudentCard({ etudiant, onSupprimer, onModifier }) {
  const [coordonneesVisibles, setCoordonneesVisibles] =
    useState(false);

  const [modeModification, setModeModification] =
    useState(false);

  const [nouveauPrenom, setNouveauPrenom] =
    useState(etudiant.prenom);

  function basculerInformations() {
    setCoordonneesVisibles(!coordonneesVisibles);
  }

  function enregistrerModification() {
    onModifier(etudiant.id, nouveauPrenom);
    setModeModification(false);
  }

  return (
    <div className="card">
      <img
        src={etudiant.image}
        alt={"Photo de " + etudiant.prenom}
        className="student-photo"
      />

      {modeModification ? (
        <div className="modification">
          <input
            type="text"
            value={nouveauPrenom}
            onChange={(e) => setNouveauPrenom(e.target.value)}
          />

          <button
            className="btn-modifier"
            onClick={enregistrerModification}
          >
            Enregistrer
          </button>
        </div>
      ) : (
        <h2>
          {etudiant.prenom} {etudiant.nom}
        </h2>
      )}

      <p>
        <strong>Filière :</strong> {etudiant.filiere}
      </p>

      <p>
        <strong>Groupe :</strong> {etudiant.groupe}
      </p>

      <button
        className="btn-informations"
        onClick={basculerInformations}
      >
        {coordonneesVisibles
          ? "Masquer les informations"
          : "Afficher les informations"}
      </button>

      {coordonneesVisibles && (
        <div className="coordonnees">
          <p><strong>Email :</strong> {etudiant.email}</p>
          <p><strong>Téléphone :</strong> {etudiant.telephone}</p>
        </div>
      )}

      <div className="actions">
        <button
          className="btn-modifier"
          onClick={() => {
            setNouveauPrenom(etudiant.prenom);
            setModeModification(!modeModification);
          }}
        >
          Modifier le prénom
        </button>

        <button
          className="btn-supprimer"
          onClick={() => onSupprimer(etudiant.id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
