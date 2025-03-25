// main.jsx

import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import Dashboard from "./pages/dasboard/Dashboard";
import Doctors from "./pages/doctors/Doctors";
import Add from "./pages/doctors/Add";
import "./index.css";
import Detail from "./pages/doctors/Detail";
import Update from "./pages/doctors/Update";
import Infermiers from "./pages/infermiers/Infermiers";
import Patients from "./pages/patients/Patients";
import Departements from "./pages/departements/Departements";
import StocksMedicaux from "./pages/stocks/StocksMedicaux";
import ProfileAdmin from "./pages/profileAdmin/ProfileAdmin";
import DetailAdmin from "./pages/profileAdmin/DetailAdmin";
import EditAdmin from "./pages/profileAdmin/editAdmin";

// The root component where doctorsData is managed
export const AppWithRouter = () => {
  /***************************************************************
   * *************************************************************
   * ****************  admin part  **************************/

  const [adminData, setAdminData] = useState({
    name: "ahmed kareem",
    cin: "PB123456",
    "N° de Telephone": "0612345678",
    email: "ahmedkareem@gmail.com",
    age: 36,
    statut: "Single",
    adress: "rue el ahmed kareem",
  });

  /***************************************************************
   * *************************************************************
   * ****************  infermier part  **************************/

  const [infermiersData, setInfermiersData] = useState(
    JSON.parse(localStorage.getItem("donneesInfermiers")) || []
  );

  // Function to add a new doctor to the list
  const addInfermier = (newInfermier) => {
    setInfermiersData((prevData) => {
      const updatedDataInf = [...prevData, newInfermier];
      localStorage.setItem("donneesInfermiers", JSON.stringify(updatedDataInf));
      return updatedDataInf;
    });
  };

  // Function to delete a doctor by ID
  const deleteInfermier = (ID) => {
    const updatedInfermiers = infermiersData.filter(
      (infermier) => String(infermier.id) !== String(ID)
    );
    setInfermiersData(updatedInfermiers);
    localStorage.setItem(
      "donneesInfermiers",
      JSON.stringify(updatedInfermiers)
    ); // Sync with localStorage
  };

  // UseEffect hook to sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem("donneesInfermiers", JSON.stringify(infermiersData));
  }, [infermiersData]);

  /***************************************************************
   * *************************************************************
   * ****************  doctor part  **************************/

  const [doctorsData, setDoctorsData] = useState(
    JSON.parse(localStorage.getItem("donneesDoctors")) || []
  );

  // Function to add a new doctor to the list
  const addDoctor = (newDoctor) => {
    setDoctorsData((prevData) => {
      const updatedData = [...prevData, newDoctor];
      localStorage.setItem("donneesDoctors", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Function to delete a doctor by ID
  const deleteDoctor = (id) => {
    const updatedDoctors = doctorsData.filter(
      (doctor) => String(doctor.id) !== String(id)
    );
    setDoctorsData(updatedDoctors);
    localStorage.setItem("donneesDoctors", JSON.stringify(updatedDoctors)); // Sync with localStorage
  };

  // UseEffect hook to sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem("donneesDoctors", JSON.stringify(doctorsData));
  }, [doctorsData]);

  /***************************************************************
   * *************************************************************
   * ****************  patient part  **************************/

  const [patientsData, setPatientsData] = useState(
    JSON.parse(localStorage.getItem("donneesPatients")) || []
  );

  // Function to add a new doctor to the list
  const addPatient = (newPatient) => {
    setPatientsData((prevData) => {
      const updatedDataPat = [...prevData, newPatient];
      localStorage.setItem("donneesPatients", JSON.stringify(updatedDataPat));
      return updatedDataPat;
    });
  };

  // Function to delete a doctor by ID
  const deletePatient = (ID) => {
    const updatedPatients = patientsData.filter(
      (patient) => String(patient.id) !== String(ID)
    );
    setPatientsData(updatedPatients);
    localStorage.setItem("donneesPatients", JSON.stringify(updatedPatients)); // Sync with localStorage
  };

  // UseEffect hook to sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem("donneesPatients", JSON.stringify(patientsData));
  }, [patientsData]);

  /***************************************************************
   * *************************************************************
   * ****************  departement part  **************************/

  const [departementsData, setDepartementsData] = useState(
    JSON.parse(localStorage.getItem("donneesDepartements")) || []
  );

  // Function to add a new doctor to the list
  const addDepartement = (newDepartement) => {
    setDepartementsData((prevData) => {
      const updatedDataDep = [...prevData, newDepartement];
      localStorage.setItem(
        "donneesDepartements",
        JSON.stringify(updatedDataDep)
      );
      return updatedDataDep;
    });
  };

  // Function to delete a doctor by ID
  const deleteDepartement = (ID) => {
    const updatedDepartements = departementsData.filter(
      (dep) => String(dep.id) !== String(ID)
    );
    setDepartementsData(updatedDepartements);
    localStorage.setItem(
      "donneesDepartements",
      JSON.stringify(updatedDepartements)
    ); // Sync with localStorage
  };

  // UseEffect hook to sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(
      "donneesDepartements",
      JSON.stringify(departementsData)
    );
  }, [departementsData]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        {/***** doctors part ****/}
        <Route
          index
          element={
            <Dashboard
              doctorsData={doctorsData}
              infermiersData={infermiersData}
              patientsData={patientsData}
              departementsData={departementsData}
            />
          }
        />
        <Route
          path="doctors"
          element={
            <Doctors doctorsData={doctorsData} deleteDoctor={deleteDoctor} />
          }
        />
        <Route
          path="add/:category"
          element={
            <Add
              addDoctor={addDoctor}
              addInfermier={addInfermier}
              addPatient={addPatient}
              doctorsData={doctorsData}
              addDepartement={addDepartement}
            />
          }
        />
        <Route
          path="update/:id/:category"
          element={
            <Update
              doctorsData={doctorsData}
              setDoctorsData={setDoctorsData}
              infermiersData={infermiersData}
              setInfermiersData={setInfermiersData}
              patientsData={patientsData}
              setPatientsData={setPatientsData}
              departementsData={departementsData}
              setDepartementsData={setDepartementsData}
            />
          }
        />
        <Route
          path="/detail/:id/:category"
          element={
            <Detail
              doctorsData={doctorsData}
              infermiersData={infermiersData}
              patientsData={patientsData}
            />
          }
        />
        {/***************************************************
         *********************** infermiers part *********************/}
        <Route
          path="/infermiers"
          element={
            <Infermiers
              infermiersData={infermiersData}
              deleteInfermier={deleteInfermier}
            />
          }
        />
        {/***************************************************
         *********************** patients part *********************/}
        <Route
          path="patients"
          element={
            <Patients
              patientsData={patientsData}
              deletePatient={deletePatient}
            />
          }
        />
        {/***************************************************
         *********************** departements part *********************/}
        <Route
          path="departements"
          element={
            <Departements
              departementsData={departementsData}
              deleteDepartement={deleteDepartement}
            />
          }
        />
        {/***************************************************
         *********************** stocks part *********************/}
        <Route path="stocksMedicaux" element={<StocksMedicaux />} />
        {/***************************************************
         *********************** profile admin part *********************/}

        <Route
          path="profileAdmin"
          element={<ProfileAdmin adminData={adminData} />}
        />

        <Route
          path="detailAdmin"
          element={<DetailAdmin adminData={adminData} />}
        />

        <Route path="editAdmin" element={<EditAdmin adminData={adminData} />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWithRouter />
  </React.StrictMode>
);
