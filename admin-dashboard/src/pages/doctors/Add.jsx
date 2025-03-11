// Add.jsx

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowBackOutlined } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import dayjs, { Dayjs } from "dayjs";

const StyledButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const StyledDay = styled(PickersDay)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.secondary.light,
  ...theme.applyStyles("light", {
    color: theme.palette.secondary.dark,
  }),
}));

const Add = ({ addDoctor, addInfermier, addPatient, doctorsData }) => {
  let doctorsName = [];

  doctorsData.forEach((doctor) => {
    doctorsName.push(`${doctor.nom} ${doctor.prenom}`);
  });

  const [idDoctor, setIdDoctor] = useState(
    JSON.parse(localStorage.getItem("idDoctor")) || 0
  );
  const [idInfermier, setIdInfermier] = useState(
    JSON.parse(localStorage.getItem("idInfermier")) || 0
  );
  const [idPatient, setIdPatient] = useState(
    JSON.parse(localStorage.getItem("idPatient")) || 0
  );

  const theme = useTheme();
  const { category } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isDoctorAdded, setIsDoctorAdded] = useState(false);
  const [isInfermierAdded, setIsInfermierAdded] = useState(false);
  const [isPatientAdded, setIsPatientAdded] = useState(false);

  // Initialize rendezVous state with a valid dayjs object
  const [rendezVous, setRendezVous] = useState(dayjs());
  const [formattedDate, setFormattedDate] = useState(
    dayjs().format("DD/MM/YYYY")
  );

  // Handle date change by ensuring the passed date is a valid dayjs object
  const handleDateChange = (newDate) => {
    const validDate = dayjs(newDate); // Convert to dayjs object
    if (validDate.isValid()) {
      setRendezVous(validDate);
      setFormattedDate(validDate.format("DD/MM/YYYY")); // Update the formatted date for display
    }
  };

  const onSubmit = (data) => {
    let newObject;
    if (category === "patients") {
      newObject = {
        id: getId(category),
        nom: data.nom,
        prenom: data.prenom,
        pb: data.pb,
        age: data.age,
        numero_Tele: data.numero_Tele,
        email: data.email,
        rendezVous: rendezVous.format("DD/MM/YYYY") || null,
        adress: data.adress,
        doctor_traitant: data.doctor_traitant,
        statut: data.statut,
        gender: data.gender,
        image: data.image && data.image[0] ? data.image[0].name : null,
      };
    } else {
      newObject = {
        id: getId(category),
        nom: data.nom,
        prenom: data.prenom,
        pb: data.pb,
        age: data.age,
        numero_Tele: data.numero_Tele,
        email: data.email,
        adress: data.adress,
        statut: data.statut,
        departement: data.departement,
        gender: data.gender,
        salary: data.salary,
        cv: data.cv && data.cv[0] ? data.cv[0].name : null,
        image: data.image && data.image[0] ? data.image[0].name : null,
      };
    }

    console.log(rendezVous.format("DD/MM/YYYY"));

    if (category === "doctors") {
      addDoctor(newObject);
      setIdDoctor(idDoctor);
      setIsDoctorAdded(true);
      console.log("Doctor added successfully");
    } else if (category === "infermiers") {
      addInfermier(newObject);
      setIdInfermier(idInfermier);
      setIsInfermierAdded(true);
      console.log("Infermier added successfully");
    } else if (category === "patients") {
      addPatient(newObject);
      setIdPatient(idPatient);
      setIsPatientAdded(true);
      console.log("Patient added successfully");
    }

    if (category === "doctors") {
      localStorage.setItem("idDoctor", JSON.stringify(idDoctor + 1));
    } else if (category === "infermiers") {
      localStorage.setItem("idInfermier", JSON.stringify(idInfermier + 1));
    } else if (category === "patients") {
      localStorage.setItem("idPatient", JSON.stringify(idPatient + 1));
    }
  };

  const getId = (category) => {
    if (category === "doctors") {
      return idDoctor + 1;
    } else if (category === "infermiers") {
      return idInfermier + 1;
    } else if (category === "patients") {
      return idPatient + 1;
    }
    return null;
  };

  useEffect(() => {
    if (isDoctorAdded || isInfermierAdded || isPatientAdded) {
      const timer = setTimeout(() => {
        navigate(`/${category}`);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isDoctorAdded, isInfermierAdded, isPatientAdded, navigate]);

  return (
    <Paper
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        width: "100%",
        gap: "25px",
        color: theme.palette.grey[100],
      }}
    >
      <Button
        sx={{
          display: "flex",
          justifyContent: "start",
          fontSize: "26px",
          position: "absolute",
          top: "5px",
          left: "5px",
          width: "40px",
          height: "60px",
          textAlign: "center",
          lineHeight: "40px",
          borderRadius: "50%",
          overflow: "hidden",
          pl: "20px",
        }}
        onClick={() =>
          setTimeout(() => {
            navigate(`/${category}`);
          }, 500)
        }
      >
        <ArrowBackOutlined />
      </Button>
      <Typography
        variant="h1"
        sx={{
          textTransform: "capitalize",
          pt: "20px",
          fontWeight: "900",
          fontSize: "35px",
        }}
      >
        Ajouter un nouveau {category.substring(0, category.length - 1)}{" "}
        {/* Removing the last character */}
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "100%",
          gap: "20px",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "100%",
            gap: "20px",
            my: "20px",
          }}
        >
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="ID*"
            value={
              category === "doctors"
                ? idDoctor + 1
                : category === "infermiers"
                ? idInfermier + 1
                : idPatient + 1
            } // Afficher l'ID mis à jour
            variant="outlined"
            {...register("id", { required: true })}
            disabled
          />

          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Nom*"
            variant="outlined"
            error={Boolean(errors.nom)}
            helperText={errors.nom ? "Ce champ est obligatoire" : null}
            {...register("nom", { required: true })}
          />

          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Prénom*"
            variant="outlined"
            error={Boolean(errors.prenom)}
            helperText={errors.prenom ? "Ce champ est obligatoire" : null}
            {...register("prenom", { required: true })}
          />

          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Email*"
            variant="outlined"
            error={Boolean(errors.email)}
            helperText={errors.email ? "Ce champ est obligatoire" : null}
            {...register("email", { required: true })}
          />

          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="N° Téléphone*"
            variant="outlined"
            error={Boolean(errors.numero_Tele)}
            helperText={errors.numero_Tele ? "Ce champ est obligatoire" : null}
            {...register("numero_Tele", { required: true })}
          />

          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="CIN*"
            variant="outlined"
            error={Boolean(errors.pb)}
            helperText={errors.pb ? "Ce champ est obligatoire" : null}
            {...register("pb", { required: true })}
          />

          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Age*"
            variant="outlined"
            error={Boolean(errors.age)}
            helperText={errors.age ? "Ce champ est obligatoire" : null}
            {...register("age", { required: true })}
          />

          {/* Sélecteur de genre */}
          <FormControl sx={{ minWidth: "400px", width: "49%", flexGrow: 1 }}>
            <InputLabel>statut*</InputLabel>
            <Select
              {...register("statut", { required: true })}
              label="statut"
              error={Boolean(errors.statut)}
            >
              <MenuItem value="homme">married</MenuItem>
              <MenuItem value="femme">single</MenuItem>
            </Select>
            {errors.gender && (
              <Typography color="error">Ce champ est obligatoire</Typography>
            )}
          </FormControl>

          {/* Sélecteur de genre */}
          <FormControl sx={{ minWidth: "400px", width: "49%", flexGrow: 1 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              {...register("gender", { required: true })}
              label="Genre"
              error={Boolean(errors.gender)}
            >
              <MenuItem value="homme">Homme</MenuItem>
              <MenuItem value="femme">Femme</MenuItem>
            </Select>
            {errors.gender && (
              <Typography color="error">Ce champ est obligatoire</Typography>
            )}
          </FormControl>

          {/* Champ d'adresse */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Adresse"
            variant="outlined"
            error={Boolean(errors.adress)}
            helperText={errors.adress ? "Ce champ est obligatoire" : null}
            {...register("adress", { required: true })}
          />

          {/* Champ de doctor traitant */}
          {category === "patients" ? (
            <FormControl sx={{ minWidth: "400px", width: "49%", flexGrow: 1 }}>
              <InputLabel>Doctor Traitants</InputLabel>
              <Select
                {...register("doctor_traitant", { required: false })}
                label="Doctor Traitants"
                error={Boolean(errors.doctor_traitant)}
              >
                {doctorsName.map((doctor) => (
                  <MenuItem key={doctor} value={doctor}>
                    {doctor}
                  </MenuItem>
                ))}
              </Select>
              {errors.doctor_traitant && (
                <Typography color="error">Ce champ est obligatoire</Typography>
              )}
            </FormControl>
          ) : null}

          {/* Champ de salaire */}
          {category === "doctors" || category === "infermiers" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="salary"
              variant="outlined"
              error={Boolean(errors.salary)}
              helperText={errors.salary ? "Ce champ est obligatoire" : null}
              {...register("salary", { required: true })}
            />
          ) : null}

          {/* Sélecteur de département */}
          {category === "doctors" || category === "infermiers" ? (
            <FormControl sx={{ minWidth: "400px", width: "49%", flexGrow: 1 }}>
              <InputLabel>Département</InputLabel>
              <Select
                {...register("departement", { required: true })}
                label="Département"
                error={Boolean(errors.departement)}
              >
                <MenuItem value="Gynécologie_Obstétrique">
                  Gynécologie et Obstétrique
                </MenuItem>
                <MenuItem value="Pédiatrie">Pédiatrie</MenuItem>
                <MenuItem value="Urgences">Urgences</MenuItem>
                <MenuItem value="Chirurgie">Chirurgie</MenuItem>
                <MenuItem value="Cardiologie">Cardiologie</MenuItem>
              </Select>
              {errors.departement && (
                <Typography color="error">Ce champ est obligatoire</Typography>
              )}
            </FormControl>
          ) : null}

          {category === "patients" ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack sx={{ width: "49%", minWidth: "460px", flexGrow: 1 }}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Date de Rendez-vous"
                  value={rendezVous} // Directly use rendezVous without validity check
                  onChange={(newDate) => handleDateChange(newDate)}
                  // @ts-ignore
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={formattedDate} // Display the formatted date
                      variant="outlined"
                      focused={false}
                      color="secondary"
                    />
                  )}
                  slots={{
                    openPickerIcon: EditCalendarRoundedIcon, // Custom picker icon
                    openPickerButton: StyledButton, // Custom button for the picker
                  }}
                  slotProps={{
                    openPickerIcon: { fontSize: "large" },
                    openPickerButton: { color: "secondary" },
                    textField: {
                      variant: "outlined",
                      focused: false,
                      color: "secondary",
                    },
                  }}
                />
              </Stack>
            </LocalizationProvider>
          ) : null}

          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            type="file"
            fullWidth
            variant="outlined"
            label="Photo"
            error={Boolean(errors.image)}
            helperText={errors.image ? "Ce champ est obligatoire" : null}
            {...register("image", {
              validate: (value) => {
                // Only validate if a file is selected
                if (value && value.length > 0) {
                  return true; // File selected, validation passes
                }
                return true; // No file selected, validation passes (not required)
              },
            })}
          />

          {category === "doctors" || category === "infermiers" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              type="file"
              fullWidth
              variant="outlined"
              label="Fichier PDF"
              error={Boolean(errors.cv)}
              {...register("cv", {
                validate: (value) => {
                  // Only validate if a file is selected
                  if (value && value.length > 0) {
                    // Check if it's a PDF if a file is selected
                    return (
                      value[0]?.type === "application/pdf" ||
                      "Veuillez télécharger un fichier PDF"
                    );
                  }
                  return true; // No file selected, validation passes (not required)
                },
              })}
            />
          ) : null}
        </Stack>

        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "20px", p: "10px 30px", fontSize: "18px" }}
        >
          Ajouter
        </Button>
      </form>
    </Paper>
  );
};

export default Add;
