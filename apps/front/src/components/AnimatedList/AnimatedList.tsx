import React from 'react';
import { AnimatePresence, motion, usePresence } from 'framer-motion';

function ListItem({ children }: { children: React.ReactNode }) {
  const [isPresent, safeToRemove] = usePresence();

  return (
    <motion.div
      layout
      initial="in"
      style={{ position: isPresent ? 'static' : 'absolute' }}
      animate={isPresent ? 'in' : 'out'}
      whileTap="tapped"
      variants={{
        in: { scaleY: 1, opacity: 1 },
        out: { scaleY: 0, opacity: 0, zIndex: -1 },
        tapped: { scale: 0.98, opacity: 0.5, transition: { duration: 0.1 } },
      }}
      onAnimationComplete={() => !isPresent && safeToRemove()}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 50,
        mass: 1,
      }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedListProps<T> {
  renderItem: (item: T) => React.ReactNode;
  items: T[];
}

function AnimatedList<T>({ items, renderItem }: AnimatedListProps<T>) {
  return (
    <AnimatePresence>
      {items.map((item) => (
        <ListItem key={JSON.stringify(item)}>{renderItem(item)}</ListItem>
      ))}
    </AnimatePresence>
  );
}

export default AnimatedList;
