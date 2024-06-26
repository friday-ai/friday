import { AnimatePresence, type MotionStyle, m } from "framer-motion";

interface AnimationContainerProps {
  children: React.ReactNode;
  id: string | number;
  style?: MotionStyle;
}

const variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -10,
    opacity: 0,
  },
  transition: {
    duration: 0.3,
  },
};

export default function AnimationContainer({ children, id, style = { width: "100%" } }: AnimationContainerProps) {
  return (
    <AnimatePresence mode="wait">
      <m.div key={id} initial={variants.initial} animate={variants.animate} exit={variants.exit} transition={variants.transition} style={style}>
        {children}
      </m.div>
    </AnimatePresence>
  );
}
