
import { useState } from "react";
import "./StudentForme.css";

function StudentForme(props) {

  const { etudiantAModifier } = props;

  // Page 36 : initialiser les champs selon l'étudiant sélectionné
  const [prenom, setPrenom] = useState(etudiantAModifier?.prenom || "");
  const [nom, setNom] = useState(etudiantAModifier?.nom || "");
  const [email, setEmail] = useState(etudiantAModifier?.email || "");
  const [telephone, setTelephone] = useState(etudiantAModifier?.telephone || "");
  const [filiere, setFiliere] = useState(etudiantAModifier?.filiere || "");
  const [anneeEtude, setAnneeEtude] = useState(etudiantAModifier?.anneeEtude || "");
  const [groupe, setGroupe] = useState(etudiantAModifier?.groupe || "");
  const [ville, setVille] = useState(etudiantAModifier?.ville || "");
  const [image, setImage] = useState(etudiantAModifier?.image || "");

  const [erreurs, setErreurs] = useState({});

  // Choisir une image
  function choisirImage(e) {
    const fichier = e.target.files[0];

    if (fichier) {
      setImage(URL.createObjectURL(fichier));
    }
  }

  // Valider le formulaire
  function validerFormulaire() {
    const nouvellesErreurs = {};

    if (nom.trim() === "") {
      nouvellesErreurs.nom = "Le nom est obligatoire.";
    }

    if (prenom.trim() === "") {
      nouvellesErreurs.prenom = "Le prénom est obligatoire.";
    }

    if (email.trim() === "") {
      nouvellesErreurs.email = "L'email est obligatoire.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nouvellesErreurs.email = "L'email n'est pas valide.";
    }

    if (telephone.trim() === "") {
      nouvellesErreurs.telephone = "Le téléphone est obligatoire.";
    }

    setErreurs(nouvellesErreurs);

    return Object.keys(nouvellesErreurs).length === 0;
  }

  // Réinitialiser les champs
  function viderFormulaire() {
    setPrenom("");
    setNom("");
    setEmail("");
    setTelephone("");
    setFiliere("");
    setAnneeEtude("");
    setGroupe("");
    setVille("");
    setImage("");
    setErreurs({});
  }

  // Ajouter ou modifier un étudiant
  function handleSubmit(e) {
    e.preventDefault();

    if (!validerFormulaire()) {
      return;
    }

    const nouvelEtudiant = {
      nom: nom,
      prenom: prenom,
      email: email,
      telephone: telephone,
      filiere: filiere,
      anneeEtude: anneeEtude,
      groupe: groupe,
      ville: ville,
      image: image
    };

    if (etudiantAModifier) {

      // Modifier l'étudiant sélectionné
      props.onModifierEtudiant({
        ...nouvelEtudiant,
        id: etudiantAModifier.id
      });

    } else {

      // Ajouter un nouvel étudiant
      props.onAjouter(nouvelEtudiant);

      viderFormulaire();
    }
  }

  // Reset ou annuler la modification
  function reinitialiserFormulaire() {
    viderFormulaire();

    if (etudiantAModifier) {
      props.onAnnuler();
    }
  }

  return (
    <section className="formulaire">

      <h2>
        {etudiantAModifier
          ? "Modifier un étudiant"
          : "Ajouter un étudiant"}
      </h2>

      <form onSubmit={handleSubmit}>

        <label htmlFor="prenom">Prénom :</label>
        <input
          type="text"
          id="prenom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
        {erreurs.prenom && (
          <p className="erreur">{erreurs.prenom}</p>
        )}

        <label htmlFor="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        {erreurs.nom && (
          <p className="erreur">{erreurs.nom}</p>
        )}

        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {erreurs.email && (
          <p className="erreur">{erreurs.email}</p>
        )}

        <label htmlFor="telephone">Téléphone :</label>
        <input
          type="tel"
          id="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />
        {erreurs.telephone && (
          <p className="erreur">{erreurs.telephone}</p>
        )}

        <label htmlFor="filiere">Filière :</label>
        <select
          id="filiere"
          value={filiere}
          onChange={(e) => setFiliere(e.target.value)}
        >
          <option value="">Choisir une filière</option>
          <option value="GLSI">GLSI</option>
          <option value="Informatique">Informatique</option>
          <option value="Réseaux">Réseaux</option>
          <option value="IOT">IOT</option>
        </select>

        <label htmlFor="groupe">Groupe :</label>
        <input
          type="text"
          id="groupe"
          value={groupe}
          onChange={(e) => setGroupe(e.target.value)}
        />

        <label htmlFor="anneeEtude">Année d'étude :</label>
        <input
          type="text"
          id="anneeEtude"
          value={anneeEtude}
          onChange={(e) => setAnneeEtude(e.target.value)}
        />

        <label htmlFor="ville">Ville :</label>
        <input
          type="text"
          id="ville"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
        />

        <label htmlFor="image">Photo :</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={choisirImage}
        />

        {image !== "" && (
          <img
            src={image}
            alt="Aperçu"
            className="preview-image"
          />
        )}

        <div className="actions-formulaire">

          <button type="submit" className="btn-ajouter">
            {etudiantAModifier
              ? "Enregistrer les modifications"
              : "Ajouter l'étudiant"}
          </button>

          <button
            type="button"
            className="btn-reset"
            onClick={reinitialiserFormulaire}
          >
            {etudiantAModifier ? "Annuler / Reset" : "Reset"}
          </button>

        </div>

      </form>
    </section>
  );
}

export default StudentForme;
