import React, { useEffect, useState } from "react";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import BorderColorOutlined from "@mui/icons-material/BorderColorOutlined";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Styled table cell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Styled table row
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Patients = ({ patientsData, deletePatient }) => {
  const category = "patients";

  const theme = useTheme();
  const navigate = useNavigate();
  const [isPatientDelete, setIsPatientDelete] = useState(false);

  // Function to handle patient  deletion
  const handleDeletePat = (ID) => {
    setIsPatientDelete(true);

    deletePatient(ID);
  };

  useEffect(() => {
    if (isPatientDelete) {
      navigate("/patients"); // Navigate after deletion
      console.log("patient deleted");
    }
  }, [isPatientDelete, navigate]);

  return (
    <>
      {/* Header Section */}
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          p: "30px",
        }}
      >
        <Typography variant="h1">Liste des Patients</Typography>
        <Button
          onClick={() => navigate(`/add/${category}`)} // Redirect to Add page
          sx={{
            p: "12px 18px",
            display: "flex",
            gap: "12px",
            bgcolor: theme.palette.secondary.light,
          }}
          variant="contained"
        >
          <AddCircleOutlineOutlined /> Ajouter un Patient
        </Button>
      </Stack>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table sx={{ textAlign: "center" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Nom</StyledTableCell>
              <StyledTableCell align="center">Prénom</StyledTableCell>
              <StyledTableCell align="center">PB</StyledTableCell>
              <StyledTableCell align="center">N° Téléphone</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Adresse</StyledTableCell>
              <StyledTableCell align="center">doctor traitant</StyledTableCell>
              <StyledTableCell align="center">
                prochaine rendez-vous
              </StyledTableCell>
              <StyledTableCell align="center">Opérations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientsData.length > 0 ? (
              patientsData.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.nom}</StyledTableCell>
                  <StyledTableCell align="center">{row.prenom}</StyledTableCell>
                  <StyledTableCell align="center">{row.pb}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.numero_Tele}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">{row.age}</StyledTableCell>
                  <StyledTableCell align="center">{row.adress}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.doctor_traitant}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.rendezVous}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      onClick={() => navigate(`/detail/${row.id}/${category}`)} // Use backticks for template literals
                      sx={{ color: theme.palette.info.light }}
                    >
                      <RemoveRedEyeOutlined />
                    </Button>

                    <Button
                      onClick={() => navigate(`/update/${row.id}/${category}`)}
                    >
                      <BorderColorOutlined
                        sx={{ color: theme.palette.success.light }}
                      />
                    </Button>

                    <Button onClick={() => handleDeletePat(row.id)}>
                      <DeleteForeverOutlined
                        sx={{ color: theme.palette.error.light }}
                      />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={10} align="center">
                  Aucun patient disponible
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Patients;
