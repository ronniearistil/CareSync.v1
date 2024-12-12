import React, { useEffect, useState } from 'react';
import { fetchPatients } from '../utils/api';
import PatientCard from '../components/Patients/PatientCard';

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients()
      .then((response) => setPatients(response.data))
      .catch((error) => console.error('Error fetching patients:', error));
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      <div>
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
};

export default Patients;
