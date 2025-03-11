// dashboard.jsx

import { Box, Button, Link, Paper, Typography } from "@mui/material";
import "../../theme";
import VaccinesOutlined from "@mui/icons-material/VaccinesOutlined";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ doctorsData, infermiersData, patientsData }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const dashboardData = [
    {
      category: "total doctors",
      number: doctorsData.length,
      path: "/doctors",
      icon: "/images/doctor.png",
    },
    {
      category: "total infermiers",
      number: infermiersData.length,
      path: "/infermiers",
      icon: "/images/infermiere.png",
    },
    {
      category: "total patients",
      number: patientsData.length,
      path: "/patients",
      icon: "/images/patient.png",
    },
    {
      category: "total departements",
      number: 0,
      path: "/departements",
      icon: "/images/departement.png",
    },
    {
      category: "total lits",
      number: 0,
      path: "/lits",
      icon: "/images/lit.png",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        width: "100%",
      }}
    >
      {dashboardData.map((item) => (
        <Paper
          key={item.category}
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            width: "49%",
            minWidth: "600px",
            textDecoration: "none",
            p: "34px",
            borderRadius: "12px",
            flexGrow: 1,
          }}
          elevation={4}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100px",
                height: "100px",
              }}
            >
              <img
                style={{ width: "100%", height: "100%", color: "white" }}
                src={item.icon}
              />
            </Box>

            <Typography
              sx={{
                fontSize: "30px",
                color: item.color,
                textTransform: "capitalize",
                transition: "0.4s",
                ":hover": {
                  scale: "1.02",
                },
                // @ts-ignore
                color: theme.palette.info.light,
              }}
            >
              {item.category}
            </Typography>

            <Typography sx={{ fontSize: "30px", ml: "12px" }}>
              {item.number}
            </Typography>
          </Box>

          <Button
            sx={{
              position: "absolute",
              bottom: "35px",
              right: "35px",
              height: "fit-content",
              background: theme.palette.success.light,
            }}
            variant="contained"
            onClick={() => {
              navigate(item.path);
            }}
          >
            plus de detail
          </Button>
        </Paper>
      ))}
    </Box>
  );
};

export default Dashboard;
