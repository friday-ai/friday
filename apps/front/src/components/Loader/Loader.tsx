import { useTheme } from '@mui/material/styles';
import { m, Transition } from 'framer-motion';

const transition: Transition = {
  duration: 4,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
};

export default function FaviconLoader() {
  const theme = useTheme();

  return (
    <div style={{ width: 'fit-content', height: 'fit-content' }}>
      <svg
        id="466f8ab7-2527-4c08-a168-e79693ae8f8f"
        width="100%"
        height="100%"
        viewBox="0 0 1300 1600"
        fill="none"
        stroke={theme.palette.primary.main}
        strokeWidth="10"
      >
        <m.path
          d="M621 373L265.48 728L265.48 1499.45L3.47987 1499.45L3.47986 619L621 2"
          initial={{ pathLength: 1 }}
          animate={{ pathLength: 0 }}
          transition={transition}
        />
        <m.path
          d="M617.622 372.952L973.142 727.952L973.142 1499.4L1235.14 1499.4L1235.14 618.952L617.622 1.95166"
          initial={{ pathLength: 1 }}
          animate={{ pathLength: 0 }}
          transition={transition}
        />
        <m.path d="M621 610L301 932L301 1248L621 932" initial={{ pathLength: 1 }} animate={{ pathLength: 0 }} transition={transition} />
        <m.path d="M618 610L938 932V1248L618 932" initial={{ pathLength: 1 }} animate={{ pathLength: 0 }} transition={transition} />
      </svg>
    </div>
  );
}
