import { ReactNode, useState } from 'react';
import styles from './Slider.module.scss';
import lArrow from '../../../app/assets/icons/arrows/arrow_left.svg';
import rArrow from '../../../app/assets/icons/arrows/arrow_right.svg';

interface SliderProps {
	children: ReactNode[]; 
}

const Slider = ( props: SliderProps ) => {
	const { children } = props;
	const [ imageIndex, setImageIndex ] = useState(0);
	
	const slideLeft = () => {
		if (imageIndex > 0) {
			setImageIndex(imageIndex - 1);
		}
	}

	const slideRight = () => {
		if (imageIndex < children.length - 1) {
			setImageIndex(imageIndex + 1);
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.arrows}>
				<div className={`${styles.arrowLeft} ${imageIndex === 0 ? styles.fade: ''}`} onClick={slideLeft}>
					<img src={lArrow} width='100%' height='100%' alt='slide-left' />
				</div>
				<div className={`${styles.arrowRight} ${imageIndex === children.length - 1 ? styles.fade: ''}`} onClick={slideRight}>
					<img src={rArrow} width='100%' height='100%' alt='slide-right' />
				</div>
			</div>
			<div className={styles.imgBox}>
				{children[imageIndex]}
			</div>

		</div>
	)
}

export default Slider;