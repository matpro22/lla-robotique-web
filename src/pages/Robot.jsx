import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Cpu, Zap, Gauge, Target, Move, Eye, Settings, Play, Pause } from 'lucide-react'
import './Robot.css'

const Robot = () => {
  const { t } = useTranslation()
  const [selectedPart, setSelectedPart] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const specs = [
    { icon: Gauge, label: t('robot.specs.dimensions'), value: '30cm × 30cm × 30cm' },
    { icon: Zap, label: t('robot.specs.weight'), value: '2.5 kg' },
    { icon: Move, label: t('robot.specs.actuators'), value: '4 Moteurs chassi bidirectionelle' },
    { icon: Cpu, label: t('robot.specs.power'), value: 'Batterie LiPo 12V' },
    { icon: Settings, label: t('robot.specs.control'), value: 'Rev motor controller' }
  ]

  const features = [
    { icon: Target, title: t('robot.features.autonomous'), description: 'Bidirectionelle' },
    { icon: Gauge, title: t('robot.features.precision'), description: 'Précision de ±2mm' },
    { icon: Settings, title: t('robot.features.adaptability'), description: 'Mode autonome' },
    { icon: Zap, title: t('robot.features.speed'), description: 'Vitesse max: 1 m/s' }
  ]

  const robotParts = [
    { id: 'body', name: 'Corps', color: '#D4A5A5', position: { x: 50, y: 50 } },
    { id: 'sensor', name: 'Capteurs', color: '#E8F4F8', position: { x: 50, y: 30 } },
    { id: 'motor', name: 'Moteurs', color: '#F5E6D3', position: { x: 30, y: 70 } },
    { id: 'cpu', name: 'Processeur', color: '#C89595', position: { x: 70, y: 50 } }
  ]

  return (
    <div className="robot-page">
      <motion.section
        className="robot-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <motion.h1
            className="page-title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {t('robot.title')}
          </motion.h1>
          <motion.p
            className="page-subtitle"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('robot.subtitle')}
          </motion.p>
        </div>
      </motion.section>

      <section className="robot-visualization">
        <div className="container">
          <div className="robot-display">
            <motion.div
              className="robot-canvas"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="robot-base">
                {robotParts.map((part) => (
                  <RobotPart
                    key={part.id}
                    part={part}
                    isSelected={selectedPart === part.id}
                    onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
                    isAnimating={isAnimating}
                  />
                ))}
              </div>
              <motion.button
                className="animation-toggle"
                onClick={() => setIsAnimating(!isAnimating)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isAnimating ? <Pause size={20} /> : <Play size={20} />}
                {isAnimating ? 'Pause' : 'Animer'}
              </motion.button>
            </motion.div>

            {selectedPart && (
              <motion.div
                className="part-info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h3>{robotParts.find(p => p.id === selectedPart)?.name}</h3>
                <p>Informations détaillées sur cette partie du robot...</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="robot-specs">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('robot.specs.title')}
          </motion.h2>
          <div className="specs-grid">
            {specs.map((spec, index) => {
              const Icon = spec.icon
              return (
                <SpecCard
                  key={index}
                  icon={Icon}
                  label={spec.label}
                  value={spec.value}
                  delay={index * 0.1}
                />
              )
            })}
          </div>
        </div>
      </section>

      <section className="robot-features">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('robot.features.title')}
          </motion.h2>
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <FeatureCard
                  key={index}
                  icon={Icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

const RobotPart = ({ part, isSelected, onClick, isAnimating }) => {
  return (
    <motion.div
      className={`robot-part ${part.id} ${isSelected ? 'selected' : ''}`}
      style={{
        left: `${part.position.x}%`,
        top: `${part.position.y}%`,
        backgroundColor: part.color
      }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={isAnimating ? {
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      } : {}}
      transition={{
        duration: 2,
        repeat: isAnimating ? Infinity : 0,
        ease: 'easeInOut'
      }}
    >
      <span className="part-label">{part.name}</span>
    </motion.div>
  )
}

const SpecCard = ({ icon: Icon, label, value, delay }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      className="spec-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.05 }}
    >
      <div className="spec-icon">
        <Icon size={32} />
      </div>
      <div className="spec-label">{label}</div>
      <div className="spec-value">{value}</div>
    </motion.div>
  )
}

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      className="feature-card"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ x: 10, scale: 1.02 }}
    >
      <div className="feature-icon">
        <Icon size={40} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}

export default Robot

