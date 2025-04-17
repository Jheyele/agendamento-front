import {
    Avatar,
    Box,
    IconButton,
    Paper,
    Stack,
    Typography,
    Tooltip,
    TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarUsuarios, excluirUsuario } from "../services/apiService";

function UsuarioLista() {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState("");
    const navigate = useNavigate();

    const buscarListaUsuarios = async () => {
        try {
            const response = await buscarUsuarios();
            setUsuarios(response);
        } catch (error) {
            console.log("Erro ao buscar usuários");
        }
    };

    const deletarUsuario = async (id) => {
        try {
            const response = await excluirUsuario(id);
            if (response) {
                setUsuarios(usuarios.filter(u => u.id !== id));
            }
        } catch (error) {
            console.log("Erro ao excluir usuário");
        }
    };

    useEffect(() => {
        buscarListaUsuarios();
    }, []);

    const usuariosFiltro = usuarios.filter((u) =>
        [u.nome, u.email, u.telefone].some((campo) =>
            campo.toLowerCase().includes(filtro.toLowerCase())
        )
    );

    return (
        <Box p={4}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Lista de Usuários</Typography>
                <Tooltip title="Cadastrar novo usuário">
                    <IconButton color="primary" onClick={() => navigate("/cadastro-usuario")}>
                        <PersonAddIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <TextField
                    placeholder="Pesquise..."
                    fullWidth
                    margin="normal"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    required
                    />

            {usuariosFiltro.map((usuario) => (
                <Paper
                    key={usuario.id}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        boxShadow: 3,
                        transition: "0.3s",
                        "&:hover": {
                            boxShadow: 6,
                            backgroundColor: "#f9f9f9"
                        }
                    }}
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                            alt={usuario.nome}
                            src={usuario.foto_url || "https://via.placeholder.com/150"}
                            sx={{ width: 64, height: 64 }}
                        />
                        <Box>
                            <Typography variant="h6">{usuario.nome}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {usuario.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {usuario.telefone}
                            </Typography>
                        </Box>
                    </Box>

                    <Stack direction="row" spacing={1}>
                        <Tooltip title="Editar">
                            <IconButton color="primary" onClick={() => navigate(`/edicao-usuario/${usuario.id}`)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                            <IconButton color="error" onClick={() => deletarUsuario(usuario.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Paper>
            ))}
        </Box>
    );
}

export default UsuarioLista;
