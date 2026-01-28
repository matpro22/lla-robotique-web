import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Contrast, Type, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './AccessibilityPanel.css'

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState(1)
  const [reduceMotion, setReduceMotion] = useState(false)
  const { t } = useTranslation()

  const togglePanel = () => {
    setIsOpen(!isOpen)
  }

  const handleContrast = () => {
    setHighContrast(!highContrast)
    document.documentElement.classList.toggle('high-contrast', !highContrast)
  }

  const handleFontSize = (size) => {
    setFontSize(size)
    document.documentElement.style.fontSize = `${size * 100}%`
  }

  const handleReduceMotion = () => {
    setReduceMotion(!reduceMotion)
    document.documentElement.classList.toggle('reduce-motion', !reduceMotion)
  }

  return (
    <>
      <motion.button
        className="accessibility-toggle"
        onClick={togglePanel}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={t('accessibility.title')}
        aria-expanded={isOpen}
      >
        <Settings size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="accessibility-panel"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="panel-header">
              <h3>{t('accessibility.title')}</h3>
              <button onClick={togglePanel} aria-label="Fermer">×</button>
            </div>

            <div className="panel-content">
              <div className="accessibility-option">
                <div className="option-header">
                  <Contrast size={20} />
                  <span>{t('accessibility.contrast')}</span>
                </div>
                <button
                  className={`toggle-button ${highContrast ? 'active' : ''}`}
                  onClick={handleContrast}
                  aria-pressed={highContrast}
                >
                  <span className="toggle-slider" />
                </button>
              </div>

              <div className="accessibility-option">
                <div className="option-header">
                  <Type size={20} />
                  <span>{t('accessibility.fontSize')}</span>
                </div>
                <div className="font-size-buttons">
                  <button
                    className={fontSize === 0.875 ? 'active' : ''}
                    onClick={() => handleFontSize(0.875)}
                    aria-label="Petite taille"
                  >
                    A
                  </button>
                  <button
                    className={fontSize === 1 ? 'active' : ''}
                    onClick={() => handleFontSize(1)}
                    aria-label="Taille normale"
                  >
                    A
                  </button>
                  <button
                    className={fontSize === 1.125 ? 'active' : ''}
                    onClick={() => handleFontSize(1.125)}
                    aria-label="Grande taille"
                  >
                    A
                  </button>
                  <button
                    className={fontSize === 1.25 ? 'active' : ''}
                    onClick={() => handleFontSize(1.25)}
                    aria-label="Très grande taille"
                  >
                    A
                  </button>
                </div>
              </div>

              <div className="accessibility-option">
                <div className="option-header">
                  <Zap size={20} />
                  <span>{t('accessibility.reduceMotion')}</span>
                </div>
                <button
                  className={`toggle-button ${reduceMotion ? 'active' : ''}`}
                  onClick={handleReduceMotion}
                  aria-pressed={reduceMotion}
                >
                  <span className="toggle-slider" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AccessibilityPanel

