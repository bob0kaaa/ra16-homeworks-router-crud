import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../api'

function NewPost() {
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!content.trim()) return
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 0, content }),
    }).then(() => navigate('/'))
  }

  return (
    <div className="app">
      <div className="new-post">
        <div className="new-post__header">
          <h1>Новый пост</h1>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Текст поста..."
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
          <div className="new-post__actions">
            <button type="submit" className="btn btn-primary">Опубликовать</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPost
