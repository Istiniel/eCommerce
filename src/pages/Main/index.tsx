import styles from './Main.module.scss';
import BlockInfo from '../../shared/ui/blockInfo';

const data = [
  {
    title: 'Why choose us ?',
    text: `At our floral studio, our professional florists craft the most elegant and stylish
            bouquets using only the freshest and highest quality materials available. We stay
            up-to-date with the latest floral design trends and offer unique arrangements that are
            sure to impress. Let us brighten up your day with our stunning bouquets and same-day
            delivery service.`,
  },

  {
    title: 'Stylish bouquets by florists',
    text: `Never miss a moment with our on-time flower delivery service. Our couriers will deliver
            your bouquet personally, without boxes, to ensure it arrives in perfect condition. Trust
            us to deliver your thoughtful gift reliably.`,
  },

  {
    title: 'On-time delivery',
    text: `Never miss a moment with our on-time flower delivery service. Our couriers will deliver
            your bouquet personally, without boxes, to ensure it arrives in perfect condition. Trust
            us to deliver your thoughtful gift reliably.`,
  },

  {
    title: 'Subscription by your needs',
    text: `With our subscription service tailored to your specific needs, you can enjoy the
            convenience of having beautiful bouquets delivered straight to your door at regular
            intervals. Our flexible service is perfect for busy individuals or those who want to
            ensure they always have fresh flowers on hand. You&apos;ll save time and money with this
            hassle-free solution to your floral needs.`,
  },
];

const Main = () => {
  return (
    <section className={styles.section}>
      <div className={styles.column}>
        <h2 className={styles.title}>Why choose us ?</h2>
      </div>
      <div className={styles.column}>
        {data.map((item) => (
          <BlockInfo title={item.title} text={item.text} />
        ))}
      </div>
    </section>
  );
};

export default Main;
