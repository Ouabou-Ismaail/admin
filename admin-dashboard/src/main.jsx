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

// The root component where doctorsData is managed
const AppWithRouter = () => {
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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard doctorsData={doctorsData} />} />
        <Route
          path="doctors"
          element={
            <Doctors doctorsData={doctorsData} deleteDoctor={deleteDoctor} />
          }
        />
        <Route path="add" element={<Add addDoctor={addDoctor} />} />
        <Route
          path="update/:id"
          element={
            <Update doctorsData={doctorsData} setDoctorsData={setDoctorsData} />
          }
        />
        <Route
          path="/detail/:id"
          element={<Detail doctorsData={doctorsData} />}
        />
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
