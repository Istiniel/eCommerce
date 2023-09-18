import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Main.module.scss';
import { Input } from '../../shared/ui/Input';
import Button from '../../shared/ui/Button';
import instagramIcon from '../../app/assets/icons/social/Instagram.svg';
import facebookIcon from '../../app/assets/icons/social/Facebook.svg';
import pinterestIcon from '../../app/assets/icons/social/Pinterest.svg';
import twitterIcon from '../../app/assets/icons/social/Twitter.svg';
import telegramIcon from '../../app/assets/icons/social/Telegram.svg';
import contactImage from '../../app/assets/images/contactImage.webp';
import useAnchorLink from '../../shared/hooks/useAnchorLink';
import InfoBlock from '../../shared/ui/InfoBlock';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { fetchDiscountCodes } from '../../app/redux/asyncThunks/fetchDiscountCodes';
import { selectDiscounts } from '../../app/redux/features/CartSlice/CartSlice';
import LoadingSpinner from '../../shared/ui/LoadingSpinner';

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
  useAnchorLink();
  const dispatch = useAppDispatch();
  const discounts = useAppSelector(selectDiscounts);
  const statusOfLoading = useAppSelector((state) => state.cartSlice.status);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDiscountCodes());
  }, [dispatch]);

  return (
    <>
      <section className={classNames(styles.section, styles.sectionPromo)}>
        <div className={styles.promoCodes}>
          promo: {statusOfLoading === 'loading' && <LoadingSpinner size={25} />}
          {statusOfLoading === 'idle' &&
            discounts.map((discount) => {
              return (
                <p
                  className={styles.promoCode}
                  onMouseDown={() => {
                    navigate('/products');
                  }}
                  key={discount.id}
                >
                  {discount?.name?.['en-US']}
                </p>
              );
            })}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.column}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>Why choose us ?</h2>
          </div>
        </div>
        <div className={styles.column}>
          {data.map((item) => (
            <InfoBlock key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </section>
      <section className={styles.section} id="contacts">
        <div className={styles.column}>
          <div className={styles.contactForm}>
            <h2 className={styles.title}>To Contact Us</h2>
            <div className={styles.inputForm}>
              <p className={styles.label}>We will call you back</p>
              <div className={styles.inputRow}>
                <div className={styles.inputWrapper}>
                  <Input
                    type="text"
                    name=""
                    placeholder="+380 XX XXX XX XX"
                    error=""
                    value=""
                    onChange={() => {}}
                  />
                </div>
                <div className={styles.btnWrapper}>
                  <Button>book a call</Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.contactInfoColumn}>
              <div className={styles.contactInfoBlock}>
                <h3 className={styles.blockTitle}>Phone</h3>
              </div>
              <div className={styles.contactInfoContainer}>
                <p className={styles.contactText}>+380980099777</p>
                <p className={styles.contactText}>+380980099111</p>
              </div>
            </div>
            <div className={styles.contactInfoColumn}>
              <div className={styles.contactInfoBlock}>
                <h3 className={styles.blockTitle}>Address</h3>
              </div>
              <div className={styles.contactInfoContainer}>
                <p className={styles.locationText}>opening hours: 8 to 11 p.m.</p>
                <p className={styles.contactText}>15/4 Khreshchatyk Street, Kyiv </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.imageWrapper}>
            <img src={contactImage} alt="shop-pic" />
          </div>
          <div className={styles.row}>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Follow us</h3>
            </div>
            <div className={styles.block}>
              <ul className={styles.social}>
                <li>
                  <a href="instagram.com" target="_blank">
                    <img src={instagramIcon} alt="instagram-icon" />
                  </a>
                </li>
                <li>
                  <a href="pinterest.com" target="_blank">
                    <img src={pinterestIcon} alt="pinterest-icon" />
                  </a>
                </li>
                <li>
                  <a href="facebook.com" target="_blank">
                    <img src={facebookIcon} alt="facebook-icon" />
                  </a>
                </li>
                <li>
                  <a href="twitter.com" target="_blank">
                    <img src={twitterIcon} alt="twitter-icon" />
                  </a>
                </li>
                <li>
                  <a href="telegram.org" target="_blank">
                    <img src={telegramIcon} alt="telegram-icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.serviceTitleWrapper}>
          <h2 className={`${styles.title} ${styles.textCenter}`}>Our Service</h2>
        </div>
        <div className={styles.serviceContainer}>
          <h5 className={styles.serviceSubtitle}>service</h5>
          <h2 className={styles.serviceTitle}>Wedding & Event Decor</h2>
          <p className={styles.serviceText}>
            Let our team of expert florists and designers create stunning, on-trend floral décor for
            your special day. Trust us to bring your vision to life.
          </p>
        </div>
      </section>
    </>
  );
};

export default Main;
