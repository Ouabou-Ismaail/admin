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
import { ArrowBackOutlined } from "@mui/icons-material";

const Add = ({ addDoctor }) => {
  const theme = useTheme();

  // Utilisation de react-hook-form pour l'état du formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [isDoctorAdded, setIsDoctorAdded] = useState(false); // Track doctor addition

  // Fonction de soumission du formulaire
  const onSubmit = (data) => {
    const newDoctor = {
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
      cv: data.cv ? data.cv[0].name : null, // Assuming cv is a file input
      image: data.image ? data.image[0].name : null, // Assuming image is a file input
    };

    // Appeler la fonction addDoctor pour ajouter le médecin
    addDoctor(newDoctor);
    console.log(newDoctor); // Afficher le nouveau médecin dans la console (facultatif)
    setIsDoctorAdded(true);
  };

  // UseEffect to handle navigation after doctor is added
  useEffect(() => {
    if (isDoctorAdded) {
      // Wait for a brief moment before navigating
      const timer = setTimeout(() => {
        navigate("/doctors");
      }, 600);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [isDoctorAdded, navigate]);

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
            navigate("/doctors");
          }, 700)
        }
      >
        <ArrowBackOutlined />
      </Button>
      <Typography variant="h2" sx={{ textTransform: "capitalize", pt: "20px" }}>
        Ajouter un nouveau médecin
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
            variant="outlined"
            error={Boolean(errors.id)}
            helperText={errors.id ? "Ce champ est obligatoire" : null}
            {...register("id", { required: true })}
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

          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="statut*"
            variant="outlined"
            error={Boolean(errors.statut)}
            helperText={errors.statut ? "Ce champ est obligatoire" : null}
            {...register("statut", { required: true })}
          />

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

          {/* Champ de salaire */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="salary"
            variant="outlined"
            error={Boolean(errors.salary)}
            helperText={errors.salary ? "Ce champ est obligatoire" : null}
            {...register("salary", { required: true })}
          />

          {/* Sélecteur de département */}
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

          {/* Champ de téléchargement d'image */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            type="file"
            {...register("image", { required: true })}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            variant="outlined"
            label="Photo"
            error={Boolean(errors.image)}
            helperText={errors.image ? "Ce champ est obligatoire" : null}
          />

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
            helperText={errors.cv ? errors.pdfFile.message : null}
          />
        </Stack>

        <Button
          type="submit"
          variant="contained"
          sx={{ p: "4px 25px", textTransform: "capitalize", fontSize: "22px" }}
        >
          Ajouter un médecin
        </Button>
      </form>
    </Paper>
  );
};

export default Add;
