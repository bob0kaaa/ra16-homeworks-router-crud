import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API } from '../api'

interface Post {
  id: number
  content: string
  created?: number
}

function ViewPost() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then(r => r.json())
      .then((data: { post: Post }) => { setPost(data.post); setContent(data.post.content) })
      .catch(err => { console.error(err) })
  }, [id])

  const handleDelete = (): void => {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(() => navigate('/'))
      .catch(err => { console.error(err) })
  }

  const handleSave = (): void => {
    fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Number(id), content }),
    }).then(() => {
      setPost(prev => prev ? { ...prev, content } : prev)
      setEditing(false)
    }).catch(err => { console.error(err) })
  }

  if (!post) return <p className="loading">Загрузка...</p>

  return (
    <div className="app">
      <div className="view-post">
        <div className="view-post__header">
          <h1>Пост #{post.id}</h1>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>← Назад</button>
        </div>
        {editing ? (
          <>
            <textarea value={content} onChange={e => setContent(e.target.value)} />
            <div className="view-post__actions">
              <button className="btn btn-success" onClick={handleSave}>Сохранить</button>
              <button className="btn btn-secondary" onClick={() => { setEditing(false); setContent(post.content) }}>✕</button>
            </div>
          </>
        ) : (
          <>
            <p className="view-post__content">{post.content}</p>
            <div className="view-post__actions">
              <button className="btn btn-primary" onClick={() => setEditing(true)}>Редактировать</button>
              <button className="btn btn-danger" onClick={handleDelete}>Удалить</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ViewPost
