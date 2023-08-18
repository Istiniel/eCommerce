import React from 'react';
import { BiError } from 'react-icons/bi';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './ErrorMessage.module.scss';

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = 'Error' }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ transform: 'translateY(100px)', opacity: 0 }}
        animate={{ transform: 'translateY(0px)', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.container}>
          <BiError />
          <p className={styles.errorMessage}>{message}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorMessage;
