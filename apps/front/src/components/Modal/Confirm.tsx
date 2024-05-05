import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface ConfirmationDialogProps {
  title: string;
  content: string;
  onClose: (confirm: boolean) => Promise<void>;
}

export default NiceModal.create(({ title, content, onClose }: ConfirmationDialogProps) => {
  const { t } = useTranslation();
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
    <Dialog open={modal.visible} onClose={() => handleClose(false)} fullWidth maxWidth={"xs"}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
        <Typography dangerouslySetInnerHTML={{ __html: content }} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => handleClose(false)} variant={"contained"}>
          {t("app.cancel")}
        </Button>
        <Button onClick={() => handleClose(true)} variant={"outlined"}>
          {t("app.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
