import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const criarUsuario = async (dados) => {
  try {
    const response = await api.post(`/usuario`, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const atualizarUsuario = async (dados, id) => {
  try {
    const response = await api.put(`/usuario/${id}`, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const buscarUsuarios = async () => {
  try {
    const response = await api.get(`/usuarios`);
    // const response = await api.get(`/usuarios`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export const buscarUsuario = async (id) => {
  try {
    const response = await api.get(`/usuario/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export const excluirUsuario = async (id) => {
  try {
    const response = await api.delete(`/usuario/${id}`);
    return response.status === 204;
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
};


export const criarAgendamento = async (dados) => {
  try {
    const response = await api.post(`/agendamento`, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    throw error;
  }
};

export const buscarAgendamentos = async () => {
  try {
    const response = await api.get(`/agendamentos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    throw error;
  }
};

export const excluirAgendamento = async (id) => {
  try {
    await api.delete(`/agendamento/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao excluir agendamento:", error);
    throw error;
  }
};

export const buscarAgendamentosEUsuarios = async () => {
  try {
    const agendamentos = await api.get(`/agendamentos`);

    return agendamentos.data;
  } catch (error) {
    console.error("Erro ao buscar agendamentos e usuários:", error);
    throw error;
  }
};

export const login = async (dados) => {
  try {
    const response = await api.post(`/login`, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao tentar logar:", error);
    throw error;
  }
};