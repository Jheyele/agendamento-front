import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atualizarUsuario, buscarUsuario, criarUsuario } from "../services/apiService";

function UsuarioForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setErroSenha("As senhas não coincidem.");
      return;
    }

    try {
      const data = {
        nome,
        email,
        telefone,
        senha,
      };

      if(id){
        await atualizarUsuario(data, id);
      } else {
        await criarUsuario(data);
      }

      navigate("/usuarios");
    } catch (error) {
      console.log("Erro ao salvar usuário");
    }
  };

  const buscarUsuarioPorId = async () => {
    if(id) {
      const usuario = await buscarUsuario(id);
      setNome(usuario.nome);
      setEmail(usuario.email);
      setTelefone(usuario.telefone);
    }
  }

  useEffect(() => {
    buscarUsuarioPorId()
  },[])

  return (
    <Box p={4} maxWidth={500} margin="auto">
      <Typography variant="h4" mb={2}>
        {id ? "Editar Usuário" : "Cadastro de Usuários"}
      </Typography>

      <form onSubmit={submit}>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Telefone"
          fullWidth
          margin="normal"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <TextField
          label="Confirmar Senha"
          type="password"
          fullWidth
          margin="normal"
          value={confirmarSenha}
          onChange={(e) => {
            setConfirmarSenha(e.target.value);
            setErroSenha("");
          }}
          error={!!erroSenha}
          helperText={erroSenha}
          required
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Salvar
        </Button>
      </form>
    </Box>
  );
}

export default UsuarioForm;
