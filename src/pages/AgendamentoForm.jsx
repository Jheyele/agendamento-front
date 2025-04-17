import {
    Box,
    Button,
    MenuItem,
    Paper,
    TextField,
    Typography,
  } from "@mui/material";
  import { useContext, useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
import { buscarUsuarios, criarAgendamento } from "../services/apiService";
import { AuthContext } from "../context/AuthContext";
  
  function AgendamentoForm() {
    const navigate = useNavigate();
    const [dataHora, setDataHora] = useState("");
    const [descricao, setDescricao] = useState("");
    // const [usuarioId, setUsuarioId] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const { usuarioId } = useContext(AuthContext);
  
    useEffect(() => {
      const buscarUsuario = async () => {
        try {
          const response = await buscarUsuarios();
          setUsuarios(response);
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      };
      buscarUsuario();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const dados = {
          data: new Date(dataHora).toISOString(),
          descricao,
          usuarioId: parseInt(usuarioId),
        };
        await criarAgendamento(dados);
        navigate("/agendamentos");
      } catch (error) {
        console.error("Erro ao salvar agendamento:", error);
      }
    };
  
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
          <Typography variant="h5" textAlign="center" mb={2}>
            Novo Agendamento
          </Typography>
  
          <form onSubmit={handleSubmit}>
            <TextField
              label="Data e Hora"
              type="datetime-local"
              fullWidth
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              InputLabelProps={{ shrink: true }}
              margin="normal"
              required
            />
  
            <TextField
              label="Descrição"
              fullWidth
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              margin="normal"
            />
  
            {/* <TextField
              select
              label="Usuário"
              fullWidth
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.value)}
              margin="normal"
              required
            >
              {usuarios.map((usuario) => (
                <MenuItem key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </MenuItem>
              ))}
            </TextField> */}
  
            <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
              Salvar
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }
  
  export default AgendamentoForm;
  