
function StudentCard(props) {
  return (
    <div className="card">
      <img
        src={props.image}
        alt={"Photo de " + props.prenom}
        className="student-photo"
      />

      <h2>{props.prenom} {props.nom}</h2>

      <p><strong>Email :</strong> {props.email}</p>
      <p><strong>Téléphone :</strong> {props.telephone}</p>
      <p><strong>Filière :</strong> {props.filiere}</p>
      <p><strong>Groupe :</strong> {props.groupe}</p>
    </div>
  );
}

export default StudentCard;
