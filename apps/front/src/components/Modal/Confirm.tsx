import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Typography } from '@mui/material';

export interface ConfirmationDialogProps {
  title: string;
  content: string;
  onClose: (confirm: boolean) => Promise<void>;
}

export default NiceModal.create(({ title, content, onClose }: ConfirmationDialogProps) => {
  const modal = useModal();

  const handleClose = (confirm: boolean) => {
    onClose(confirm);
    modal.hide();

    // Wait close animation before removing component
    setTimeout(() => {
      modal.remove();
    }, 1000);
  };

  return (
    <Dialog open={modal.visible} onClose={() => handleClose(false)} fullWidth maxWidth={'xs'}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography dangerouslySetInnerHTML={{ __html: content }}></Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => handleClose(false)} variant={'contained'}>
          Cancel
        </Button>
        <Button onClick={() => handleClose(true)} variant={'outlined'}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
});
