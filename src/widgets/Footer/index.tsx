import Wrapper from '../../shared/ui/Wrapper';
import styles from './Footer.module.scss';
import instagramIcon from '../../app/assets/icons/social/Instagram.svg';
import facebookIcon from '../../app/assets/icons/social/Facebook.svg';
import pinterestIcon from '../../app/assets/icons/social/Pinterest.svg';
import twitterIcon from '../../app/assets/icons/social/Twitter.svg';
import telegramIcon from '../../app/assets/icons/social/Telegram.svg';

const remindText =
  'Remember to offer beautiful flowers from Kyiv LuxeBouquets Valentines Day, Mothers Day, Christmas... Reminds you 7 days before. No spam or sharing your address';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper>
        <div className={styles.container}>
          <div className={styles.column}>
            <p className={styles.remind}>{remindText}</p>
            <div className={styles.remind__form}>
              <input type="text" placeholder="Your Email" className={styles.input} />
              <button className={styles.btn}>remind</button>
            </div>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Contact Us</h3>
            <div className={styles.contact__info}>
              <h4 className={styles.subtitle}>Address</h4>
              <p className={styles.link}>15/4 Khreshchatyk Street, Kyiv</p>
            </div>
            <div className={styles.contact__info}>
              <h4 className={styles.subtitle}>Phone</h4>
              <p className={styles.link}>+380980099777</p>
            </div>
            <div className={styles.contact__info}>
              <h4 className={styles.subtitle}>General Enquiry:</h4>
              <p className={styles.link}>Kiev.Florist.Studio@gmail.com</p>
            </div>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Shop</h3>
            <ul>
              <li className={styles.link}>All Products</li>
              <li className={styles.link}>Fresh Flowers</li>
              <li className={styles.link}>Dried Flowers</li>
              <li className={styles.link}>Live Plants</li>
              <li className={styles.link}>Aroma Candles</li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>About Us</h3>
            <ul>
              <li className={styles.link}>Our Story</li>
              <li className={styles.link}>Blog</li>
            </ul>
            <ul>
              <li className={styles.link}>Shipping & returns</li>
              <li className={styles.link}>Terms & conditions</li>
              <li className={styles.link}>Privacy policy</li>
            </ul>
            <h3 className={styles.title}>Follow Us</h3>
            <div className={styles.social}>
              <a href="instagram.com">
                <img src={instagramIcon} alt="instagram-icon" />
              </a>
              <a href="pinterest.com">
                <img src={pinterestIcon} alt="pinterest-icon" />
              </a>
              <a href="facebook.com">
                <img src={facebookIcon} alt="facebook-icon" />
              </a>
              <a href="twitter.com">
                <img src={twitterIcon} alt="twitter-icon" />
              </a>
              <a href="telegram.org">
                <img src={telegramIcon} alt="telegram-icon" />
              </a>
            </div>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
