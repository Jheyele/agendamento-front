import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import BookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext'

function Header() {
  const navigate = useNavigate();
  const { logout, token } = useContext(AuthContext);

  const handleLogout = async () => {
    logout();
    navigate("/")
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#4a148c" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <BookIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Sistema de Agendamentos
          </Typography>
        </Box>

        <Box>
          <Button color="inherit" onClick={() => navigate("/home")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/usuarios")}>
            Usuários
          </Button>
          <Button color="inherit" onClick={() => navigate("/agendamentos")}>
            Agendamentos
          </Button>
          {token && (
            <Button color="inherit" onClick={handleLogout}>
              Sair
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
