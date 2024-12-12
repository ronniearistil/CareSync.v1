import React, { useEffect, useState } from 'react';
import { fetchPatientById } from '../utils/api'; // Adjusted path to relative

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    fetchPatientById(id)
      .then((data) => setPatient(data))
      .catch((error) => console.error('Failed to fetch patient details:', error));
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div>
      <h2>{patient.first_name} {patient.last_name}</h2>
      <p>Email: {patient.email}</p>
      <p>Date of Birth: {patient.date_of_birth}</p>
    </div>
  );
};

export default PatientDetails;


