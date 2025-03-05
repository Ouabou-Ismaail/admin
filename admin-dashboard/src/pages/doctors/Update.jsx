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

const Update = ({ doctorsData, setDoctorsData }) => {
  const navigate = useNavigate();
  const [isDoctorEdited, setIsDoctorEdited] = useState(false);
  const theme = useTheme();
  const { id } = useParams();

  // Convertir l'ID de string en nombre pour qu'il corresponde à doctor.id
  const doctorId = Number(parseInt(id, 10));

  // Trouver le docteur par ID
  const doctor = doctorsData.find(
    (doctor) => String(doctor.id) === String(doctorId)
  );

  // Utilisation de react-hook-form pour l'état du formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Fonction pour définir la valeur dans le formulaire
  } = useForm();

  // Remplir les champs du formulaire avec les valeurs du médecin
  useEffect(() => {
    if (doctor) {
      setValue("id", doctor.id);
      setValue("nom", doctor.nom);
      setValue("prenom", doctor.prenom);
      setValue("email", doctor.email);
      setValue("numero_Tele", doctor.numero_Tele);
      setValue("pb", doctor.pb);
      setValue("age", doctor.age);
      setValue("statut", doctor.statut);
      setValue("gender", doctor.gender);
      setValue("salary", doctor.salary);
      setValue("departement", doctor.departement);
      setValue("adress", doctor.adress);
    }
  }, [doctor, setValue]);

  // Fonction de soumission du formulaire
  const onSubmit = (data) => {
    const updatedDoctor = {
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
      cv: data.cv ? data.cv[0]?.name : doctor.cv, // Assuming cv is a file input
      image: data.image ? data.image[0]?.name : doctor.image, // Assuming image is a file input
    };

    // Mettre à jour la liste des médecins
    const updatedDoctorsData = doctorsData.map((d) => {
      return String(d.id) === String(doctorId) ? updatedDoctor : d;
    });

    setDoctorsData(updatedDoctorsData);
    localStorage.setItem("donneesDoctors", JSON.stringify(updatedDoctorsData));

    //  console.log(updatedDoctorsData);

    setIsDoctorEdited(true);
  };

  useEffect(() => {
    if (isDoctorEdited) {
      // Wait for a brief moment before navigating
      const timer = setTimeout(() => {
        navigate("/doctors");
      }, 300);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [isDoctorEdited, navigate]);

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
              navigate("/doctors");
            }, 700)
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
          modifier les donnees de:
          <span style={{ fontWeight: "bold" }}>
            Dr. {doctor.nom} {doctor.prenom}
          </span>
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
            defaultValue={doctor.id}
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
            defaultValue={doctor.nom}
            error={Boolean(errors.nom)}
            helperText={errors.nom ? "Ce champ est obligatoire" : null}
            {...register("nom", { required: true })}
          />

          {/* Prénom Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Prénom*"
            variant="outlined"
            defaultValue={doctor.prenom}
            error={Boolean(errors.prenom)}
            helperText={errors.prenom ? "Ce champ est obligatoire" : null}
            {...register("prenom", { required: true })}
          />

          {/* Email Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Email*"
            variant="outlined"
            defaultValue={doctor.email}
            error={Boolean(errors.email)}
            helperText={errors.email ? "Ce champ est obligatoire" : null}
            {...register("email", { required: true })}
          />

          {/* Phone Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="N° Téléphone*"
            variant="outlined"
            defaultValue={doctor.numero_Tele}
            error={Boolean(errors.numero_Tele)}
            helperText={errors.numero_Tele ? "Ce champ est obligatoire" : null}
            {...register("numero_Tele", { required: true })}
          />

          {/* CIN Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="CIN*"
            variant="outlined"
            defaultValue={doctor.pb}
            error={Boolean(errors.pb)}
            helperText={errors.pb ? "Ce champ est obligatoire" : null}
            {...register("pb", { required: true })}
          />

          {/* Age Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Age*"
            variant="outlined"
            defaultValue={doctor.age}
            error={Boolean(errors.age)}
            helperText={errors.age ? "Ce champ est obligatoire" : null}
            {...register("age", { required: true })}
          />

          {/* Status Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Statut*"
            variant="outlined"
            defaultValue={doctor.statut}
            error={Boolean(errors.statut)}
            helperText={errors.statut ? "Ce champ est obligatoire" : null}
            {...register("statut", { required: true })}
          />

          {/* Gender Select */}
          <FormControl sx={{ minWidth: "400px", width: "49%", flexGrow: 1 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              {...register("gender", { required: true })}
              label="Genre"
              defaultValue={doctor.gender}
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
            defaultValue={doctor.adress}
            error={Boolean(errors.adress)}
            helperText={errors.adress ? "Ce champ est obligatoire" : null}
            {...register("adress", { required: true })}
          />

          {/* Salary Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Salaire"
            variant="outlined"
            defaultValue={doctor.salary}
            error={Boolean(errors.salary)}
            helperText={errors.salary ? "Ce champ est obligatoire" : null}
            {...register("salary", { required: true })}
          />

          {/* Department Select */}
          <FormControl sx={{ minWidth: "400px", width: "49%", flexGrow: 1 }}>
            <InputLabel>Département</InputLabel>
            <Select
              {...register("departement", { required: true })}
              label="Département"
              defaultValue={doctor.departement}
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

          {/* Image Input */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            type="file"
            {...register("image")}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            variant="outlined"
            label="Photo"
          />

          {/* CV Input */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            type="file"
            {...register("cv", {
              required: "Ce champ est obligatoire",
              validate: {
                isPdf: (value) =>
                  value[0]?.type === "application/pdf" ||
                  "Veuillez télécharger un fichier PDF",
              },
            })}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            variant="outlined"
            label="Fichier PDF"
            error={Boolean(errors.cv)}
            helperText={errors.cv ? "Ce champ est obligatoire" : null}
          />
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
