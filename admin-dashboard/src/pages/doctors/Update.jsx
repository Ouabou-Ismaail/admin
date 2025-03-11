// @ts-nocheck
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

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";

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

const Update = ({
  doctorsData,
  setDoctorsData,
  infermiersData,
  setInfermiersData,
  patientsData,
  setPatientsData,
}) => {
  let doctorsName = [];

  doctorsData.forEach((doctor) => {
    doctorsName.push(`${doctor.nom} ${doctor.prenom}`);
  });

  const navigate = useNavigate();
  const [isDoctorEdited, setIsDoctorEdited] = useState(false);
  const [isInfermierEdited, setIsInfermierEdited] = useState(false);
  const [isPatientEdited, setIsPatientEdited] = useState(false);
  const theme = useTheme();
  const { id, category } = useParams();

  // Convertir l'ID de string en nombre pour qu'il corresponde à doctor.id
  const personneId = Number(parseInt(id, 10));

  // Trouver le docteur par ID
  let personne;
  if (category === "doctors") {
    // Recherche de l'employé parmi les docteurs
    personne = doctorsData.find((p) => String(p.id) === String(personneId));
  } else if (category === "infermiers") {
    // Recherche de l'employé parmi les infirmiers
    personne = infermiersData.find((p) => String(p.id) === String(personneId));
  } else if (category === "patients") {
    // Recherche de l'employé parmi les infirmiers
    personne = patientsData.find((p) => String(p.id) === String(personneId));
  }

  // Vérifier si l'employé existe
  if (!personne) {
    console.error("Employé non trouvé pour l'ID:", personneId);
  } else {
    console.log("Employé trouvé:", personneId);
  }

  // Utilisation de react-hook-form pour l'état du formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Fonction pour définir la valeur dans le formulaire
  } = useForm();

  // Remplir les champs du formulaire avec les valeurs du patients
  useEffect(() => {
    if (personne && category === "patients") {
      setValue("id", personne.id);
      setValue("nom", personne.nom);
      setValue("prenom", personne.prenom);
      setValue("email", personne.email);
      setValue("numero_Tele", personne.numero_Tele);
      setValue("pb", personne.pb);
      setValue("age", personne.age);
      setValue("rendezVous", personne.rendezVous);
      setValue("doctor_traitant", personne.doctor_traitant);
      setValue("statut", personne.statut);
      setValue("gender", personne.gender);
      setValue("adress", personne.adress);
    } else if (personne) {
      setValue("id", personne.id);
      setValue("nom", personne.nom);
      setValue("prenom", personne.prenom);
      setValue("email", personne.email);
      setValue("numero_Tele", personne.numero_Tele);
      setValue("pb", personne.pb);
      setValue("age", personne.age);
      setValue("statut", personne.statut);
      setValue("gender", personne.gender);
      setValue("salary", personne.salary);
      setValue("departement", personne.departement);
      setValue("adress", personne.adress);
    }
    console.log(personne);
  }, [personne, setValue]);

  // Fonction de soumission du formulaire
  const onSubmit = (data) => {
    let updatedPersonne;

    if (category === "patients") {
      updatedPersonne = {
        id: data.id,
        nom: data.nom,
        prenom: data.prenom,
        pb: data.pb,
        age: data.age,
        numero_Tele: data.numero_Tele,
        email: data.email,
        adress: data.adress,
        statut: data.statut,
        rendezVous: data.rendezVous,
        gender: data.gender,
        doctor_traitant: data.doctor_traitant,
        cv: data.cv ? data.cv[0]?.name : personne.cv, // Assuming cv is a file input
        image: data.image ? data.image[0]?.name : personne.image, // Assuming image is a file input
      };
    } else {
      updatedPersonne = {
        id: data.id,
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
        cv: data.cv ? data.cv[0]?.name : personne.cv, // Assuming cv is a file input
        image: data.image ? data.image[0]?.name : personne.image, // Assuming image is a file input
      };
    }

    console.log(updatedPersonne);

    if (category === "doctors") {
      // Mettre à jour la liste des médecins
      const updatedDoctorsData = doctorsData.map((d) => {
        return String(d.id) === String(personneId) ? updatedEmploye : d;
      });

      setDoctorsData(updatedDoctorsData);
      localStorage.setItem(
        "donneesDoctors",
        JSON.stringify(updatedDoctorsData)
      );

      //  console.log(updatedDoctorsData);

      setIsDoctorEdited(true);
    } else if (category === "infermiers") {
      // Mettre à jour la liste des infermiers
      const updatedInfermierData = infermiersData.map((inf) => {
        return String(inf.id) === String(personneId) ? updatedPersonne : inf;
      });

      setInfermiersData(updatedInfermierData);
      localStorage.setItem(
        "donneesInfermiers",
        JSON.stringify(updatedInfermierData)
      );

      setIsInfermierEdited(true);
    } else if (category === "patients") {
      // Mettre à jour la liste des infermiers
      const updatedPatientData = patientsData.map((pat) => {
        return String(pat.id) === String(personneId) ? updatedPersonne : pat;
      });

      setPatientsData(updatedPatientData);
      localStorage.setItem(
        "donneesPatients",
        JSON.stringify(updatedPatientData)
      );

      //  console.log(updatedDoctorsData);

      setIsPatientEdited(true);
    }
  };

  useEffect(() => {
    if (isDoctorEdited || isInfermierEdited || isPatientEdited) {
      // Wait for a brief moment before navigating
      const timer = setTimeout(() => {
        navigate(`/${category}`);
      }, 300);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [isDoctorEdited, isInfermierEdited, isPatientEdited, navigate]);

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
      <Stack>
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
          variant="h2"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "50px",
            pb: "5px",
            textTransform: "capitalize",
            width: "fit-content",
            mx: "auto",
            borderBottom: "1px solid gray",
            gap: "8px",
          }}
        >
          {category === "doctors"
            ? `modifier les donnees de:
            Dr. ${personne.nom} ${personne.prenom} `
            : `modifier les donnees de l'infermier:
             ${personne.nom} ${personne.prenom} `}
        </Typography>
      </Stack>

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
          {/* ID Field (Read-only for update) */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="ID*"
            variant="outlined"
            defaultValue={personne.id}
            error={Boolean(errors.id)}
            helperText={errors.id ? "Ce champ est obligatoire" : null}
            {...register("id", { required: true })}
            disabled
          />

          {/* Nom Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Nom*"
            variant="outlined"
            defaultValue={personne.nom}
            error={Boolean(errors.nom)}
            helperText={errors.nom ? "Ce champ est obligatoire" : null}
            {...register("nom", { required: true })}
          />

          {/* Prénom Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Prénom*"
            variant="outlined"
            defaultValue={personne.prenom}
            error={Boolean(errors.prenom)}
            helperText={errors.prenom ? "Ce champ est obligatoire" : null}
            {...register("prenom", { required: true })}
          />

          {/* Email Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Email*"
            variant="outlined"
            defaultValue={personne.email}
            error={Boolean(errors.email)}
            helperText={errors.email ? "Ce champ est obligatoire" : null}
            {...register("email", { required: true })}
          />

          {/* Phone Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="N° Téléphone*"
            variant="outlined"
            defaultValue={personne.numero_Tele}
            error={Boolean(errors.numero_Tele)}
            helperText={errors.numero_Tele ? "Ce champ est obligatoire" : null}
            {...register("numero_Tele", { required: true })}
          />

          {/* CIN Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="CIN*"
            variant="outlined"
            defaultValue={personne.pb}
            error={Boolean(errors.pb)}
            helperText={errors.pb ? "Ce champ est obligatoire" : null}
            {...register("pb", { required: true })}
          />

          {/* Age Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Age*"
            variant="outlined"
            defaultValue={personne.age}
            error={Boolean(errors.age)}
            helperText={errors.age ? "Ce champ est obligatoire" : null}
            {...register("age", { required: true })}
          />

          {/* Status Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Statut*"
            variant="outlined"
            defaultValue={personne.statut}
            error={Boolean(errors.statut)}
            helperText={errors.statut ? "Ce champ est obligatoire" : null}
            {...register("statut", { required: true })}
          />

          {/* le prochaine rendez-vous */}
          {category === "patients" ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                sx={{ width: "49%", minWidth: "460px", flexGrow: 1 }}
                components={["DatePicker"]}
              >
                <DatePicker
                  sx={{ width: "100%" }}
                  label="le prochaine rendez-vous"
                  slots={{
                    openPickerIcon: EditCalendarRoundedIcon,
                    openPickerButton: StyledButton,
                    day: StyledDay,
                  }}
                  slotProps={{
                    openPickerIcon: { fontSize: "large" },
                    openPickerButton: { color: "secondary" },
                    textField: {
                      defaultValue: dayjs(personne.rendezVous),
                      variant: "outlined",
                      focused: false,
                      color: "secondary",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          ) : null}

          {/* Gender Select */}

          <FormControl sx={{ minWidth: "400px", width: "49%", flexGrow: 1 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              {...register("gender", { required: true })}
              label="Genre"
              defaultValue={personne.gender}
              error={Boolean(errors.gender)}
            >
              <MenuItem value="homme">Homme</MenuItem>
              <MenuItem value="femme">Femme</MenuItem>
            </Select>
            {errors.gender && (
              <Typography color="error">Ce champ est obligatoire</Typography>
            )}
          </FormControl>

          {/* Address Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Adresse"
            variant="outlined"
            defaultValue={personne.adress}
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
                defaultValue={personne.doctor_traitant}
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

          {/* Image Input */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            type="file"
            fullWidth
            variant="outlined"
            label="Photo"
          />

          {/* CV Input */}

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

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{ p: "4px 25px", textTransform: "capitalize", fontSize: "22px" }}
        >
          Modifier
        </Button>
      </form>
    </Paper>
  );
};

export default Update;
