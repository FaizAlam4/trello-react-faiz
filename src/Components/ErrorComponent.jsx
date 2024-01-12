import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function BasicAlerts() {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">Could not perform the required action</Alert>
    </Stack>
  );
}
