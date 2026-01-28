import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  Users, Calendar, Code, Cpu, Settings, Wrench, MessageSquare, 
  Award, BookOpen, Download, Building2, Heart, Target, Lightbulb,
  Share2, GraduationCap, Clock, FileText, ExternalLink, Image as ImageIcon
} from 'lucide-react'
import './Club.css'

const Club = () => {
  const { t } = useTranslation()
  const [clubData, setClubData] = useState({
    history: '',
    values: [],
    localPhotos: [],
    currentProjects: [],
    pastProjects: [],
    team: {
      board: [],
      poles: [],
      teachers: []
    },
    schedule: '',
    resources: [],
    partners: []
  })

  useEffect(() => {
    const savedClubData = localStorage.getItem('adminClubData')
    if (savedClubData) {
      setClubData(JSON.parse(savedClubData))
    } else {
      setClubData({
        history: 'Le club LLA Robotique a été créé en 2020 par un groupe d\'élèves passionnés de technologie et d\'innovation. Depuis sa création, le club a grandi et évolué pour devenir une référence en robotique scolaire.',
        values: [
          { icon: Users, title: 'Travail d\'équipe', description: 'Collaboration et entraide au cœur de nos projets' },
          { icon: Lightbulb, title: 'Innovation', description: 'Créativité et recherche de solutions innovantes' },
          { icon: Target, title: 'Esprit critique', description: 'Analyse et réflexion sur nos réalisations' },
          { icon: Share2, title: 'Partage', description: 'Transmission des connaissances entre membres' },
          { icon: GraduationCap, title: 'STEM', description: 'Sciences, Technologie, Ingénierie, Mathématiques' }
        ],
        localPhotos: [
          '/Photo/Photo Robotique 2024/20250118_100210.jpg',
          '/Photo/Photo Robotique 2024/20250118_112132.jpg',
          '/Photo/Photo Robotique 2024/20250118_114350.jpg'
        ],
        currentProjects: [
          {
            id: 1,
            name: 'Robot Compétition 2024',
            challenge: 'Coupe de France de Robotique',
            language: 'Python',
            components: ['Raspberry Pi 4', 'Arduino Uno', 'Servomoteurs', 'Capteurs LiDAR'],
            process: ['CAO (Fusion 360)', 'Impression 3D', 'Découpe laser'],
            description: 'Notre robot de compétition pour la Coupe de France de Robotique 2024.'
          }
        ],
        pastProjects: [],
        team: {
          board: [
            { name: 'Président', role: 'Président', photo: '', quote: 'Passionné de robotique depuis toujours' },
            { name: 'Secrétaire', role: 'Secrétaire', photo: '', quote: 'Organisation et communication' },
            { name: 'Trésorier', role: 'Trésorier', photo: '', quote: 'Gestion financière et partenariats' }
          ],
          poles: [
            {
              name: 'Pôle Mécanique',
              icon: Wrench,
              description: 'Conception et construction du châssis',
              members: []
            },
            {
              name: 'Pôle Électronique',
              icon: Cpu,
              description: 'Câblage et soudure des composants',
              members: []
            },
            {
              name: 'Pôle Programmation',
              icon: Code,
              description: 'Développement de l\'IA et des algorithmes',
              members: []
            },
            {
              name: 'Pôle Communication',
              icon: MessageSquare,
              description: 'Gestion du site web et des sponsors',
              members: []
            }
          ],
          teachers: [
            { name: 'M. Professeur', role: 'Encadrant Principal', photo: '', quote: 'Merci pour votre engagement' },
            { name: 'M. Professeur', role: 'Encadrant Principal', photo: '', quote: 'Merci pour votre engagement' }
          ]
        },
        schedule: 'Réunions : Mardi de 13h à 14h et Jeudi après-midi',
        resources: [
          { title: 'Tutoriel Servomoteur', url: '#', description: 'Comment programmer un servomoteur avec Arduino' },
          { title: 'Guide CAO', url: '#', description: 'Introduction à la conception assistée par ordinateur' }
        ],
        partners: [
          { name: 'Partenaire 1', logo: '', description: 'Soutien matériel et financier' },
          { name: 'Partenaire 2', logo: '', description: 'Fourniture de composants électroniques' }
        ]
      })
    }
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="club-page">
      <motion.section
        className="club-hero"
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
            Le Club
          </motion.h1>
          <motion.p
            className="page-subtitle"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez notre histoire, nos valeurs et notre équipe
          </motion.p>
        </div>
      </motion.section>

      <ScrollSection className="presentation-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Présentation du Club
          </motion.h2>

          <div className="presentation-content">
            <motion.div
              className="history-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3>Notre Histoire</h3>
              <p>{clubData.history}</p>
            </motion.div>

            <motion.div
              className="values-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3>Nos Valeurs</h3>
              <div className="values-list">
                {clubData.values.map((value, index) => {
                  const Icon = value.icon
                  return (
                    <motion.div
                      key={index}
                      className="value-card"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="value-icon">
                        <Icon size={32} />
                      </div>
                      <h4>{value.title}</h4>
                      <p>{value.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {clubData.localPhotos && clubData.localPhotos.length > 0 && (
              <motion.div
                className="local-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h3>Notre équipe</h3>
                <div className="local-gallery">
                  {clubData.localPhotos.map((photo, index) => (
                    <motion.div
                      key={index}
                      className="local-photo"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img src={photo} alt={`Local ${index + 1}`} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection className="projects-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Les Projets
          </motion.h2>

          {clubData.currentProjects && clubData.currentProjects.length > 0 && (
            <div className="current-projects">
              <h3>Projets en Cours</h3>
              <div className="projects-grid">
                {clubData.currentProjects.map((project, index) => (
                  <ProjectCard key={project.id || index} project={project} delay={index * 0.1} />
                ))}
              </div>
            </div>
          )}

          {clubData.pastProjects && clubData.pastProjects.length > 0 && (
            <div className="past-projects">
              <h3>Projets Passés</h3>
              <div className="projects-grid">
                {clubData.pastProjects.map((project, index) => (
                  <ProjectCard key={project.id || index} project={project} delay={index * 0.1} />
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollSection>

      <ScrollSection className="team-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            L'Équipe
          </motion.h2>

          {clubData.team.board && clubData.team.board.length > 0 && (
            <div className="board-section">
              <h3>Membres</h3>
              <div className="board-grid">
                {clubData.team.board.map((member, index) => (
                  <TeamMemberCard key={index} member={member} delay={index * 0.1} />
                ))}
              </div>
            </div>
          )}

          {clubData.team.poles && clubData.team.poles.length > 0 && (
            <div className="poles-section">
              <h3>Les Pôles</h3>
              <div className="poles-grid">
                {clubData.team.poles.map((pole, index) => {
                  const Icon = pole.icon
                  return (
                    <motion.div
                      key={index}
                      className="pole-card"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      <div className="pole-icon">
                        <Icon size={40} />
                      </div>
                      <h4>{pole.name}</h4>
                      <p>{pole.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {clubData.team.teachers && clubData.team.teachers.length > 0 && (
            <div className="teachers-section">
              <h3>Encadrants</h3>
              <div className="teachers-grid">
                {clubData.team.teachers.map((teacher, index) => (
                  <TeamMemberCard key={index} member={teacher} delay={index * 0.1} />
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollSection>

      <ScrollSection className="members-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Espace Membres
          </motion.h2>

          <div className="members-content">
            {clubData.schedule && (
              <motion.div
                className="schedule-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Clock size={32} />
                <h3>Planning</h3>
                <p>{clubData.schedule}</p>
              </motion.div>
            )}

            {clubData.resources && clubData.resources.length > 0 && (
              <motion.div
                className="resources-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h3>Ressources Pédagogiques</h3>
                <div className="resources-list">
                  {clubData.resources.map((resource, index) => (
                    <motion.a
                      key={index}
                      href={resource.url}
                      className="resource-card"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <BookOpen size={24} />
                      <div>
                        <h4>{resource.title}</h4>
                        <p>{resource.description}</p>
                      </div>
                      <ExternalLink size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection className="partners-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Partenaires et Sponsors
          </motion.h2>

          <motion.p
            className="partners-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Sans le soutien de nos partenaires, nous ne pourrions pas acheter les composants électroniques ni payer les inscriptions aux concours. Un grand merci à tous !
          </motion.p>

          {clubData.partners && clubData.partners.length > 0 && (
            <div className="partners-grid">
              {clubData.partners.map((partner, index) => (
                <motion.div
                  key={index}
                  className="partner-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {partner.logo && (
                    <div className="partner-logo">
                      <img src={partner.logo} alt={partner.name} />
                    </div>
                  )}
                  <h4>{partner.name}</h4>
                  <p>{partner.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            className="become-partner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Building2 size={48} />
            <h3>Devenir Partenaire</h3>
            <p>Vous souhaitez nous soutenir ? Contactez-nous pour recevoir notre dossier de sponsoring.</p>
            <motion.button
              className="partner-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Télécharger le Dossier
            </motion.button>
          </motion.div>
        </div>
      </ScrollSection>
    </div>
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

const ProjectCard = ({ project, delay }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="project-header">
        <Award size={32} className="award-icon" />
        <h4>{project.name}</h4>
      </div>
      <p className="project-challenge">{project.challenge}</p>
      <p className="project-description">{project.description}</p>
      
      <div className="project-details">
        <div className="detail-item">
          <Code size={18} />
          <span><strong>Langage:</strong> {project.language}</span>
        </div>
        <div className="detail-item">
          <Cpu size={18} />
          <span><strong>Composants:</strong> {project.components?.join(', ')}</span>
        </div>
        <div className="detail-item">
          <Settings size={18} />
          <span><strong>Processus:</strong> {project.process?.join(', ')}</span>
        </div>
      </div>
    </motion.div>
  )
}

const TeamMemberCard = ({ member, delay }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      className="member-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {member.photo ? (
        <div className="member-photo">
          <img src={member.photo} alt={member.name} />
        </div>
      ) : (
        <div className="member-photo-placeholder">
          <Users size={40} />
        </div>
      )}
      <h4>{member.name}</h4>
      <p className="member-role">{member.role}</p>
      {member.quote && <p className="member-quote">"{member.quote}"</p>}
    </motion.div>
  )
}

export default Club
