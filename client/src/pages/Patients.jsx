import React, { useEffect, useState } from 'react';
import { fetchPatients } from '../utils/api';
import PatientCard from '../components/Patients/PatientCard';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await fetchPatients();
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
        // Handle error (e.g., display an error message)
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    getPatients();
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      {isLoading ? ( // Conditional rendering for loading state
        <p>Loading patients...</p>
      ) : (
        <div>
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Patients;

