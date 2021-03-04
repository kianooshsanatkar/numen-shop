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
import { Link } from 'react-router-dom';

export default function LoginDialog({ dialog, disableDialog, closeMenu=()=>{} }) {
    const dispatch = useDispatch();
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
        <Link to="/registration/">
        <Button variant="text" color="secondary" onClick={()=>{disableDialog(); closeMenu();}}>
          ثبت نام
        </Button>
        </Link>
        <Button
          onClick={() => {
            disableDialog();
          }}
          color="default"
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
