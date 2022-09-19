import { AuthCard } from "../components/AuthCard";
import { Template } from "../components/Template";
import { useState } from "react";
import { Box, Button, Divider, TextField } from "@mui/material";

const title = "Reset Password"

export const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <Template title={title}>
      {/* TODO: can you avoid duplication here? */}
      <AuthCard title={title}>
        <TextField
          id="outlined-basic"
          value={email}
          onChange={(change) => setEmail(change.target.value)}
          label="Email"
          variant="outlined"
          sx={{ marginBottom: 1, width: 280 }}
        />
        <Button
          variant="outlined"
          sx={{ width: 280, mb: 2 }}
        >
          Reset
        </Button>
        <Divider sx={{ mb: 3.5, mt: 2, width: 220 }} />
        <Box>
          <Button variant="outlined" sx={{ width: 135, mr: 1 }} href="/login">
            Login
          </Button>
          <Button variant="outlined" sx={{ width: 135 }} href="/register">
            Register
          </Button>
        </Box>
      </AuthCard>
    </Template>
  );
};

export default ResetPassword;
