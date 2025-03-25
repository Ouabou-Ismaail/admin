import React, { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Typography,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
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

const Departement = ({ departementsData, deleteDepartement }) => {
  const category = "departements";

  const theme = useTheme();
  const navigate = useNavigate();
  const [isDepartementDelete, setIsDepartementDelete] = useState(false);

  // Function to handle infermier deletion
  const handleDeleteDep = (ID) => {
    setIsDepartementDelete(true);

    deleteDepartement(ID);
  };

  useEffect(() => {
    if (isDepartementDelete) {
      navigate("/departements"); // Navigate after deletion
      console.log("departements deleted");
    }
  }, [isDepartementDelete, navigate]);

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
        <Typography variant="h1">Liste des {category}</Typography>
        <Button
          onClick={() => navigate(`/add/${category}`)} // Redirect to Add page
          sx={{
            p: "12px 18px",
            display: "flex",
            gap: "12px",
            bgcolor: theme.palette.info.light,
          }}
          variant="contained"
        >
          <AddCircleOutlineOutlined /> Ajouter un{" "}
          {category.substring(0, category.length - 1)}
        </Button>
      </Stack>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table sx={{ textAlign: "center" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Nom</StyledTableCell>
              <StyledTableCell align="center">Total Doctors</StyledTableCell>
              <StyledTableCell align="center">Total Infermiers</StyledTableCell>
              <StyledTableCell align="center">Total Patients</StyledTableCell>
              <StyledTableCell align="center">Opérations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departementsData.length > 0 ? (
              departementsData.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.nom}</StyledTableCell>

                  <StyledTableCell align="center">{row.totDoc}</StyledTableCell>
                  <StyledTableCell align="center">{row.totInf}</StyledTableCell>
                  <StyledTableCell align="center">{row.totPat}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      onClick={() => navigate(`/update/${row.id}/${category}`)}
                    >
                      <BorderColorOutlined
                        sx={{ color: theme.palette.success.light }}
                      />
                    </Button>

                    <Button onClick={() => handleDeleteDep(row.id)}>
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
                  Aucun {category.substring(0, category.length - 1)} disponible
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Departement;
