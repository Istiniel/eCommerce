import { useNavigate } from 'react-router-dom';
import styles from './AboutUs.module.scss';
import Button from '../../shared/ui/Button';
import rssIcon from '../../app/assets/icons/social/rss.png';
import AboutImage1 from '../../app/assets/images/code.jpg'
import AboutImage2 from '../../app/assets/images/ist.jpg'
import AboutImage3 from '../../app/assets/images/shokh.png'
import AboutImage4 from '../../app/assets/images/dk.png'

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.contentBox}>
          <h1>About us</h1>
          <p>
            This app was created by Rolling Stones School students. If you want to learn how to create modern web applications, follow the link below.
          </p>
          <div className={styles.rssLogo}>
            <a href="https://rs.school">
              <img src={rssIcon} alt='rss' />
            </a>
          </div>
        </div>
        <div className={styles.imgBox}>
          <img src={AboutImage1} alt="js-code" />
        </div>
      </div>

      <div className={styles.splitter}>
        <h2>Introducing our development team</h2>
        <p>
          Our team is passionate about the world of web development, and we&lsquo;re excited to share your ambitions and our desire to become exceptional developers with you.
          We believe that web development is not just a profession but also an art. It&lsquo;s an opportunity to create beautiful, functional, and innovative solutions.
          Allow us to introduce the members of our development team:
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.imgBox}>
          <img src={AboutImage2} alt="Istiniel's avatar" />
        </div>
        <div className={styles.contentBox}>
          <h2>Istiniel</h2>
          <p>
            Our team lead.<br />
            <span className={styles.boldText}>Contributions:</span> Project management, Routing, Registration/Login page, a lot of work with redux and CommerceTools<br />
            <span className={styles.boldText}>Github:</span> <a href='https://github.com/Istiniel'>https://github.com/Istiniel</a>
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentBox}>
          <h2>shoxakrshn</h2>
          <p>
            <span className={styles.boldText}>Contributions:</span> Home page, products page, basket page.<br />
            <span className={styles.boldText}>Github:</span> <a href='https://github.com/shoxakrshn'>https://github.com/shoxakrshn</a>
          </p>
        </div>
        <div className={styles.imgBox}>
          <img src={AboutImage3} alt="shoxakrshn's avatar" />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.imgBox}>
          <img src={AboutImage4} alt="dkon70's avatar" />
        </div>
        <div className={styles.contentBox}>
          <h2>dkon70</h2>
          <p>
            <span className={styles.boldText}>Contributions:</span> Product card, 404 page, about us page.<br />
            <span className={styles.boldText}>Github:</span> <a href='https://github.com/dkon70'>https://github.com/dkon70</a>
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
