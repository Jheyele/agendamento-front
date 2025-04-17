import { Box, Button, Grid, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 4,
      }}
    >
      <Grid container spacing={4} alignItems="center" maxWidth="lg">
        <Grid item xs={12} md={6}>
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Sistema de Agendamentos
            </Typography>
            <Typography variant="h6" gutterBottom>
              Organize seus compromissos com facilidade. Crie, edite e visualize agendamentos e usuários de forma prática.
            </Typography>

            <Box mt={4}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate("/agendamentos")}
                sx={{ mr: 2 }}
              >
                Ver Agendamentos
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate("/usuarios")}
              >
                Gerenciar Usuários
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <CalendarMonthIcon sx={{ fontSize: 200, opacity: 0.3 }} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
