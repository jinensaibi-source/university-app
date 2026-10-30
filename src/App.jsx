import { useState } from "react";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import StudentCard from "./components/StudentCard";
import Footer from "./components/Footer"; 

import jinenImage from "./assets/jinen.png";
import ranimImage from "./assets/ranim.png";
import mariemImage from "./assets/mariem.png";

import "./App.css";

const etudiantsInitiaux = [
  {
    id: 1,
    prenom: "Jinen",
    nom: "Saibi",
    email: "jinensaibi@gmail.com",
    telephone: "99 999 999",
    filiere: "GLSI",
    groupe: "GLSI 2",
    image: jinenImage
  },
  {
    id: 2,
    prenom: "ranim",
    nom: "Magtouf",
    email: "ranim@gmail.com",
    telephone: "22 222 222",
    filiere: "GLSI",
    groupe: "GLSI 2",
    image: ranimImage
  },
  {
    id: 3,
    prenom: "Mariem",
    nom: "Khalfallah",
    email: "mariem@gmail.com",
    telephone: "27 777 777",
    filiere: "GLSI",
    groupe: "GLSI 2",
    image: mariemImage
  }
];

function App() {
  const [etudiants, setEtudiants] = useState(etudiantsInitiaux);

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [filiere, setFiliere] = useState("GLSI");
  const [groupe, setGroupe] = useState("GLSI 2");

  const [filtre, setFiltre] = useState("Toutes");

  function ajouterEtudiant(e) {
    e.preventDefault();

    if (prenom.trim() === "" || nom.trim() === "") {
      alert("Veuillez saisir le prénom et le nom.");
      return;
    }

    const nouvelEtudiant = {
      id: Date.now(),
      prenom: prenom,
      nom: nom,
      email: email,
      telephone: telephone,
      filiere: filiere,
      groupe: groupe,
      image: ranimImage
    };

    setEtudiants([...etudiants, nouvelEtudiant]);

    setPrenom("");
    setNom("");
    setEmail("");
    setTelephone("");
    setFiliere("GLSI");
    setGroupe("GLSI 2");
  }

  function supprimerEtudiant(id) {
    setEtudiants(
      etudiants.filter((etudiant) => etudiant.id !== id)
    );
  }

  function modifierPrenom(id, nouveauPrenom) {
    if (nouveauPrenom.trim() === "") {
      alert("Le prénom ne peut pas être vide.");
      return;
    }

    setEtudiants(
      etudiants.map((etudiant) =>
        etudiant.id === id
          ? { ...etudiant, prenom: nouveauPrenom }
          : etudiant
      )
    );
  }

  const etudiantsFiltres =
    filtre === "Toutes"
      ? etudiants
      : etudiants.filter(
          (etudiant) => etudiant.filiere === filtre
        );

  return (
    <div className="container" id="accueil">
      <Header />
      <Navbar />

      <main id="etudiants">
        <h2 className="titre">Liste des étudiants</h2>

        <section className="formulaire">
          <h2>Ajouter un étudiant</h2>

          <form onSubmit={ajouterEtudiant}>
            <input
              type="text"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Téléphone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />

            <select
              value={filiere}
              onChange={(e) => setFiliere(e.target.value)}
            >
              <option value="GLSI">GLSI</option>
              <option value="Informatique">Informatique</option>
              <option value="Réseaux">Réseaux</option>
            </select>

            <input
              type="text"
              placeholder="Groupe"
              value={groupe}
              onChange={(e) => setGroupe(e.target.value)}
            />

            <button onClick={ajouterEtudiant} type="submit" className="btn-ajouter">
              Ajouter l'étudiant
            </button>
          </form>
        </section>

        <section className="filtrage">
          <label htmlFor="filtre">Filtrer par filière : </label>

          <select
            id="filtre"
            value={filtre}
            onChange={(e) => setFiltre(e.target.value)}
          >
            <option value="Toutes">Toutes les filières</option>
            <option value="GLSI">GLSI</option>
            <option value="Informatique">Informatique</option>
            <option value="Réseaux">Réseaux</option>
          </select>
        </section>

        <div className="students">
          {etudiantsFiltres.map((etudiant) => (
            <StudentCard
              key={etudiant.id}
              etudiant={etudiant}
              onSupprimer={supprimerEtudiant}
              onModifier={modifierPrenom}
            />
          ))}
        </div>

        {etudiantsFiltres.length === 0 && (
          <p className="aucun">Aucun étudiant dans cette filière.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
