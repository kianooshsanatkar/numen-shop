import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { tokenFreshness } from "../../services/auth";

export default function FreshDialog({
  dialog,
  disableDialog,
  callbackIfSucceed,
}) {
  const [errors, setErrors] = useState(null);
  const [password, setPassword] = useState("");

  return (
    <Dialog
      open={dialog}
      onClose={() => {
        disableDialog();
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        style={{ backgroundColor: "#333", color: "#fff" }}
        id="form-dialog-title"
      >
        <div style={{ margin: 0 }}>ورود به حساب کاربری</div>
      </DialogTitle>
      <DialogContent>
        <form>
          <Grid container>
            <Grid item xs={12}>
              <Typography color="error" variant="body2">
                {errors}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label="پسوورد"
                type="Password"
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            disableDialog();
          }}
          color="primary"
        >
          بستن
        </Button>
        <Button
          onClick={() => {
            tokenFreshness(password).then((result) => {
              if (result.ok) {
                  disableDialog();
                callbackIfSucceed();
              } else {
                  setErrors(result.msg)
              }
            });
          }}
          color="primary"
        >
          ورود
        </Button>
      </DialogActions>
    </Dialog>
  );
}
