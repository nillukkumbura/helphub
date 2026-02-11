import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Article from './pages/Article'
import RequestArticle from './pages/RequestArticle'
import Assessment from './pages/Assessment'
import AssessmentResult from './pages/AssessmentResult'

function App() {
  const location = useLocation()
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="article/:slug" element={<Article key={location.pathname} />} />
        <Route path="request-article" element={<RequestArticle />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="assessment/result" element={<AssessmentResult />} />
      </Route>
    </Routes>
  )
}

export default App
