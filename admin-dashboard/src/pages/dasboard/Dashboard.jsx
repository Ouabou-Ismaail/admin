import { Box, Link, Paper, Typography } from "@mui/material";
import "../../theme";
import VaccinesOutlined from "@mui/icons-material/VaccinesOutlined";
import { styled, useTheme } from "@mui/material/styles";

const Dashboard = () => {
  const theme = useTheme();

  const dashboardData = [
    {
      category: "total doctors",
      number: 12,
      path: "/employes",
      icon: VaccinesOutlined,

      color: theme.palette.info.light,
    },
    {
      category: "total infermiers",
      number: 33,
      path: "/employes",
      icon: VaccinesOutlined,

      color: theme.palette.info.light,
    },
    {
      category: "total departements",
      number: 5,
      path: "/employes",
      icon: VaccinesOutlined,

      color: theme.palette.info.light,
    },
    {
      category: "total chambres",
      number: 40,
      path: "/employes",
      icon: VaccinesOutlined,

      color: theme.palette.info.light,
    },
    {
      category: "total lits",
      number: 200,
      path: "/employes",
      icon: VaccinesOutlined,

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
        <a
          style={{ width: "49%", minWidth: "600px", textDecoration: "none" }}
          href="/employes"
        >
          <Paper
            key={item.category}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: "18px",
              borderRadius: "8px",
              textAlign: "center",
              transition: "0.4s",
              gap: "10px",
              flexGrow: 1,
              ":hover": {
                scale: "1.02",
              },
            }}
            elevation={4}
          >
            <item.icon sx={{ fontSize: "50px", mx: "auto", mb: "12px" }} />
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
          </Paper>
        </a>
      ))}
    </Box>
  );
};

export default Dashboard;
