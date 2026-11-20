import { useState } from "react";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import StudentCard from "./components/StudentCard";
import Footer from "./components/Footer";
import StudentForme from "./components/StudentForme";

import jinenImage from "./assets/jinen.png";
import ranimImage from "./assets/ranim.png";
import mariemImage from "./assets/mariem.png";
import "./App.css";
import"./components/StudentForme.css";


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
    prenom: "Ranim",
    nom: "Magtouf",
    email: "ranim@gmail.com",
    telephone: "22 222 222",
    filiere: "GLSI",
    groupe: "GLSI 2",
    image: ranimImage
  },
  {
    id: 3,
    prenom: "Dalel",
    nom: "Abbessi",
    email: "dalel@gmail.com",
    telephone: "27 777 777",
    filiere: "IOT",
    groupe: "IOT2",
    image: mariemImage
  }
];

function App() {
  const [etudiants, setEtudiants] = useState(etudiantsInitiaux);

  const [filtre, setFiltre] = useState("Toutes");

  // Ajouter un étudiant reçu depuis StudentForme
  function ajouterEtudiant(nouvelEtudiant) {
    const etudiantAvecId = {
      ...nouvelEtudiant,
      id: Date.now()
    };

    setEtudiants([...etudiants, etudiantAvecId]);
  }

  // Supprimer un étudiant
  function supprimerEtudiant(id) {
    setEtudiants(
      etudiants.filter((etudiant) => etudiant.id !== id)
    );
  }

  // Modifier le prénom
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

  // Filtrer les étudiants
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

        {/* Formulaire d'inscription */}
        <StudentForme onAjouter={ajouterEtudiant} />

        <h2 className="titre">Liste des étudiants</h2>

        {/* Filtrage par filière */}
        <section className="filtrage">
          <label htmlFor="filtre">Filtrer par filière :</label>

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

        {/* Affichage des étudiants */}
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
          <p className="aucun">
            Aucun étudiant dans cette filière.
          </p>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default App;
