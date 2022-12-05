import { motion } from 'framer-motion'

const RightMotion = ({ children }) => (
  <motion.div
    initial={{ x: 100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ stiffness: 50, duration: 0.7 }}
  >
    {children}
  </motion.div>
)

export default RightMotion
