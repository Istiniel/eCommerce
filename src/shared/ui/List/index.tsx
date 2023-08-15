interface Props {
  items: string[];
  styles: string;
}
const List = (props: Props) => {
  const { items, styles } = props;
  return (
    <ul>
      {items.map((item: string) => (
        <li className={styles}>{item}</li>
      ))}
    </ul>
  );
};

export default List;
