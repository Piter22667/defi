import React from 'react';
import {Alert, Snackbar} from "@mui/material";

const SnackBarPopUp = () => {
    const [open, setOpen] = React.useState(true);

    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={{
                width: "100%",
                maxWidth: 600,
                left: "50%",
                transform: "translateX(-50%)",
            }}
        >
            <Alert severity="success" onClose={() => setOpen(false)} //після 2 секунд прибираємо попап через стан open
                   sx={{
                       width: "100%",
                       minHeight: 40,
                       alignItems: "center",
                       py: 1,
                   }}>
                Successfully logged in!
            </Alert>
        </Snackbar>
    );
};

export default SnackBarPopUp;