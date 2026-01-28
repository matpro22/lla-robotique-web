import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Unlock, Save, Image, Palette, FileText, X, Plus, Trash2, Newspaper, Edit, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './Admin.css'

const Admin = () => {
  const { t, i18n } = useTranslation()
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('texts')
  const [saved, setSaved] = useState(false)

  const adminPassword = 'LLA2024Admin'

  const [texts, setTexts] = useState({
    home: {
      title: '',
      subtitle: '',
      cta: '',
      about: { title: '', description: '' },
      why: { title: '', items: { '1': '', '2': '', '3': '', '4': '' } },
      stats: { title: '', competitions: '', awards: '', members: '', projects: '' }
    },
    results: {
      title: '',
      subtitle: '',
      year1: '',
      year2: ''
    },
    robot: {
      title: '',
      subtitle: '',
      specs: { title: '', dimensions: '', weight: '', sensors: '', actuators: '', power: '', control: '' },
      features: { title: '', autonomous: '', precision: '', adaptability: '', speed: '' }
    }
  })

  const [colors, setColors] = useState({
    primary: '#4A90E2',
    secondary: '#E67E22',
    accent: '#C0392B',
    text: '#2C3E50',
    textLight: '#5D6D7E',
    bg: '#ECF0F1',
    border: '#BDC3C7'
  })

  const [photos, setPhotos] = useState({
    hero: '/Photo/Photo Robotique 2024/20250118_100210.jpg',
    about: '/Photo/Photo Robotique 2024/20250118_114435.jpg',
    gallery: [
      '/Photo/Photo Robotique 2024/20250115_143539.jpg',
      '/Photo/Photo Robotique 2024/20250115_150331.jpg',
      '/Photo/Photo Robotique 2024/20250118_091145.jpg',
      '/Photo/Photo Robotique 2024/20250118_091712.jpg',
      '/Photo/Photo Robotique 2024/20250118_100903.jpg',
      '/Photo/Photo Robotique 2024/20250118_112857.jpg'
    ]
  })

  const [news, setNews] = useState([])
  const [editingNews, setEditingNews] = useState(null)
  const [newNews, setNewNews] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    fullContent: '',
    image: '',
    images: [],
    category: 'Compétition'
  })

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
  const [editingProject, setEditingProject] = useState(null)
  const [editingMember, setEditingMember] = useState(null)
  const [editingPartner, setEditingPartner] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      loadSavedData()
    }
  }, [isAuthenticated])

  const loadSavedData = () => {
    const savedTexts = localStorage.getItem('adminTexts')
    const savedColors = localStorage.getItem('adminColors')
    const savedPhotos = localStorage.getItem('adminPhotos')
    const savedNews = localStorage.getItem('adminNews')
    const savedClubData = localStorage.getItem('adminClubData')

    if (savedTexts) {
      setTexts(JSON.parse(savedTexts))
    } else {
      loadDefaultTexts()
    }

    if (savedColors) {
      const colorsData = JSON.parse(savedColors)
      setColors(colorsData)
      applyColors(colorsData)
    }

    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos))
    }

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

    if (savedClubData) {
      setClubData(JSON.parse(savedClubData))
    }
  }

  const loadDefaultTexts = () => {
    const fr = i18n.getResourceBundle('fr', 'translation')
    setTexts({
      home: fr.home,
      results: {
        title: fr.results.title,
        subtitle: fr.results.subtitle,
        year1: fr.results.year1,
        year2: fr.results.year2
      },
      robot: fr.robot
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === adminPassword) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Mot de passe incorrect')
      setPassword('')
    }
  }

  const saveTexts = () => {
    localStorage.setItem('adminTexts', JSON.stringify(texts))
    const currentFr = i18n.getResourceBundle('fr', 'translation') || {}
    const updatedFr = {
      ...currentFr,
      home: {
        ...currentFr.home,
        ...texts.home
      },
      results: {
        ...currentFr.results,
        ...texts.results
      },
      robot: {
        ...currentFr.robot,
        ...texts.robot
      }
    }
    i18n.addResourceBundle('fr', 'translation', updatedFr, true, true)
    i18n.changeLanguage('fr')
    showSaved()
  }

  const saveColors = () => {
    localStorage.setItem('adminColors', JSON.stringify(colors))
    applyColors(colors)
    showSaved()
  }

  const applyColors = (colorData) => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', colorData.primary)
    root.style.setProperty('--color-secondary', colorData.secondary)
    root.style.setProperty('--color-accent', colorData.accent)
    root.style.setProperty('--color-text', colorData.text)
    root.style.setProperty('--color-text-light', colorData.textLight)
    root.style.setProperty('--color-bg', colorData.bg)
    root.style.setProperty('--color-border', colorData.border)
  }

  const savePhotos = () => {
    localStorage.setItem('adminPhotos', JSON.stringify(photos))
    showSaved()
  }

  const saveNews = () => {
    localStorage.setItem('adminNews', JSON.stringify(news))
    showSaved()
  }

  const addNews = () => {
    const newsItem = {
      id: Date.now(),
      ...newNews,
      images: newNews.images && newNews.images.length > 0 ? newNews.images.filter(img => img.trim() !== '') : []
    }
    setNews([...news, newsItem])
    setNewNews({
      title: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      fullContent: '',
      image: '',
      images: [],
      category: 'Compétition'
    })
  }

  const updateNews = (id) => {
    const updatedNews = {
      ...editingNews,
      images: editingNews.images && editingNews.images.length > 0 ? editingNews.images.filter(img => img.trim() !== '') : []
    }
    setNews(news.map(item => item.id === id ? updatedNews : item))
    setEditingNews(null)
  }

  const deleteNews = (id) => {
    setNews(news.filter(item => item.id !== id))
  }

  const startEditNews = (item) => {
    setEditingNews({ ...item })
  }

  const saveClubData = () => {
    localStorage.setItem('adminClubData', JSON.stringify(clubData))
    showSaved()
  }

  const addProject = (type) => {
    const newProject = {
      id: Date.now(),
      name: '',
      challenge: '',
      language: '',
      components: [],
      process: [],
      description: ''
    }
    if (type === 'current') {
      setClubData({ ...clubData, currentProjects: [...clubData.currentProjects, newProject] })
    } else {
      setClubData({ ...clubData, pastProjects: [...clubData.pastProjects, newProject] })
    }
  }

  const updateProject = (id, type) => {
    if (type === 'current') {
      setClubData({
        ...clubData,
        currentProjects: clubData.currentProjects.map(p => p.id === id ? editingProject : p)
      })
    } else {
      setClubData({
        ...clubData,
        pastProjects: clubData.pastProjects.map(p => p.id === id ? editingProject : p)
      })
    }
    setEditingProject(null)
  }

  const deleteProject = (id, type) => {
    if (type === 'current') {
      setClubData({ ...clubData, currentProjects: clubData.currentProjects.filter(p => p.id !== id) })
    } else {
      setClubData({ ...clubData, pastProjects: clubData.pastProjects.filter(p => p.id !== id) })
    }
  }

  const addMember = (type) => {
    const newMember = { name: '', role: '', photo: '', quote: '' }
    if (type === 'board') {
      setClubData({
        ...clubData,
        team: { ...clubData.team, board: [...clubData.team.board, newMember] }
      })
    } else if (type === 'teacher') {
      setClubData({
        ...clubData,
        team: { ...clubData.team, teachers: [...clubData.team.teachers, newMember] }
      })
    }
  }

  const updateMember = (index, type) => {
    if (type === 'board') {
      const newBoard = [...clubData.team.board]
      newBoard[index] = editingMember
      setClubData({ ...clubData, team: { ...clubData.team, board: newBoard } })
    } else if (type === 'teacher') {
      const newTeachers = [...clubData.team.teachers]
      newTeachers[index] = editingMember
      setClubData({ ...clubData, team: { ...clubData.team, teachers: newTeachers } })
    }
    setEditingMember(null)
  }

  const deleteMember = (index, type) => {
    if (type === 'board') {
      setClubData({
        ...clubData,
        team: { ...clubData.team, board: clubData.team.board.filter((_, i) => i !== index) }
      })
    } else if (type === 'teacher') {
      setClubData({
        ...clubData,
        team: { ...clubData.team, teachers: clubData.team.teachers.filter((_, i) => i !== index) }
      })
    }
  }

  const addPartner = () => {
    setClubData({
      ...clubData,
      partners: [...clubData.partners, { name: '', logo: '', description: '' }]
    })
  }

  const updatePartner = (index) => {
    const newPartners = [...clubData.partners]
    newPartners[index] = editingPartner
    setClubData({ ...clubData, partners: newPartners })
    setEditingPartner(null)
  }

  const deletePartner = (index) => {
    setClubData({ ...clubData, partners: clubData.partners.filter((_, i) => i !== index) })
  }

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handlePhotoChange = (type, value, index = null) => {
    if (type === 'gallery') {
      const newGallery = [...photos.gallery]
      if (index !== null) {
        newGallery[index] = value
      } else {
        newGallery.push(value)
      }
      setPhotos({ ...photos, gallery: newGallery })
    } else {
      setPhotos({ ...photos, [type]: value })
    }
  }

  const removeGalleryPhoto = (index) => {
    const newGallery = photos.gallery.filter((_, i) => i !== index)
    setPhotos({ ...photos, gallery: newGallery })
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <motion.section
          className="admin-auth"
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
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Lock size={64} />
              </motion.div>

              <h1>Administration</h1>
              <p>Accès réservé aux administrateurs</p>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="input-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError('')
                    }}
                    placeholder="Entrez le mot de passe"
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
                  Entrer
                  <Unlock size={20} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.section>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Panneau d'Administration</h1>
        <motion.button
          className="logout-btn"
          onClick={() => setIsAuthenticated(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Déconnexion
        </motion.button>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'texts' ? 'active' : ''}`}
          onClick={() => setActiveTab('texts')}
        >
          <FileText size={20} />
          Textes
        </button>
        <button
          className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          <Image size={20} />
          Photos
        </button>
        <button
          className={`tab-btn ${activeTab === 'colors' ? 'active' : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          <Palette size={20} />
          Couleurs
        </button>
        <button
          className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          <Newspaper size={20} />
          Actualités
        </button>
        <button
          className={`tab-btn ${activeTab === 'club' ? 'active' : ''}`}
          onClick={() => setActiveTab('club')}
        >
          <Users size={20} />
          Le Club
        </button>
      </div>

      {saved && (
        <motion.div
          className="save-notification"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Save size={20} />
          Modifications enregistrées !
        </motion.div>
      )}

      <div className="admin-content">
        {activeTab === 'texts' && (
          <div className="admin-section">
            <h2>Modification des Textes</h2>
            
            <div className="text-section">
              <h3>Page d'Accueil</h3>
              <div className="form-group">
                <label>Titre principal</label>
                <input
                  type="text"
                  value={texts.home.title}
                  onChange={(e) => setTexts({ ...texts, home: { ...texts.home, title: e.target.value } })}
                />
              </div>
              <div className="form-group">
                <label>Sous-titre</label>
                <input
                  type="text"
                  value={texts.home.subtitle}
                  onChange={(e) => setTexts({ ...texts, home: { ...texts.home, subtitle: e.target.value } })}
                />
              </div>
              <div className="form-group">
                <label>Bouton CTA</label>
                <input
                  type="text"
                  value={texts.home.cta}
                  onChange={(e) => setTexts({ ...texts, home: { ...texts.home, cta: e.target.value } })}
                />
              </div>
              <div className="form-group">
                <label>Titre "À Propos"</label>
                <input
                  type="text"
                  value={texts.home.about?.title || ''}
                  onChange={(e) => setTexts({ ...texts, home: { ...texts.home, about: { ...texts.home.about, title: e.target.value } } })}
                />
              </div>
              <div className="form-group">
                <label>Description "À Propos"</label>
                <textarea
                  value={texts.home.about?.description || ''}
                  onChange={(e) => setTexts({ ...texts, home: { ...texts.home, about: { ...texts.home.about, description: e.target.value } } })}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Titre "Pourquoi Nous Rejoindre"</label>
                <input
                  type="text"
                  value={texts.home.why?.title || ''}
                  onChange={(e) => setTexts({ ...texts, home: { ...texts.home, why: { ...texts.home.why, title: e.target.value } } })}
                />
              </div>
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="form-group">
                  <label>Point {num}</label>
                  <input
                    type="text"
                    value={texts.home.why?.items?.[num.toString()] || ''}
                    onChange={(e) => setTexts({
                      ...texts,
                      home: {
                        ...texts.home,
                        why: {
                          ...texts.home.why,
                          items: { ...texts.home.why.items, [num]: e.target.value }
                        }
                      }
                    })}
                  />
                </div>
              ))}
            </div>

            <div className="text-section">
              <h3>Page Résultats</h3>
              <div className="form-group">
                <label>Titre</label>
                <input
                  type="text"
                  value={texts.results.title}
                  onChange={(e) => setTexts({ ...texts, results: { ...texts.results, title: e.target.value } })}
                />
              </div>
              <div className="form-group">
                <label>Sous-titre</label>
                <input
                  type="text"
                  value={texts.results.subtitle}
                  onChange={(e) => setTexts({ ...texts, results: { ...texts.results, subtitle: e.target.value } })}
                />
              </div>
            </div>

            <div className="text-section">
              <h3>Page Robot</h3>
              <div className="form-group">
                <label>Titre</label>
                <input
                  type="text"
                  value={texts.robot.title}
                  onChange={(e) => setTexts({ ...texts, robot: { ...texts.robot, title: e.target.value } })}
                />
              </div>
              <div className="form-group">
                <label>Sous-titre</label>
                <input
                  type="text"
                  value={texts.robot.subtitle}
                  onChange={(e) => setTexts({ ...texts, robot: { ...texts.robot, subtitle: e.target.value } })}
                />
              </div>
            </div>

            <motion.button
              className="save-btn"
              onClick={saveTexts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={20} />
              Enregistrer les Textes
            </motion.button>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="admin-section">
            <h2>Gestion des Photos</h2>
            
            <div className="photo-section">
              <h3>Photo Hero (Arrière-plan titre)</h3>
              <div className="photo-preview">
                <img src={photos.hero} alt="Hero" />
              </div>
              <div className="form-group">
                <label>Chemin de l'image</label>
                <input
                  type="text"
                  value={photos.hero}
                  onChange={(e) => handlePhotoChange('hero', e.target.value)}
                  placeholder="/Photo/Photo Robotique 2024/image.jpg"
                />
              </div>
            </div>

            <div className="photo-section">
              <h3>Photo Section "À Propos"</h3>
              <div className="photo-preview">
                <img src={photos.about} alt="About" />
              </div>
              <div className="form-group">
                <label>Chemin de l'image</label>
                <input
                  type="text"
                  value={photos.about}
                  onChange={(e) => handlePhotoChange('about', e.target.value)}
                  placeholder="/Photo/Photo Robotique 2024/image.jpg"
                />
              </div>
            </div>

            <div className="photo-section">
              <h3>Galerie Photos</h3>
              <div className="gallery-admin">
                {photos.gallery.map((photo, index) => (
                  <div key={index} className="gallery-item-admin">
                    <img src={photo} alt={`Gallery ${index + 1}`} />
                    <input
                      type="text"
                      value={photo}
                      onChange={(e) => handlePhotoChange('gallery', e.target.value, index)}
                      placeholder="/Photo/Photo Robotique 2024/image.jpg"
                    />
                    <button
                      className="remove-btn"
                      onClick={() => removeGalleryPhoto(index)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  className="add-photo-btn"
                  onClick={() => handlePhotoChange('gallery', '/Photo/Photo Robotique 2024/image.jpg')}
                >
                  <Plus size={20} />
                  Ajouter une photo
                </button>
              </div>
            </div>

            <motion.button
              className="save-btn"
              onClick={savePhotos}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={20} />
              Enregistrer les Photos
            </motion.button>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="admin-section">
            <h2>Modification des Couleurs</h2>
            
            <div className="colors-grid">
              {Object.entries(colors).map(([key, value]) => (
                <div key={key} className="color-picker-group">
                  <label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                  <div className="color-picker-wrapper">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                      className="color-input"
                    />
                  </div>
                  <div className="color-preview" style={{ backgroundColor: value }} />
                </div>
              ))}
            </div>

            <motion.button
              className="save-btn"
              onClick={saveColors}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={20} />
              Enregistrer les Couleurs
            </motion.button>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="admin-section">
            <h2>Gestion des Actualités</h2>
            
            <div className="news-admin-form">
              <h3>{editingNews ? 'Modifier l\'actualité' : 'Ajouter une nouvelle actualité'}</h3>
              <div className="form-group">
                <label>Titre</label>
                <input
                  type="text"
                  value={editingNews ? editingNews.title : newNews.title}
                  onChange={(e) => editingNews 
                    ? setEditingNews({ ...editingNews, title: e.target.value })
                    : setNewNews({ ...newNews, title: e.target.value })
                  }
                  placeholder="Titre de l'actualité"
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={editingNews ? editingNews.date : newNews.date}
                  onChange={(e) => editingNews
                    ? setEditingNews({ ...editingNews, date: e.target.value })
                    : setNewNews({ ...newNews, date: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Catégorie</label>
                <select
                  value={editingNews ? editingNews.category : newNews.category}
                  onChange={(e) => editingNews
                    ? setEditingNews({ ...editingNews, category: e.target.value })
                    : setNewNews({ ...newNews, category: e.target.value })
                  }
                >
                  <option value="Compétition">Compétition</option>
                  <option value="Robot">Robot</option>
                  <option value="Équipe">Équipe</option>
                  <option value="Événement">Événement</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description (courte)</label>
                <textarea
                  value={editingNews ? editingNews.description : newNews.description}
                  onChange={(e) => editingNews
                    ? setEditingNews({ ...editingNews, description: e.target.value })
                    : setNewNews({ ...newNews, description: e.target.value })
                  }
                  placeholder="Description courte de l'actualité"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Contenu Complet (article détaillé)</label>
                <textarea
                  value={editingNews ? editingNews.fullContent || '' : newNews.fullContent}
                  onChange={(e) => editingNews
                    ? setEditingNews({ ...editingNews, fullContent: e.target.value })
                    : setNewNews({ ...newNews, fullContent: e.target.value })
                  }
                  placeholder="Contenu complet de l'article (peut contenir plusieurs paragraphes)"
                  rows="6"
                />
                <small style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                  Vous pouvez utiliser plusieurs lignes pour créer des paragraphes
                </small>
              </div>
              <div className="form-group">
                <label>Image Principale (chemin)</label>
                <input
                  type="text"
                  value={editingNews ? editingNews.image || '' : newNews.image}
                  onChange={(e) => editingNews
                    ? setEditingNews({ ...editingNews, image: e.target.value })
                    : setNewNews({ ...newNews, image: e.target.value })
                  }
                  placeholder="/Photo/Photo Robotique 2024/image.jpg"
                />
                {(editingNews ? editingNews.image : newNews.image) && (
                  <div className="photo-preview-small">
                    <img src={editingNews ? editingNews.image : newNews.image} alt="Preview" />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Galerie d'Images (plusieurs photos)</label>
                <div className="images-list-admin">
                  {(editingNews ? (editingNews.images || []) : (newNews.images || [])).map((img, index) => (
                    <div key={index} className="image-item-admin">
                      <input
                        type="text"
                        value={img}
                        onChange={(e) => {
                          const images = editingNews ? [...(editingNews.images || [])] : [...(newNews.images || [])]
                          images[index] = e.target.value
                          if (editingNews) {
                            setEditingNews({ ...editingNews, images })
                          } else {
                            setNewNews({ ...newNews, images })
                          }
                        }}
                        placeholder="/Photo/Photo Robotique 2024/image.jpg"
                      />
                      {img && (
                        <div className="photo-preview-tiny">
                          <img src={img} alt={`Preview ${index + 1}`} />
                        </div>
                      )}
                      <button
                        className="remove-image-btn"
                        onClick={() => {
                          const images = editingNews ? [...(editingNews.images || [])] : [...(newNews.images || [])]
                          images.splice(index, 1)
                          if (editingNews) {
                            setEditingNews({ ...editingNews, images })
                          } else {
                            setNewNews({ ...newNews, images })
                          }
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-image-btn"
                    onClick={() => {
                      const images = editingNews ? [...(editingNews.images || [])] : [...(newNews.images || [])]
                      images.push('')
                      if (editingNews) {
                        setEditingNews({ ...editingNews, images })
                      } else {
                        setNewNews({ ...newNews, images })
                      }
                    }}
                  >
                    <Plus size={16} />
                    Ajouter une image
                  </button>
                </div>
                <small style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                  Ajoutez plusieurs images pour créer une galerie dans le modal
                </small>
              </div>
              <div className="form-actions">
                {editingNews ? (
                  <>
                    <motion.button
                      className="save-btn-small"
                      onClick={() => updateNews(editingNews.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save size={18} />
                      Enregistrer
                    </motion.button>
                    <motion.button
                      className="cancel-btn"
                      onClick={() => setEditingNews(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Annuler
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    className="save-btn-small"
                    onClick={addNews}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={18} />
                    Ajouter
                  </motion.button>
                )}
              </div>
            </div>

            <div className="news-list">
              <h3>Actualités existantes ({news.length})</h3>
              {news.length === 0 ? (
                <p className="no-items">Aucune actualité pour le moment.</p>
              ) : (
                <div className="news-items">
                  {news.map((item) => (
                    <div key={item.id} className="news-item-admin">
                      {item.image && (
                        <div className="news-item-image">
                          <img src={item.image} alt={item.title} />
                        </div>
                      )}
                      <div className="news-item-content">
                        <div className="news-item-header">
                          <h4>{item.title}</h4>
                          <span className="news-item-category">{item.category}</span>
                        </div>
                        <p className="news-item-date">{new Date(item.date).toLocaleDateString('fr-FR')}</p>
                        <p className="news-item-description">{item.description}</p>
                      </div>
                      <div className="news-item-actions">
                        <button
                          className="edit-btn"
                          onClick={() => startEditNews(item)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteNews(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <motion.button
              className="save-btn"
              onClick={saveNews}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={20} />
              Enregistrer les Actualités
            </motion.button>
          </div>
        )}

        {activeTab === 'club' && (
          <div className="admin-section">
            <h2>Gestion du Club</h2>

            <div className="club-admin-section">
              <h3>Présentation</h3>
              <div className="form-group">
                <label>Histoire du Club</label>
                <textarea
                  value={clubData.history}
                  onChange={(e) => setClubData({ ...clubData, history: e.target.value })}
                  rows="4"
                  placeholder="Racontez l'histoire de la création du club..."
                />
              </div>
              <div className="form-group">
                <label>Photos du Local</label>
                <div className="images-list-admin">
                  {(clubData.localPhotos || []).map((photo, index) => (
                    <div key={index} className="image-item-admin">
                      <input
                        type="text"
                        value={photo}
                        onChange={(e) => {
                          const photos = [...clubData.localPhotos]
                          photos[index] = e.target.value
                          setClubData({ ...clubData, localPhotos: photos })
                        }}
                        placeholder="/Photo/Photo Robotique 2024/image.jpg"
                      />
                      {photo && (
                        <div className="photo-preview-tiny">
                          <img src={photo} alt={`Local ${index + 1}`} />
                        </div>
                      )}
                      <button
                        className="remove-image-btn"
                        onClick={() => {
                          setClubData({
                            ...clubData,
                            localPhotos: clubData.localPhotos.filter((_, i) => i !== index)
                          })
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-image-btn"
                    onClick={() => {
                      setClubData({
                        ...clubData,
                        localPhotos: [...(clubData.localPhotos || []), '']
                      })
                    }}
                  >
                    <Plus size={16} />
                    Ajouter une photo
                  </button>
                </div>
              </div>
            </div>

            <div className="club-admin-section">
              <h3>Projets en Cours</h3>
              {clubData.currentProjects.map((project, index) => (
                <div key={project.id || index} className="project-admin-item">
                  {editingProject?.id === project.id ? (
                    <ProjectEditForm
                      project={editingProject}
                      setProject={setEditingProject}
                      onSave={() => updateProject(project.id, 'current')}
                      onCancel={() => setEditingProject(null)}
                    />
                  ) : (
                    <>
                      <div className="project-admin-preview">
                        <h4>{project.name || 'Nouveau projet'}</h4>
                        <p>{project.challenge}</p>
                      </div>
                      <div className="project-admin-actions">
                        <button className="edit-btn" onClick={() => setEditingProject({ ...project })}>
                          <Edit size={16} />
                        </button>
                        <button className="delete-btn" onClick={() => deleteProject(project.id, 'current')}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <button className="add-item-btn" onClick={() => addProject('current')}>
                <Plus size={18} />
                Ajouter un projet en cours
              </button>
            </div>

            <div className="club-admin-section">
              <h3>Projets Passés</h3>
              {clubData.pastProjects.map((project, index) => (
                <div key={project.id || index} className="project-admin-item">
                  {editingProject?.id === project.id ? (
                    <ProjectEditForm
                      project={editingProject}
                      setProject={setEditingProject}
                      onSave={() => updateProject(project.id, 'past')}
                      onCancel={() => setEditingProject(null)}
                    />
                  ) : (
                    <>
                      <div className="project-admin-preview">
                        <h4>{project.name || 'Nouveau projet'}</h4>
                        <p>{project.challenge}</p>
                      </div>
                      <div className="project-admin-actions">
                        <button className="edit-btn" onClick={() => setEditingProject({ ...project })}>
                          <Edit size={16} />
                        </button>
                        <button className="delete-btn" onClick={() => deleteProject(project.id, 'past')}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <button className="add-item-btn" onClick={() => addProject('past')}>
                <Plus size={18} />
                Ajouter un projet passé
              </button>
            </div>

            <div className="club-admin-section">
              <h3>Membres</h3>
              {clubData.team.board.map((member, index) => (
                <div key={index} className="member-admin-item">
                  {editingMember && editingMember.index === index && editingMember.type === 'board' ? (
                    <MemberEditForm
                      member={editingMember}
                      setMember={setEditingMember}
                      onSave={() => updateMember(index, 'board')}
                      onCancel={() => setEditingMember(null)}
                    />
                  ) : (
                    <>
                      <div className="member-admin-preview">
                        <h4>{member.name || 'Nouveau membre'}</h4>
                        <p>{member.role}</p>
                      </div>
                      <div className="member-admin-actions">
                        <button className="edit-btn" onClick={() => setEditingMember({ ...member, index, type: 'board' })}>
                          <Edit size={16} />
                        </button>
                        <button className="delete-btn" onClick={() => deleteMember(index, 'board')}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <button className="add-item-btn" onClick={() => addMember('board')}>
                <Plus size={18} />
                Ajouter un membre
              </button>
            </div>

            <div className="club-admin-section">
              <h3>Encadrants</h3>
              {clubData.team.teachers.map((teacher, index) => (
                <div key={index} className="member-admin-item">
                  {editingMember && editingMember.index === index && editingMember.type === 'teacher' ? (
                    <MemberEditForm
                      member={editingMember}
                      setMember={setEditingMember}
                      onSave={() => updateMember(index, 'teacher')}
                      onCancel={() => setEditingMember(null)}
                    />
                  ) : (
                    <>
                      <div className="member-admin-preview">
                        <h4>{teacher.name || 'Nouveau encadrant'}</h4>
                        <p>{teacher.role}</p>
                      </div>
                      <div className="member-admin-actions">
                        <button className="edit-btn" onClick={() => setEditingMember({ ...teacher, index, type: 'teacher' })}>
                          <Edit size={16} />
                        </button>
                        <button className="delete-btn" onClick={() => deleteMember(index, 'teacher')}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <button className="add-item-btn" onClick={() => addMember('teacher')}>
                <Plus size={18} />
                Ajouter un encadrant
              </button>
            </div>

            <div className="club-admin-section">
              <h3>Planning</h3>
              <div className="form-group">
                <label>Horaires des réunions</label>
                <input
                  type="text"
                  value={clubData.schedule}
                  onChange={(e) => setClubData({ ...clubData, schedule: e.target.value })}
                  placeholder="Ex: Mardi de 13h à 14h et Jeudi après-midi"
                />
              </div>
            </div>

            <div className="club-admin-section">
              <h3>Ressources Pédagogiques</h3>
              {(clubData.resources || []).map((resource, index) => (
                <div key={index} className="resource-admin-item">
                  <div className="form-group">
                    <label>Titre</label>
                    <input
                      type="text"
                      value={resource.title}
                      onChange={(e) => {
                        const resources = [...clubData.resources]
                        resources[index].title = e.target.value
                        setClubData({ ...clubData, resources })
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>URL</label>
                    <input
                      type="text"
                      value={resource.url}
                      onChange={(e) => {
                        const resources = [...clubData.resources]
                        resources[index].url = e.target.value
                        setClubData({ ...clubData, resources })
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      value={resource.description}
                      onChange={(e) => {
                        const resources = [...clubData.resources]
                        resources[index].description = e.target.value
                        setClubData({ ...clubData, resources })
                      }}
                    />
                  </div>
                  <button className="delete-btn" onClick={() => {
                    setClubData({
                      ...clubData,
                      resources: clubData.resources.filter((_, i) => i !== index)
                    })
                  }}>
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
              ))}
              <button className="add-item-btn" onClick={() => {
                setClubData({
                  ...clubData,
                  resources: [...(clubData.resources || []), { title: '', url: '', description: '' }]
                })
              }}>
                <Plus size={18} />
                Ajouter une ressource
              </button>
            </div>

            <div className="club-admin-section">
              <h3>Partenaires</h3>
              {clubData.partners.map((partner, index) => (
                <div key={index} className="partner-admin-item">
                  {editingPartner && editingPartner.index === index ? (
                    <PartnerEditForm
                      partner={editingPartner}
                      setPartner={setEditingPartner}
                      onSave={() => updatePartner(index)}
                      onCancel={() => setEditingPartner(null)}
                    />
                  ) : (
                    <>
                      <div className="partner-admin-preview">
                        <h4>{partner.name || 'Nouveau partenaire'}</h4>
                        <p>{partner.description}</p>
                      </div>
                      <div className="partner-admin-actions">
                        <button className="edit-btn" onClick={() => setEditingPartner({ ...partner, index })}>
                          <Edit size={16} />
                        </button>
                        <button className="delete-btn" onClick={() => deletePartner(index)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <button className="add-item-btn" onClick={addPartner}>
                <Plus size={18} />
                Ajouter un partenaire
              </button>
            </div>

            <motion.button
              className="save-btn"
              onClick={saveClubData}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={20} />
              Enregistrer le Club
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}

const ProjectEditForm = ({ project, setProject, onSave, onCancel }) => {
  return (
    <div className="edit-form">
      <div className="form-group">
        <label>Nom du projet</label>
        <input
          type="text"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Défi/Compétition</label>
        <input
          type="text"
          value={project.challenge}
          onChange={(e) => setProject({ ...project, challenge: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Langage de programmation</label>
        <input
          type="text"
          value={project.language}
          onChange={(e) => setProject({ ...project, language: e.target.value })}
          placeholder="Python, C++, Java..."
        />
      </div>
      <div className="form-group">
        <label>Composants (séparés par des virgules)</label>
        <input
          type="text"
          value={project.components?.join(', ') || ''}
          onChange={(e) => setProject({ ...project, components: e.target.value.split(',').map(c => c.trim()).filter(c => c) })}
          placeholder="Raspberry Pi, Arduino, Servomoteurs..."
        />
      </div>
      <div className="form-group">
        <label>Processus (séparés par des virgules)</label>
        <input
          type="text"
          value={project.process?.join(', ') || ''}
          onChange={(e) => setProject({ ...project, process: e.target.value.split(',').map(p => p.trim()).filter(p => p) })}
          placeholder="CAO, Impression 3D, Découpe laser..."
        />
      </div>
      <div className="form-actions">
        <button className="save-btn-small" onClick={onSave}>
          <Save size={18} />
          Enregistrer
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </div>
  )
}

const MemberEditForm = ({ member, setMember, onSave, onCancel }) => {
  return (
    <div className="edit-form">
      <div className="form-group">
        <label>Nom</label>
        <input
          type="text"
          value={member.name}
          onChange={(e) => setMember({ ...member, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Rôle</label>
        <input
          type="text"
          value={member.role}
          onChange={(e) => setMember({ ...member, role: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Photo (chemin)</label>
        <input
          type="text"
          value={member.photo}
          onChange={(e) => setMember({ ...member, photo: e.target.value })}
          placeholder="/Photo/Photo Robotique 2024/image.jpg"
        />
      </div>
      <div className="form-group">
        <label>Citation</label>
        <input
          type="text"
          value={member.quote}
          onChange={(e) => setMember({ ...member, quote: e.target.value })}
          placeholder="Petit mot humoristique ou sérieux"
        />
      </div>
      <div className="form-actions">
        <button className="save-btn-small" onClick={onSave}>
          <Save size={18} />
          Enregistrer
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </div>
  )
}

const PartnerEditForm = ({ partner, setPartner, onSave, onCancel }) => {
  return (
    <div className="edit-form">
      <div className="form-group">
        <label>Nom du partenaire</label>
        <input
          type="text"
          value={partner.name}
          onChange={(e) => setPartner({ ...partner, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Logo (chemin)</label>
        <input
          type="text"
          value={partner.logo}
          onChange={(e) => setPartner({ ...partner, logo: e.target.value })}
          placeholder="/public/logo-partenaire.png"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          value={partner.description}
          onChange={(e) => setPartner({ ...partner, description: e.target.value })}
          placeholder="Soutien matériel et financier..."
        />
      </div>
      <div className="form-actions">
        <button className="save-btn-small" onClick={onSave}>
          <Save size={18} />
          Enregistrer
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </div>
  )
}

export default Admin
