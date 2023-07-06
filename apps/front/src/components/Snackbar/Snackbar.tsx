import React from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { CustomContentProps, SnackbarContent } from 'notistack';

const defaultSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { id, message, ...other } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SnackbarContent ref={ref} {...other}>
      <Snackbar open key={id} message={message} />
    </SnackbarContent>
  );
});

const successSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { id, message, ...other } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SnackbarContent ref={ref} {...other}>
      <Snackbar open key={id}>
        <Alert severity="success" variant="filled" sx={{ minWidth: 288 }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContent>
  );
});

const errorSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { id, message, ...other } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SnackbarContent ref={ref} {...other}>
      <Snackbar open key={id}>
        <Alert severity="error" variant="filled" sx={{ minWidth: 288 }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContent>
  );
});

const warningSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { id, message, ...other } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SnackbarContent ref={ref} {...other}>
      <Snackbar open key={id}>
        <Alert severity="warning" variant="filled" sx={{ minWidth: 288 }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContent>
  );
});

const infoSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { id, message, ...other } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SnackbarContent ref={ref} {...other}>
      <Snackbar open key={id}>
        <Alert severity="info" variant="filled" sx={{ minWidth: 288 }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContent>
  );
});

export { defaultSnackbar, errorSnackbar, infoSnackbar, successSnackbar, warningSnackbar };
