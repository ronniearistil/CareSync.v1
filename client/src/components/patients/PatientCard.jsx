import React from 'react';

const PatientCard = ({ patient }) => (
  <div className="card">
    <h3>{patient.first_name} {patient.last_name}</h3>
    <p>{patient.email}</p>
    <button onClick={() => window.location.href = `/patients/${patient.id}`}>
      View Details
    </button>
  </div>
);

export default PatientCard;


