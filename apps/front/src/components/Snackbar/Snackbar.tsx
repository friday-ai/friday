import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { type CustomContentProps, SnackbarContent } from "notistack";
import { forwardRef } from "react";

const defaultSnackbar = forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { id, message } = props;
  return (
    <SnackbarContent ref={ref}>
      <Snackbar open key={id} message={message} />
    </SnackbarContent>
  );
});

const successSnackbar = forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { id, message } = props;
  return (
    <SnackbarContent ref={ref}>
      <Snackbar open key={id}>
        <Alert severity="success" variant="filled" sx={{ minWidth: 288 }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContent>
  );
});

const errorSnackbar = forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { id, message } = props;
  return (
    <SnackbarContent ref={ref}>
      <Snackbar open key={id}>
        <Alert severity="error" variant="filled" sx={{ minWidth: 288 }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContent>
  );
});

const warningSnackbar = forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { id, message } = props;
  return (
    <SnackbarContent ref={ref}>
      <Snackbar open key={id}>
        <Alert severity="warning" variant="filled" sx={{ minWidth: 288 }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContent>
  );
});

const infoSnackbar = forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { id, message } = props;
  return (
    <SnackbarContent ref={ref}>
      <Snackbar open key={id}>
        <Alert severity="info" variant="filled" sx={{ minWidth: 288 }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContent>
  );
});

export { defaultSnackbar, errorSnackbar, infoSnackbar, successSnackbar, warningSnackbar };
