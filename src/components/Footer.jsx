import { motion } from 'framer-motion'
import { Github, Mail, Instagram, Linkedin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './Footer.css'

const Footer = () => {
  const { t } = useTranslation()

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-section">
            <h3>LLA Robotique</h3>
            <p>Innovation • Créativité • Excellence</p>
          </div>

          <div className="footer-section">
            <h4>Liens Rapides</h4>
            <ul>
              <li><a href="/">Accueil</a></li>
              <li><a href="/results">Résultats</a></li>
              <li><a href="/robot">Notre Robot</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: contact@lla-robotique.fr</p>
          </div>

          <div className="footer-section">
            <h4>Suivez-nous</h4>
            <div className="social-links">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="social-link"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p> 2026 LLA Robotique. {t('footer.rights')}</p>
          
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

