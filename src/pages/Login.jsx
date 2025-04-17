import {
    Box,Button, Container, TextField, Typography, Paper,
  } from "@mui/material";
import { useContext, useState } from "react";
import { login } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const { sign } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro("");
    
        try {
          const response = await login({ email, senha });
          sign(response);
          navigate("/home")
        } catch (error) {
          setErro("Credenciais inválidas");
        }
      };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                Login
                </Typography>

                <Box component="form" onSubmit={handleLogin} noValidate>
                    <TextField
                        label="E-mail"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    {erro && (
                        <Typography color="error" sx={{ mt: 1 }}>
                        {erro}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, py: 1.5 }}
                    >
                        Entrar
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;