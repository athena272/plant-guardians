import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../../assets/logo.png'
import s from './footer.module.scss'


const Footer = () => (
  <footer className={s.footerContainer}>
    <section className={s.footerContent}>
      <div className={s.texts}>
        <img src={logo} alt="Logotipo PlantGuardian" />
        <p>Proteção inteligente para plantações usando tecnologia avançada e métodos não-letais</p>
      </div>

      <div className={s.socialMedia}>
        <p>nos siga em nossas redes sociais</p>
        <div className={s.icons}>
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>
    </section>

    <section className={s.baseboard}>
      <p>&copy; {new Date().getFullYear()} Plant Guardians. Todos os direitos reservados.</p>
    </section>
  </footer>
);

export default Footer;