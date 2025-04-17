import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        padding: 2,
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Aplicação — Todos os direitos reservados.
      </Typography>
    </Box>
  );
}

export default Footer;
