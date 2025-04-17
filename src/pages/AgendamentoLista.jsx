import {
    Box,
    Typography,
    Paper,
    IconButton,
    Stack,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EventAvailableIcon from "@mui/icons-material/EventAvailable";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  function AgendamentoLista() {
    const [agendamentos, setAgendamentos] = useState([]);
    const navigate = useNavigate();
  
    const buscarAgendamentosComUsuarios = async () => {
      try {
        const [agendamentosRes, usuariosRes] = await Promise.all([
          axios.get("http://localhost:8080/agendamentos"),
          axios.get("http://localhost:8080/usuarios"),
        ]);
  
        const usuariosMap = {};
        usuariosRes.data.forEach((u) => {
          usuariosMap[u.id] = u.nome;
        });
  
        const agendamentosComNomes = agendamentosRes.data.map((a) => ({
          ...a,
          nomeUsuario: usuariosMap[a.usuario_id] || "Não informado",
        }));
  
        setAgendamentos(agendamentosComNomes);
      } catch (error) {
        console.error("Erro ao buscar agendamentos ou usuários:", error);
      }
    };
  
    const excluirAgendamento = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/agendamento/${id}`);
        setAgendamentos((prev) => prev.filter((a) => a.id !== id));
      } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
      }
    };
  
    useEffect(() => {
      buscarAgendamentosComUsuarios();
    }, []);
  
    return (
      <Box p={4}>
        <Typography variant="h4" mb={3}>
          Lista de Agendamentos
        </Typography>
  
        <IconButton
          color="primary"
          onClick={() => navigate("/cadastro-agendamento")}
          sx={{ mb: 2 }}
        >
          <EventAvailableIcon />
        </IconButton>
  
        {agendamentos.length === 0 && (
          <Typography color="text.secondary">Nenhum agendamento encontrado.</Typography>
        )}
  
        {agendamentos.map((agendamento) => (
          <Paper
            key={agendamento.id}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography>Data/Hora: {new Date(agendamento.data_hora).toLocaleString()}</Typography>
              <Typography>Descrição: {agendamento.descricao || "Sem descrição"}</Typography>
              <Typography>Usuário: {agendamento.nomeUsuario}</Typography>
            </Box>
  
            <Stack direction="row">
              <IconButton color="error" onClick={() => excluirAgendamento(agendamento.id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Paper>
        ))}
      </Box>
    );
  }
  
  export default AgendamentoLista;
  