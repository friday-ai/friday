import { m } from "framer-motion";
import { useLocation } from "react-router-dom";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.5,
};

export default function AnimationLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <m.div key={pathname} initial="initial" animate="in" variants={pageVariants} transition={pageTransition}>
      {children}
    </m.div>
  );
}
