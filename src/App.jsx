import React, { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Theme context
const ThemeContext = createContext()
const useTheme = () => useContext(ThemeContext)

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.body.style.background = dark ? '#121212' : '#fff'
    document.body.style.color = dark ? '#e6e6e6' : '#111'
  }, [dark])
  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Simple Nav
function Nav() {
  const { dark, toggle } = useTheme()
  const linkStyle = { marginRight: 12 }
  return (
    <nav style={{ padding: 12 }}>
      <Link to='/' style={linkStyle}>Home</Link>
      <Link to='/about' style={linkStyle}>About</Link>
      <Link to='/contact' style={linkStyle}>Contact</Link>
      <button onClick={toggle} style={{ float: 'right' }}>{dark ? 'Light' : 'Dark'}</button>
    </nav>
  )
}

// Home page embeds the Student Manager
function Home() {
  return (
    <div style={{ padding: 12 }}>
      <h2>Student Manager</h2>
      <StudentsManager />
    </div>
  )
}

function About() {
  return (
    <div style={{ padding: 12 }}>
      <h2>About</h2>
      <p>Minimal React demo: CRUD, routing, search, fetch, theme.</p>
    </div>
  )
}

function Contact() {
  return (
    <div style={{ padding: 12 }}>
      <h2>Contact</h2>
      <p>Example contact page.</p>
    </div>
  )
}

// StudentsManager: CRUD + search + fetch
function StudentsManager() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  // form state
  const [form, setForm] = useState({ id: null, name: '', email: '' })

  // fetch sample data once
  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r => r.json())
      .then(data => {
        // keep only id, name, email and take first 5 to keep small
        const list = data.slice(0, 10).map(u => ({ id: u.id, name: u.name, email: u.email }))
        setStudents(list)
        setLoading(false)
      })
      .catch(e => { setError('Failed fetching'); setLoading(false) })
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  function addOrUpdate(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    if (form.id == null) {
      // add
      const newStudent = { ...form, id: Date.now() }
      setStudents(s => [newStudent, ...s])
    } else {
      // update
      setStudents(s => s.map(x => (x.id === form.id ? { ...form } : x)))
    }
    setForm({ id: null, name: '', email: '' })
  }

  function editStudent(s) {
    setForm(s)
  }

  function deleteStudent(id) {
    setStudents(prev => {
        const next = prev.filter(x => String(x.id) !== String(id))
      return next
    })
  }

  // filtered list
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <input placeholder='Search by name or email' value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <form onSubmit={addOrUpdate} style={{ marginBottom: 12 }}>
        <input name='name' placeholder='Name' value={form.name} onChange={handleChange} />
        <input name='email' placeholder='Email' value={form.email} onChange={handleChange} style={{ marginLeft: 8 }} />
        <button type='submit' style={{ marginLeft: 8 }}>{form.id == null ? 'Add' : 'Update'}</button>
        {form.id != null && <button type='button' onClick={() => setForm({ id: null, name: '', email: '' })} style={{ marginLeft: 8 }}>Cancel</button>}
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ paddingLeft: 0 }}>
        {filtered.map(s => (
          <li key={s.id} style={{ listStyle: 'none', marginBottom: 8, padding: 8, border: '1px solid #ddd' }}>
            <div><strong>{s.name}</strong> <small>({s.email})</small></div>
            <div style={{ marginTop: 6 }}>
              <button onClick={() => editStudent(s)}>Edit</button>
              <button onClick={() => deleteStudent(s.id)} style={{ marginLeft: 8 }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && !loading && <p>No students found.</p>}
    </div>
  )
}

// App root
export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 800, margin: '0 auto' }}>
          <Nav />
          <hr />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}
