import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full my-12 overflow-hidden"
    >
      <div className="relative w-full" style={{ height: '2px' }}>
        <svg
          className="w-full h-full block"
          preserveAspectRatio="none"
          viewBox="0 0 100 2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="100"
            y1="1"
            x2="0"
            y2="1"
            stroke="#03464D"
            strokeWidth="2"
            strokeDasharray="8 8"
            strokeDashoffset="0"
            className="animate-dash-move"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </motion.div>
  );
}
