import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography
} from "@material-ui/core";

export default function ErrorDialog({open, title, context, onOk, onClose=null}){


    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">{context}</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={onOk}>باشه</Button>
            </DialogActions>
        </Dialog>
    )
}