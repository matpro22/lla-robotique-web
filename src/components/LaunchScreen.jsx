import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Bot } from 'lucide-react'
import './LaunchScreen.css'

const LaunchScreen = () => {
  const { t } = useTranslation()
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  const robotVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        duration: 1
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <motion.div
      className="launch-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="launch-background">
        <motion.div
          className="pulse-circle"
          variants={pulseVariants}
          animate="animate"
        />
        <motion.div
          className="pulse-circle pulse-circle-2"
          variants={pulseVariants}
          animate="animate"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      <motion.div
        className="launch-content"
        variants={containerVariants}
      >
        <motion.div
          className="robot-icon-wrapper"
          variants={robotVariants}
        >
          <Bot size={120} strokeWidth={1.5} />
          <motion.div
            className="robot-glow"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        <motion.h1
          className="launch-title"
          variants={itemVariants}
        >
          {t('launch.title')}
        </motion.h1>

        <motion.p
          className="launch-subtitle"
          variants={itemVariants}
        >
          {t('launch.subtitle')}
        </motion.p>

        <motion.div
          className="loading-dots"
          variants={itemVariants}
        >
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="launch-particles"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeOut'
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default LaunchScreen

