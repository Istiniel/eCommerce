import { useState } from 'react';
import styles from './inputStepper.module.scss';

interface InputStepperProps {
    value?: number;
    maxItems?: number;
}

const InputStepper = ({ value=1, maxItems=99 }: InputStepperProps) => {
    const [counter, setCounter] = useState(value);

    const minusButtonHandler = () => {
		if (counter > 1) {
			setCounter(counter - 1);
		}
	}

	const plusButtonHandler = () => {
		if (counter < maxItems) {
			setCounter(counter + 1);
		}
	}

    return (
        <div className={styles.stepperWrapper}>
            <button className={styles.minusButton} onClick={minusButtonHandler} type='button'>-</button>
            <div className={styles.input}>{counter}</div>
            <button className={styles.plusButton} onClick={plusButtonHandler} type='button'>+</button>
        </div>
    )
}

export default InputStepper;