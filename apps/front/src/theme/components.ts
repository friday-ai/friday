import { createTheme } from "@mui/material";

const componentsTheme = createTheme({
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
        disableGutters: true,
        sx: {
          padding: 2,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "inherit",
        elevation: 0,
        variant: "outlined",
        sx: {
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiCardContent: {
      defaultProps: {
        sx: {
          padding: "2rem",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        sx: {
          borderRadius: ".6rem",
        },
      },
    },
    MuiToggleButtonGroup: {
      defaultProps: {
        sx: {
          "& .MuiToggleButtonGroup-grouped": {
            margin: 0.7,
            padding: 0.5,
            border: 0,
            "&.Mui-disabled": {
              border: 0,
            },
            "&:not(:first-of-type)": {
              borderRadius: 0.6,
            },
            "&:first-of-type": {
              borderRadius: 0.6,
            },
            "& .Mui-selected": {
              color: "primary.main",
            },
          },
        },
      },
    },
    MuiStep: {
      defaultProps: {
        sx: {
          "& .MuiStepLabel-iconContainer": {
            paddingRight: 0,
            border: "solid 1px",
            borderColor: "divider",
            borderRadius: "50%",
          },
          "& .MuiStepIcon-root": {
            width: "1.5em",
            height: "1.5em",
          },
          "& .Mui-disabled .MuiStepIcon-root": {
            color: "white",
          },
          "& .Mui-disabled .MuiStepIcon-text": {
            fill: "primary.main",
          },
        },
      },
    },
    MuiStepConnector: {
      defaultProps: {
        sx: {
          "&.Mui-active": {
            "& .MuiStepConnector-line": {
              borderColor: "primary.main",
              borderStyle: "solid",
            },
          },
          "&.Mui-completed": {
            "& .MuiStepConnector-line": {
              borderColor: "primary.main",
              borderStyle: "solid",
            },
          },
          "& .MuiStepConnector-line": {
            borderColor: "divider",
            borderWidth: 1,
            borderStyle: "dashed",
          },
        },
      },
    },
    MuiMobileStepper: {
      defaultProps: {
        sx: {
          backgroundColor: "transparent",
          border: "none",
        },
      },
    },
    MuiSnackbar: {
      defaultProps: {
        sx: {
          position: "unset",
        },
      },
    },
    MuiList: {
      defaultProps: {
        sx: {
          "&.MuiList-root": {
            padding: 0,
          },
        },
      },
    },
    MuiMenuItem: {
      defaultProps: {
        sx: {
          "&.MuiMenuItem-root": {
            minHeight: "auto",
            margin: 0.7,
            borderRadius: 0.6,
          },
        },
      },
    },
    MuiCard: {
      variants: [
        {
          props: {
            variant: "selected",
          },
          style: {
            borderWidth: "1.5px",
            borderStyle: "solid",
            borderColor: "ActiveBorder",
          },
        },
      ],
    },
    MuiTab: {
      defaultProps: {
        sx: {
          minHeight: 54,
        },
      },
    },
    MuiToggleButton: {
      variants: [
        {
          props: {
            variant: "rounded",
          },
          style: {
            borderRadius: "100%",
          },
        },
      ],
      defaultProps: {
        sx: {
          "&.Mui-selected": {
            borderColor: "currentcolor",
          },
        },
      },
    },
    MuiSlider: {
      variants: [
        {
          props: {
            variant: "rail",
          },
          style: {
            height: 25,
            transition: "border 0.6s linear",
            padding: 0,
            "& .MuiSlider-rail": {
              width: "calc(100% + 10px)",
              transform: "translate(-5px, -50%)",
              borderRadius: 8,
            },
            "& .MuiSlider-track": {
              border: "none",
              backgroundColor: "transparent",
              "&:after": {
                content: '""',
                position: "absolute",
                display: "block",
                width: "calc(100% + 10px)",
                height: 25,
                borderRadius: 8,
                backgroundColor: "currentColor",
                transform: "translateX(-5px)",
              },
            },
            "& .MuiSlider-thumb": {
              borderRadius: 8,
              backgroundColor: "background",
              width: 3,
              height: 12,
              "&:before": {
                boxShadow: "none",
              },
            },
            "& .MuiSlider-valueLabel": {
              fontSize: 9,
              fontWeight: "normal",
              top: -9,
              color: "currentColor",
              backgroundColor: "currentColor",
              borderRadius: 4,
              padding: 4,
              paddingTop: 2,
              paddingBottom: 2,
              "&::before": {
                display: "none",
              },
              "& *": {
                background: "transparent",
                color: "background",
              },
            },
          },
        },
      ],
    },
  },
});

export default componentsTheme;
