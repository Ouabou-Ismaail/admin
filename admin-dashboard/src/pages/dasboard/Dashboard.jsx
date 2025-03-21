// dashboard.jsx

import { Box, Button, Link, Paper, Typography } from "@mui/material";
import "../../theme";
import VaccinesOutlined from "@mui/icons-material/VaccinesOutlined";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ doctorsData }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const dashboardData = [
    {
      category: "total doctors",
      number: doctorsData.length,
      path: "/doctors",
      icon: "/images/doctor.png",

      color: theme.palette.info.light,
    },
    {
      category: "total infermiers",
      number: 33,
      path: "/infermiers",
      icon: "/images/infermiere.png",
      color: theme.palette.info.light,
    },
    {
      category: "total departements",
      number: 5,
      path: "/departements",
      icon: "/images/departement.png",

      color: theme.palette.info.light,
    },
    {
      category: "total lits",
      number: 40,
      path: "/lits",
      icon: "/images/lit.png",
      color: theme.palette.info.light,
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
          }}
          elevation={4}
        >
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                mx: "auto",
                width: "90px",
                height: "90px",
              }}
            >
              <img style={{ width: "100%", height: "100%" }} src={item.icon} />
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
              }}
            >
              {item.category}
            </Typography>

            <Typography sx={{ fontSize: "30px" }}>{item.number}</Typography>
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
