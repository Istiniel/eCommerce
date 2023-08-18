import { useNavigate } from 'react-router-dom';
import styles from './AboutUs.module.scss';
import Button from '../../shared/ui/Button';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.contentBox}>
          <h1>Our story</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae ab nesciunt, non
            necessitatibus eos praesentium laborum adipisci, iusto, assumenda repellendus repellat
            cum culpa earum vitae officiis neque recusandae? Mollitia, cupiditate.
          </p>
          <div className={styles.socialBox}>
            <a href="https://instagram.com">
              <div className={styles.socialContainer}>
                <img src="/instagram.svg" alt="instagram" />
              </div>
            </a>
            <a href="https://pinterest.com">
              <div className={styles.socialContainer}>
                <img src="/pinterest.svg" alt="pinterest" />
              </div>
            </a>
            <a href="https://telegram.org">
              <div className={styles.socialContainer}>
                <img src="/telegram.svg" alt="telegram" />
              </div>
            </a>
          </div>
        </div>
        <div className={styles.imgBox}>
          <img src="/about.jpg" alt="founder" />
        </div>
      </div>

      <div className={styles.splitter}>
        <p>Our story</p>
        <h2>Our Founder&apos;s Passion</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In dicta tempora deserunt
          exercitationem labore odit commodi, voluptatibus excepturi quos cumque eius architecto,
          dignissimos, consequatur vitae perferendis deleniti nobis! Minus, vero.
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.imgBox}>
          <img src="/about2.jpg" alt="roses" />
        </div>
        <div className={styles.contentBox}>
          <h2>Expertly Crafted Bouquets</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam sed molestiae possimus
            ab fugit unde explicabo ipsam culpa, deleniti eos. Neque et quibusdam eligendi deserunt
            hic atque alias, dignissimos suscipit?
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentBox}>
          <h2>Bouquets, Gifts & Ambiance</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste alias architecto labore,
            reprehenderit vero corrupti impedit earum culpa velit repellat qui enim blanditiis
            quibusdam hic incidunt quaerat sequi officiis doloremque!
          </p>
        </div>
        <div className={styles.imgBox}>
          <img src="/about3.jpg" alt="interior" />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.imgBox}>
          <img src="/about4.jpg" alt="bouquet" />
        </div>
        <div className={styles.contentBox}>
          <h2>Making Every Day Special</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita minus eligendi
            quibusdam repellat, similique, porro omnis rerum dignissimos doloremque possimus
            reiciendis deleniti, sed debitis reprehenderit quo! Illum, beatae animi. Quibusdam?
          </p>
        </div>
      </div>

      <div className={styles.splitter}>
        <h2>Discover Our Beautiful Bouquets</h2>
        <p>
          Explore our collection of exquisite bouquets and surprise your loved ones with the perfect
          gift. Click the button below to start shopping
        </p>
        <div className={styles.button}>
          <Button onClick={() => navigate('/products')}>SHOP NOW</Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
