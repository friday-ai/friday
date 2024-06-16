import {
  DevicesActions,
  DevicesCapabilities,
  WebsocketMessageTypes,
  type DcstAttributes,
  type DeviceAttributes,
  type WebsocketPayload,
} from "@friday-ai/shared";

import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import { Box, Card, Divider, Slider, Stack, ToggleButton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import useCapabilities from "../../services/api/useCapabilities";
import useSharedApp from "../../services/app/useApp";
import { useColors } from "../../theme/colorPalette";

interface LightProps {
  device: DeviceAttributes;
}

const LightBrightness = React.forwardRef<HTMLDivElement, LightProps>(({ device, ...props }, ref) => {
  const colors = useColors();
  const { ws } = useSharedApp();
  const { setState } = useCapabilities();

  // Find the brightness capability and his inforamtions
  const capability = device.capabilities.filter((c) => c.type === DevicesCapabilities.BRIGHTNESS);
  const { id, settings, state } = capability[0];
  const { min, max, step } = settings.settings ?? { min: 0, max: 100, step: 1 };

  const [on, setOn] = useState(Number(state.value) !== 0);
  const [brightness, setBrightness] = useState(Number(state.value));

  const handleChange = (value: number | boolean) => {
    let val = 0;

    if (typeof value === "boolean") {
      setOn(value);
      val = value ? max : min;
      setBrightness(val);
    } else {
      setBrightness(value);
      setOn(value !== 0);
      val = value;
    }

    setState.mutate({ action: DevicesActions.SET_BRIGHTNESS, capabilityId: id, value: val });
  };

  const stateEvent = useCallback(
    (args: WebsocketPayload) => {
      const { state } = args.message as { state: DcstAttributes };

      if (id === state.capabilityId && typeof state.value === "number") {
        setBrightness(state.value);
        setOn(state.value !== 0);
      }
    },
    [id],
  );

  useEffect(() => {
    ws.on(WebsocketMessageTypes.CAPABILITY_STATE_EVENT, stateEvent);

    return () => {
      ws.off(WebsocketMessageTypes.CAPABILITY_STATE_EVENT, stateEvent);
    };
  }, [ws, stateEvent]);

  return (
    <div ref={ref} {...props}>
      <Card variant="outlined" sx={{ width: "100%", height: "100%", padding: 1.5 }}>
        <Stack direction="column" height="100%" gap={1}>
          <Stack direction="row" gap={1.5}>
            <Box>
              <ToggleButton selected={on} value={""} aria-label="left aligned" color="amber" variant="rounded" onClick={() => handleChange(!on)}>
                <EmojiObjectsOutlinedIcon />
              </ToggleButton>
            </Box>
            <Stack>
              <Typography variant="body2" fontWeight="medium">
                {device.defaultName}
              </Typography>
              <Typography variant="caption2">{device.defaultManufacturer}</Typography>
              <Typography variant="caption2" className={on ? colors.amber : colors.grey}>
                {on ? "On" : "Off"}
              </Typography>
            </Stack>
          </Stack>

          <Divider sx={{ opacity: 0.4 }} />
          <Typography variant="caption2" paddingLeft={1}>
            Luminosité
          </Typography>
          <Stack>
            <Stack direction="row" justifyContent="space-between" paddingX={1}>
              <Typography variant="caption2">{min}</Typography>
              <Typography variant="caption2">{max}</Typography>
            </Stack>
            <Box paddingX={1.5}>
              <Slider
                valueLabelDisplay="on"
                variant="rail"
                min={min}
                max={max}
                step={step}
                color={on ? "amber" : "grey"}
                value={brightness}
                onChange={(_e, v) => handleChange(v as number)}
              />
            </Box>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
});

export default LightBrightness;
