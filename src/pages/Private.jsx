import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Lock, Unlock, Image, X, Calendar } from 'lucide-react'
import './Private.css'

const Private = () => {
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedYear, setSelectedYear] = useState('2024')

  const correctPassword = 'LLA2024'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === correctPassword) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError(t('private.error'))
      setPassword('')
    }
  }

  const photos2023 = [
    { id: 1, url: '/Photo/Photo Robotique 2023/20240405_161605.jpg', title: 'Photo 2023 - 1' },
    { id: 2, url: '/Photo/Photo Robotique 2023/20240405_164410.jpg', title: 'Photo 2023 - 2' },
    { id: 3, url: '/Photo/Photo Robotique 2023/20240405_170512.jpg', title: 'Photo 2023 - 3' },
    { id: 4, url: '/Photo/Photo Robotique 2023/20240405_170520.jpg', title: 'Photo 2023 - 4' },
    { id: 5, url: '/Photo/Photo Robotique 2023/20240406_140605.jpg', title: 'Photo 2023 - 5' },
    { id: 6, url: '/Photo/Photo Robotique 2023/20240406_162921.jpg', title: 'Photo 2023 - 6' },
    { id: 7, url: '/Photo/Photo Robotique 2023/20240406_172149.jpg', title: 'Photo 2023 - 7' }
  ]

  const photos2024 = [
    { id: 1, url: '/Photo/Photo Robotique 2024/20250115_143539.jpg', title: 'Photo 2024 - 1' },
    { id: 2, url: '/Photo/Photo Robotique 2024/20250115_143550.jpg', title: 'Photo 2024 - 2' },
    { id: 3, url: '/Photo/Photo Robotique 2024/20250115_150331.jpg', title: 'Photo 2024 - 3' },
    { id: 4, url: '/Photo/Photo Robotique 2024/20250118_085750.jpg', title: 'Photo 2024 - 4' },
    { id: 5, url: '/Photo/Photo Robotique 2024/20250118_091145.jpg', title: 'Photo 2024 - 5' },
    { id: 6, url: '/Photo/Photo Robotique 2024/20250118_091712.jpg', title: 'Photo 2024 - 6' },
    { id: 7, url: '/Photo/Photo Robotique 2024/20250118_100210.jpg', title: 'Photo 2024 - 7' },
    { id: 8, url: '/Photo/Photo Robotique 2024/20250118_100903.jpg', title: 'Photo 2024 - 8' },
    { id: 9, url: '/Photo/Photo Robotique 2024/20250118_112132.jpg', title: 'Photo 2024 - 9' },
    { id: 10, url: '/Photo/Photo Robotique 2024/20250118_112857.jpg', title: 'Photo 2024 - 10' },
    { id: 11, url: '/Photo/Photo Robotique 2024/20250118_114350.jpg', title: 'Photo 2024 - 11' },
    { id: 12, url: '/Photo/Photo Robotique 2024/20250118_114435.jpg', title: 'Photo 2024 - 12' },
    { id: 13, url: '/Photo/Photo Robotique 2024/20250118_115104.jpg', title: 'Photo 2024 - 13' },
    { id: 14, url: '/Photo/Photo Robotique 2024/IMG_3964.JPEG', title: 'Photo 2024 - 14' }
  ]

  const photosByYear = {
    '2023': photos2023,
    '2024': photos2024
  }

  const currentPhotos = photosByYear[selectedYear] || []

  if (isAuthenticated) {
    return (
      <div className="private-page">
        <motion.section
          className="private-gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <motion.div
              className="gallery-header"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="header-content">
                <Unlock size={32} className="unlock-icon" />
                <div>
                  <h1>{t('private.title')}</h1>
                  <p>Accès autorisé - Photos privées</p>
                </div>
              </div>
              <motion.button
                className="logout-btn"
                onClick={() => setIsAuthenticated(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Déconnexion
              </motion.button>
            </motion.div>

            <motion.div
              className="year-selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Calendar size={24} />
              <div className="year-buttons">
                <button
                  className={`year-btn ${selectedYear === '2023' ? 'active' : ''}`}
                  onClick={() => setSelectedYear('2023')}
                >
                  2023
                </button>
                <button
                  className={`year-btn ${selectedYear === '2024' ? 'active' : ''}`}
                  onClick={() => setSelectedYear('2024')}
                >
                  2024
                </button>
              </div>
            </motion.div>

            <motion.div
              className="gallery-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              key={selectedYear}
            >
              {currentPhotos.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="image-wrapper">
                    <img src={image.url} alt={image.title} />
                    <div className="image-overlay">
                      <Image size={32} />
                    </div>
                  </div>
                  <p>{image.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="image-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Fermer"
                >
                  <X size={24} />
                </button>
                <img src={selectedImage.url} alt={selectedImage.title} />
                <h3>{selectedImage.title}</h3>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="private-page">
      <motion.section
        className="private-auth"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-container">
          <motion.div
            className="auth-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <motion.div
              className="lock-icon-wrapper"
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Lock size={64} />
            </motion.div>

            <h1>{t('private.title')}</h1>
            <p>{t('private.subtitle')}</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <label htmlFor="password">{t('private.password')}</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder={t('private.placeholder')}
                  className={error ? 'error' : ''}
                  autoFocus
                />
                {error && (
                  <motion.p
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('private.enter')}
                <Unlock size={20} />
              </motion.button>
            </form>

            <motion.div
              className="auth-decoration"
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Private

