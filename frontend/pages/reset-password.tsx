import { AuthCard } from "../components/AuthCard";
import { Template } from "../components/Template";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

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
          sx={{ marginBottom: 1, width: 270 }}
        />
        <Button
            variant="outlined"
            sx={{ width: 270, mb: 2 }}
          >
            Reset
          </Button>
      </AuthCard>
    </Template>
  );
};

export default ResetPassword;
