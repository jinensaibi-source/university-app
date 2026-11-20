
import { useState } from "react";
import "./StudentForme.css";

function StudentForme(props) {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [filiere, setFiliere] = useState("GLSI");
  const [groupe, setGroupe] = useState("GLSI 2");
  const [anneeEtude, setAnneeEtude] = useState("");
  const [ville, setVille] = useState("");
  const [image, setImage] = useState("");

  // Sélectionner une image
  function choisirImage(e) {
    const fichier = e.target.files[0];

    if (fichier) {
      setImage(URL.createObjectURL(fichier));
    }
  }

  // Envoyer les données du formulaire
  function handleSubmit(e) {
    e.preventDefault();

    const nouvelEtudiant = {
      prenom: prenom,
      nom: nom,
      email: email,
      telephone: telephone,
      filiere: filiere,
      groupe: groupe,
      anneeEtude: anneeEtude,
      ville: ville,
      image: image
    };

    // Envoyer le nouvel étudiant à App.jsx
    props.onAjouter(nouvelEtudiant);

    // Vider les champs après l'ajout
    setPrenom("");
    setNom("");
    setEmail("");
    setTelephone("");
    setFiliere("GLSI");
    setGroupe("GLSI 2");
    setAnneeEtude("");
    setVille("");
    setImage("");
  }

  return (
    <section className="formulaire">
      <h2>Ajouter un étudiant</h2>

      <form onSubmit={handleSubmit}>

        <label htmlFor="prenom">Prénom :</label>
        <input
          type="text"
          id="prenom"
          placeholder="Saisir le prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />

        <label htmlFor="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          placeholder="Saisir le nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />

        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          placeholder="exemple@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="telephone">Téléphone :</label>
        <input
          type="tel"
          id="telephone"
          placeholder="Saisir le téléphone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />

        <label htmlFor="filiere">Filière :</label>
        <select
          id="filiere"
          value={filiere}
          onChange={(e) => setFiliere(e.target.value)}
        >
          <option value="GLSI">GLSI</option>
          <option value="Informatique">Informatique</option>
          <option value="Réseaux">Réseaux</option>
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
          placeholder="Exemple : 2ème année"
          value={anneeEtude}
          onChange={(e) => setAnneeEtude(e.target.value)}
        />

        <label htmlFor="ville">Ville :</label>
        <input
          type="text"
          id="ville"
          placeholder="Saisir la ville"
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

        <button type="submit" className="btn-ajouter">
          Ajouter l'étudiant
        </button>

      </form>
    </section>
  );
}

export default StudentForme;
