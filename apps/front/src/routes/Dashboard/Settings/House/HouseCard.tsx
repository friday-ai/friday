import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import GiteOutlinedIcon from "@mui/icons-material/GiteOutlined";
import { Avatar, Card, CardHeader, IconButton, Stack, Tooltip } from "@mui/material";

import NiceModal from "@ebay/nice-modal-react";
import type { HouseAttributes, HouseCreationAttributes } from "@friday-ai/shared";
import { useTranslation } from "react-i18next";
import Confirm from "../../../../components/Modal/Confirm";
import useHouse from "../../../../services/api/useHouse";

interface HouseCardProps {
  house: HouseAttributes | HouseCreationAttributes;
  selected: boolean;
  selectHouse: (_id: string) => void;
}

export default function HouseCard({ house, selected, selectHouse }: HouseCardProps) {
  const { t } = useTranslation();
  const { deleteHouse } = useHouse();

  const handleDeleteHouse = async () => {
    if ("id" in house) {
      NiceModal.show(Confirm, {
        title: t("settings.house.areYouSure"),
        content: `${t("settings.house.deleteMessage")} <b>${house.name}</b>.`,
        onClose: async (confirm: boolean) => {
          if (confirm) {
            await deleteHouse.mutateAsync(house.id);
          }
        },
      });
    }
  };

  return (
    <Card variant={selected ? "selected" : "outlined"} sx={{ minWidth: { xs: 250, md: 320, lg: 400 } }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <GiteOutlinedIcon />
          </Avatar>
        }
        titleTypographyProps={{ noWrap: true, width: { xs: 60, sm: 90, md: 120, lg: 200 } }}
        subheaderTypographyProps={{ noWrap: true, width: { xs: 60, sm: 90, md: 120, lg: 200 } }}
        title={house.name}
        subheader={"rooms" in house && house.rooms ? `${house.rooms.length} ${t("settings.house.rooms")}` : t("settings.house.noRooms")}
        action={
          <Stack direction="row">
            <Tooltip title={t("settings.house.select")}>
              <IconButton aria-label="select house" onClick={() => selectHouse("id" in house ? house.id : "newHouse")}>
                <EditNoteOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("settings.house.delete")}>
              <IconButton aria-label="delete house" onClick={handleDeleteHouse}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        }
      />
    </Card>
  );
}
