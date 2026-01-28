import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Trophy, Award, Calendar, Star } from 'lucide-react'
import './Results.css'

const Results = () => {
  const { t } = useTranslation()

  const results2023 = [
    {
      competition: 'Compétition Régionale',
      position: '1er Place',
      award: 'Médaille d\'Or',
      description: 'Excellente performance en navigation autonome et précision'
    },
    {
      competition: 'Championnat National',
      position: '3ème Place',
      award: 'Médaille de Bronze',
      description: 'Reconnaissance pour l\'innovation technique'
    },
    {
      competition: 'Tournoi Inter-Écoles',
      position: '2ème Place',
      award: 'Médaille d\'Argent',
      description: 'Meilleure conception mécanique'
    }
  ]

  const results2024 = [
    {
      competition: 'Compétition Internationale',
      position: '2ème Place',
      award: 'Médaille d\'Argent',
      description: 'Performance exceptionnelle en toutes catégories'
    },
    {
      competition: 'Championnat National',
      position: '1er Place',
      award: 'Médaille d\'Or',
      description: 'Victoire complète avec record de points'
    },
    {
      competition: 'Innovation Challenge',
      position: '1er Place',
      award: 'Prix Innovation',
      description: 'Reconnaissance pour l\'approche créative'
    }
  ]

  return (
    <div className="results-page">
      <motion.section
        className="results-hero"
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
            {t('results.title')}
          </motion.h1>
          <motion.p
            className="page-subtitle"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('results.subtitle')}
          </motion.p>
        </div>
      </motion.section>

      <section className="results-content">
        <div className="container">
          <YearSection
            year={t('results.year1')}
            yearNumber="2023"
            results={results2023}
            delay={0}
          />

          <YearSection
            year={t('results.year2')}
            yearNumber="2024"
            results={results2024}
            delay={0.2}
          />
        </div>
      </section>
    </div>
  )
}

const YearSection = ({ year, yearNumber, results, delay }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      className="year-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="year-header"
        whileHover={{ scale: 1.05 }}
      >
        <Calendar size={32} />
        <h2>{year}</h2>
        <div className="year-badge">{yearNumber}</div>
      </motion.div>

      <div className="results-grid">
        {results.map((result, index) => (
          <ResultCard
            key={index}
            result={result}
            index={index}
            delay={delay + index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  )
}

const ResultCard = ({ result, index, delay }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const getPositionColor = (position) => {
    if (position.includes('1er')) return '#FFD700'
    if (position.includes('2ème')) return '#C0C0C0'
    if (position.includes('3ème')) return '#CD7F32'
    return '#D4A5A5'
  }

  return (
    <motion.div
      ref={ref}
      className="result-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="result-header">
        <div className="result-icon">
          {index === 0 ? (
            <Trophy size={40} style={{ color: getPositionColor(result.position) }} />
          ) : (
            <Award size={40} style={{ color: getPositionColor(result.position) }} />
          )}
        </div>
        <div className="result-position" style={{ color: getPositionColor(result.position) }}>
          {result.position}
        </div>
      </div>

      <h3 className="result-competition">{result.competition}</h3>
      
      <div className="result-award">
        <Star size={16} />
        <span>{result.award}</span>
      </div>

      <p className="result-description">{result.description}</p>

      <div className="result-decoration">
        <motion.div
          className="decoration-line"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export default Results

