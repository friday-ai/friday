import { colors, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export interface ColorsComponents {
  red: true;
  pink: true;
  purple: true;
  deepPurple: true;
  indigo: true;
  blue: true;
  lightBlue: true;
  cyan: true;
  teal: true;
  green: true;
  lightGreen: true;
  lime: true;
  yellow: true;
  amber: true;
  orange: true;
  deepOrange: true;
  brown: true;
  grey: true;
  blueGrey: true;
}

const theme = createTheme({});

const colorPalette = createTheme(theme, {
  palette: {
    red: theme.palette.augmentColor({
      color: { main: colors.red[500] },
    }),
    pink: theme.palette.augmentColor({
      color: { main: colors.pink[500] },
    }),
    purple: theme.palette.augmentColor({
      color: { main: colors.purple[500] },
    }),
    deepPurple: theme.palette.augmentColor({
      color: { main: colors.deepPurple[500] },
    }),
    indigo: theme.palette.augmentColor({
      color: { main: colors.indigo[500] },
    }),
    blue: theme.palette.augmentColor({
      color: { main: colors.blue[500] },
    }),
    lightBlue: theme.palette.augmentColor({
      color: { main: colors.lightBlue[500] },
    }),
    cyan: theme.palette.augmentColor({
      color: { main: colors.cyan[500] },
    }),
    teal: theme.palette.augmentColor({
      color: { main: colors.teal[500] },
    }),
    green: theme.palette.augmentColor({
      color: { main: colors.green[500] },
    }),
    lightGreen: theme.palette.augmentColor({
      color: { main: colors.lightGreen[500] },
    }),
    lime: theme.palette.augmentColor({
      color: { main: colors.lime[500] },
    }),
    yellow: theme.palette.augmentColor({
      color: { main: colors.yellow[500] },
    }),
    amber: theme.palette.augmentColor({
      color: { main: colors.amber[500] },
    }),
    orange: theme.palette.augmentColor({
      color: { main: colors.orange[500] },
    }),
    deepOrange: theme.palette.augmentColor({
      color: { main: colors.deepOrange[500] },
    }),
    brown: theme.palette.augmentColor({
      color: { main: colors.brown[500] },
    }),
    grey: theme.palette.augmentColor({
      color: { main: colors.grey[500] },
    }),
    blueGrey: theme.palette.augmentColor({
      color: { main: colors.blueGrey[500] },
    }),
  },
});

const useColors = makeStyles({
  red: {
    color: colors.red[500],
  },
  pink: {
    color: colors.pink[500],
  },
  purple: {
    color: colors.purple[500],
  },
  deepPurple: {
    color: colors.deepPurple[500],
  },
  indigo: {
    color: colors.indigo[500],
  },
  blue: {
    color: colors.blue[500],
  },
  lightBlue: {
    color: colors.lightBlue[500],
  },
  cyan: {
    color: colors.cyan[500],
  },
  teal: {
    color: colors.teal[500],
  },
  green: {
    color: colors.green[500],
  },
  lightGreen: {
    color: colors.lightGreen[500],
  },
  lime: {
    color: colors.lime[500],
  },
  yellow: {
    color: colors.yellow[500],
  },
  amber: {
    color: colors.amber[500],
  },
  orange: {
    color: colors.orange[500],
  },
  deepOrange: {
    color: colors.deepOrange[500],
  },
  brown: {
    color: colors.brown[500],
  },
  grey: {
    color: colors.grey[500],
  },
  blueGrey: {
    color: colors.blueGrey[500],
  },
});

export default colorPalette;

export { useColors };
