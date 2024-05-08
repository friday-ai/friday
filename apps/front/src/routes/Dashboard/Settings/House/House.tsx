import { useEffect, useState } from "react";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import type { HouseAttributes, HouseCreationAttributes } from "@friday-ai/shared";
import { useTranslation } from "react-i18next";
import LoaderSuspense from "../../../../components/Loader/LoaderSuspense";
import { useGetHouses } from "../../../../services/api/useHouse";
import HouseCard from "./HouseCard";
import HouseDetails from "./HouseDetails";

export default function House() {
  const { t } = useTranslation();
  const { isFetching, isFetchedAfterMount, data: houses } = useGetHouses();
  const [selectedHouse, setSelectedHouse] = useState<HouseAttributes | HouseCreationAttributes>();
  const [newHouse, setNewHouse] = useState(false);

  const addHouse = () => {
    setNewHouse(true);
    setSelectedHouse({ name: "New house", longitude: "0", latitude: "0" });
  };

  const handleSelectHouse = (id: string) => {
    if (houses) {
      const [selected] = houses.filter((h) => h.id === id);
      setSelectedHouse(selected);
    }
  };

  useEffect(() => {
    if (houses && !selectedHouse) {
      setSelectedHouse(houses[0]);
    }

    if (houses && !selectedHouse && newHouse) {
      setSelectedHouse(houses[houses.length - 1]);
      setNewHouse(false);
    }

    // Check if is selected house was deleted, in case select the first house of list
    if (houses && selectedHouse && "id" in selectedHouse && houses.filter((h) => h.id === selectedHouse.id).length === 0) {
      setSelectedHouse(houses[0]);
    }
  }, [houses, newHouse, selectedHouse]);

  return (
    <LoaderSuspense isFetching={isFetching && !isFetchedAfterMount}>
      <Stack spacing={2} direction={{ xs: "column", xl: "row" }} divider={<Divider orientation="vertical" flexItem />} justifyContent="center">
        <Stack spacing={2} maxWidth={{ xl: 550 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" key="head">
            <Typography variant="h6" fontWeight="bold">
              {t("settings.house.title")}
            </Typography>
            <Tooltip title={t("settings.house.add")}>
              <IconButton aria-label="add new house" onClick={addHouse}>
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack spacing={2} direction={{ xs: "row", xl: "column" }} overflow={"auto"} justifyContent={{ xs: "unset", md: "center" }}>
            {houses &&
              selectedHouse &&
              houses.map((house) => (
                <HouseCard
                  key={house.id}
                  house={house}
                  selected={"id" in selectedHouse && selectedHouse.id === house.id}
                  selectHouse={handleSelectHouse}
                />
              ))}
          </Stack>

          {newHouse && selectedHouse && <HouseCard key="newHouse" house={selectedHouse} selected selectHouse={handleSelectHouse} />}
        </Stack>

        {selectedHouse && <HouseDetails house={selectedHouse} selectHouse={handleSelectHouse} />}
      </Stack>
    </LoaderSuspense>
  );
}
