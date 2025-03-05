import { Box, Button, Link, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Detail = ({ doctorsData }) => {
  const navigate = useNavigate();

  const { id } = useParams(); // Obtenir l'ID du docteur depuis l'URL

  // Convertir l'ID de string en nombre pour qu'il corresponde à doctor.id
  const doctorId = Number(parseInt(id, 10));

  // Trouver le docteur par ID
  const doctor = doctorsData.find(
    (doctor) => String(doctor.id) === String(doctorId)
  );

  return (
    <Paper
      sx={{
        position: "relative",
        p: "58px",
        mx: "auto",
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
            width: "fit-content",
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mb: "50px",
            pb: "5px",
            textTransform: "capitalize",
            borderBottom: "1px solid gray",
          }}
        >
          Plus d'informations sur Dr.{doctor.nom} {doctor.prenom}
        </Typography>
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
        }}
      >
        {/* Afficher l'image dynamique du docteur */}
        <Paper
          variant="outlined"
          sx={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          {/* Chemin dynamique pour l'image du docteur */}
          <img
            style={{ width: "100%", height: "100%", boxShadow: "12" }}
            src={`/images/${doctor.image}`} // Chemin d'image dynamique basé sur le docteur
            alt={`${doctor.nom} ${doctor.prenom}`}
          />
        </Paper>

        <Box>
          <ul
            style={{
              listStyle: "disc",
              gap: "18px",
              fontSize: "26px",
              textTransform: "capitalize",
            }}
          >
            <li>Nom: {doctor.nom}</li>
            <li>Prénom: {doctor.prenom}</li>
            <li>Age: {doctor.age}</li>
            <li>Email: {doctor.email}</li>
            <li>N° téléphone: {doctor.numero_Tele}</li>
            <li>Adresse: {doctor.adress}</li>
            <li>Statut: {doctor.statut}</li>
            <li>Département: {doctor.departement}</li>
            <li>Salaire: {doctor.salary}</li>
            <li>
              CV:
              <Link href={`./CVs/${doctor.cv}.pdf`} download="cv.pdf">
                Download CV
              </Link>
            </li>
          </ul>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Detail;
