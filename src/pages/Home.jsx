import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Trophy, Users, Rocket, Target, ArrowRight, Sparkles, Calendar, Newspaper, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import './Home.css'

const Home = () => {
  const { t } = useTranslation()
  const [heroImage, setHeroImage] = useState('')
  const [aboutImage, setAboutImage] = useState('')
  const [galleryImages, setGalleryImages] = useState([])
  const [news, setNews] = useState([])
  const [selectedNews, setSelectedNews] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const savedPhotos = localStorage.getItem('adminPhotos')
    if (savedPhotos) {
      const photos = JSON.parse(savedPhotos)
      setHeroImage(photos.hero || '/Photo/Photo Robotique 2024/20250118_100210.jpg')
      setAboutImage(photos.about || '/Photo/Photo Robotique 2024/20250118_114435.jpg')
      setGalleryImages(photos.gallery || [
        '/Photo/Photo Robotique 2024/20250115_143539.jpg',
        '/Photo/Photo Robotique 2024/20250115_150331.jpg',
        '/Photo/Photo Robotique 2024/20250118_091145.jpg',
        '/Photo/Photo Robotique 2024/20250118_091712.jpg',
        '/Photo/Photo Robotique 2024/20250118_100903.jpg',
        '/Photo/Photo Robotique 2024/20250118_112857.jpg'
      ])
    } else {
      setHeroImage('/Photo/Photo Robotique 2024/20250118_100210.jpg')
      setAboutImage('/Photo/Photo Robotique 2024/20250118_114435.jpg')
      setGalleryImages([
        '/Photo/Photo Robotique 2024/20250115_143539.jpg',
        '/Photo/Photo Robotique 2024/20250115_150331.jpg',
        '/Photo/Photo Robotique 2024/20250118_091145.jpg',
        '/Photo/Photo Robotique 2024/20250118_091712.jpg',
        '/Photo/Photo Robotique 2024/20250118_100903.jpg',
        '/Photo/Photo Robotique 2024/20250118_112857.jpg'
      ])
    }

    const savedNews = localStorage.getItem('adminNews')
    if (savedNews) {
      setNews(JSON.parse(savedNews))
    } else {
      setNews([
        {
          id: 1,
          title: 'Nouvelle compétition à venir',
          date: new Date().toISOString().split('T')[0],
          description: 'Notre équipe se prépare pour la prochaine compétition régionale.',
          fullContent: 'Notre équipe de robotique LLA se prépare activement pour la prochaine compétition régionale qui se tiendra dans les prochaines semaines. Les membres travaillent dur pour finaliser les améliorations du robot et tester toutes les fonctionnalités. Cette compétition représente une excellente opportunité de démontrer nos compétences techniques et notre esprit d\'équipe.',
          image: '/Photo/Photo Robotique 2024/20250118_100210.jpg',
          images: [
            '/Photo/Photo Robotique 2024/20250118_100210.jpg',
            '/Photo/Photo Robotique 2024/20250118_112132.jpg',
            '/Photo/Photo Robotique 2024/20250118_114350.jpg'
          ],
          category: 'Compétition'
        }
      ])
    }
  }, [])

  useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedNews])

  const nextImage = () => {
    if (selectedNews && selectedNews.images && selectedNews.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedNews.images.length)
    }
  }

  const prevImage = () => {
    if (selectedNews && selectedNews.images && selectedNews.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedNews.images.length) % selectedNews.images.length)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const stats = [
    
  ]

  const whyItems = [
    t('home.why.items.1'),
    t('home.why.items.2'),
    t('home.why.items.3'),
  ]

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-background-image" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="hero-overlay" />
          <motion.div
            className="floating-shape shape-1"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="floating-shape shape-2"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          />
        </div>

        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          <motion.h1
            className="hero-title"
            variants={fadeInUp}
          >
            {t('home.title')}
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            variants={fadeInUp}
          >
            {t('home.subtitle')}
          </motion.p>
          <motion.button
            className="hero-cta"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('home.cta')}
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="scroll-line" />
        </motion.div>
      </section>

      <ScrollSection className="stats-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {t('home.stats.title')}
          </motion.h2>
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <StatCard
                  key={index}
                  icon={Icon}
                  value={stat.value}
                  label={stat.label}
                  delay={index * 0.1}
                />
              )
            })}
          </div>
          <motion.div
            className="home-gallery"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <img src={image} alt={`Photo robotique ${index + 1}`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </ScrollSection>

      <ScrollSection className="about-section">
        <div className="container">
          <div className="about-content">
            <motion.div
              className="about-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2>{t('home.about.title')}</h2>
              <p>{t('home.about.description')}</p>
            </motion.div>
            <motion.div
              className="about-visual"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
              }}
            >
              <div className="visual-card">
                <img 
                  src={aboutImage} 
                  alt="Robot LLA" 
                  className="about-image"
                />
                <div className="image-overlay-content">
                  <Sparkles size={60} className="sparkle-icon" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      <ScrollSection className="why-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {t('home.why.title')}
          </motion.h2>
          <div className="why-grid">
            {whyItems.map((item, index) => (
              <motion.div
                key={index}
                className="why-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="why-number">{index + 1}</div>
                <p>{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection className="news-section">
        <div className="container">
          <motion.div
            className="news-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Newspaper size={40} className="news-icon"/>
            <h2 className="section-title">Les Dernières Actualités</h2>
          </motion.div>
          {news.length > 0 ? (
            <div className="news-grid">
              {news.map((item, index) => (
                <NewsCard 
                  key={item.id || index} 
                  news={item} 
                  delay={index * 0.1}
                  onClick={() => {
                    setSelectedNews(item)
                    setCurrentImageIndex(0)
                  }}
                />
              ))}
            </div>
          ) : (
            <motion.p
              className="no-news"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              Aucune actualité pour le moment.
            </motion.p>
          )}
        </div>
      </ScrollSection>

      <AnimatePresence>
        {selectedNews && (
          <NewsModal 
            news={selectedNews} 
            onClose={() => setSelectedNews(null)}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            nextImage={nextImage}
            prevImage={prevImage}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const NewsCard = ({ news, delay, onClick }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <motion.div
      ref={ref}
      className="news-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
    >
      {news.image && (
        <div className="news-image">
          <img src={news.image} alt={news.title} />
          <div className="news-image-overlay">
            <Maximize2 size={24} />
          </div>
        </div>
      )}
      <div className="news-content">
        <div className="news-meta">
          <span className="news-category">{news.category || 'Actualité'}</span>
          <span className="news-date">
            <Calendar size={14} />
            {formatDate(news.date)}
          </span>
        </div>
        <h3 className="news-title">{news.title}</h3>
        <p className="news-description">{news.description}</p>
        {(news.fullContent || (news.images && news.images.length > 1)) && (
          <div className="news-read-more">
            Lire la suite →
          </div>
        )}
      </div>
    </motion.div>
  )
}

const NewsModal = ({ news, onClose, currentImageIndex, setCurrentImageIndex, nextImage, prevImage }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const images = news.images && news.images.length > 0 ? news.images : (news.image ? [news.image] : [])

  return (
    <motion.div
      className="news-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="news-modal-content"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="news-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="news-modal-header">
          <div className="news-modal-meta">
            <span className="news-modal-category">{news.category || 'Actualité'}</span>
            <span className="news-modal-date">
              <Calendar size={16} />
              {formatDate(news.date)}
            </span>
          </div>
          <h2 className="news-modal-title">{news.title}</h2>
        </div>

        <div className="news-modal-body">
          <div className="news-modal-description">
            <p>{news.description}</p>
          </div>
          {news.fullContent && (
            <div className="news-modal-full-content">
              <h3>Article Complet</h3>
              <div className="full-content-text">
                {news.fullContent.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {images.length > 0 && (
          <div className="news-modal-gallery">
            <div className="news-modal-main-image">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={news.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              />
              {images.length > 1 && (
                <>
                  <button className="gallery-nav-btn gallery-nav-prev" onClick={prevImage}>
                    <ChevronLeft size={24} />
                  </button>
                  <button className="gallery-nav-btn gallery-nav-next" onClick={nextImage}>
                    <ChevronRight size={24} />
                  </button>
                  <div className="gallery-indicator">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="news-modal-thumbnails">
                {images.map((img, index) => (
                  <motion.div
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={img} alt={`${news.title} ${index + 1}`} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

const ScrollSection = ({ children, className }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  )
}

const StatCard = ({ icon: Icon, value, label, delay }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.05 }}
    >
      <div className="stat-icon">
        <Icon size={40} />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  )
}

export default Home

