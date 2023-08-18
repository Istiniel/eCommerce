import styles from './InfoBlock.module.scss';

interface Props {
  title: string;
  text: string;
}

const InfoBlock = (props: Props) => {
  const { title, text } = props;

  return (
    <div className={styles.block}>
      <h3 className={styles.blockTitle}>{title}</h3>
      <p className={styles.blockText}>{text}</p>
    </div>
  );
};

export default InfoBlock;
