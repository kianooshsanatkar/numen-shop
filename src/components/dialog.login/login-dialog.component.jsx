import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import { login } from "../../services/auth";
import {useDispatch} from 'react-redux';
import { saveUserStateAction }  from '../../redux/user.reducer';

export default function LoginDialog({ dialog, disableDialog }) {
    const dispatch = useDispatch();
    // const [authDialog, setAuthDialog] = useState(dialog);
    const [phone, setPhone] = useState("");
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
        {/* <DialogContentText>
                  .برای ورود لطفا ایمیل و پسوورد خود را وارد کنید، و اگر حساب کاربری ندارید لطفا از تب ایجاد حساب اقدام نمایید
                </DialogContentText> */}
        <form>
          <TextField
            autoFocus
            margin="dense"
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            label="تلفن"
            placeholder="09121234567"
            type="tel"
            fullWidth
            required
          />
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
            login(phone, password).then((result) => {
              const [loggedIn, user] = result;
              if (loggedIn === true) {
                dispatch(saveUserStateAction(user));
                disableDialog();
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
