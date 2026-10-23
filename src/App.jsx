import Header from "./components/Header";
import Navbar from "./components/Navbar";
import StudentCard from "./components/StudentCard";
import Footer from "./components/Footer";

import jinenImage from "./assets/jinen.png";
import ranimImage from "./assets/ranim.png";
import mariemImage from "./assets/mariem.png";

import "./App.css";

const etudiants = [
  {
    prenom: "Jinen",
    nom: "Saibi",
    email: "jinensaibi@gmail.com",
    telephone: "99 999 999",
    filiere: "Genie logiciel et systems d'information",
    groupe: "GLSI 2",
    image: jinenImage
  },
  {
    prenom: "ranim",
    nom: "magtouf",
    email: "ranim@gmail.com",
    telephone: "22 222 222",
    filiere: "Genie logiciel et systems d'information",
    groupe: "GLSI 2",
    image: ranimImage
  },
  {
    prenom: "Mariem",
    nom: "Khalfallah",
    email: "mariem@gmail.com",
    telephone: "27 777 777",
    filiere: "Genie logiciel et systems d'information",
    groupe: "GLSI 2",
    image: mariemImage
  }
];

function App() {
  return (
    <div className="container" id="accueil">
      <Header />
      <Navbar />

      <main id="etudiants">
        <h2 className="titre">Liste des étudiants</h2>

        <div className="students">
          {etudiants.map((etudiant) => (
            <StudentCard
              key={etudiant.email}
              prenom={etudiant.prenom}
              nom={etudiant.nom}
              email={etudiant.email}
              telephone={etudiant.telephone}
              filiere={etudiant.filiere}
              groupe={etudiant.groupe}
              image={etudiant.image}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
