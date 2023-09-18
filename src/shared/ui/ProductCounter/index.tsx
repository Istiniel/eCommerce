import { Dispatch, SetStateAction } from 'react';
import styles from './ProductCounter.module.scss';

interface InputStepperProps {
  maxItems?: number;
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
  onChange?: (count: number) => void;
}

const ProductCounter = ({ maxItems = 99, counter, setCounter, onChange }: InputStepperProps) => {
  const minusButtonHandler = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }

    if (onChange) {
      onChange(counter - 1);
    }
  };

  const plusButtonHandler = () => {
    if (counter < maxItems) {
      setCounter(counter + 1);
    }

    if (onChange) {
      onChange(counter + 1);
    }
  };

  return (
    <div className={styles.stepperWrapper}>
      <button className={styles.minusButton} onClick={minusButtonHandler} type="button">
        -
      </button>
      <div className={styles.input}>{counter}</div>
      <button className={styles.plusButton} onClick={plusButtonHandler} type="button">
        +
      </button>
    </div>
  );
};

export default ProductCounter;
