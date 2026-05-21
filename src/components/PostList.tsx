import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../api'

interface Post {
  id: number
  content: string
  created?: number
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then((data: Post[]) => { setPosts(data); setLoading(false) })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  if (loading) return <p className="loading">Загрузка...</p>

  return (
    <div className="app">
      <div className="app-header">
        <h1>Посты</h1>
        <Link to="/posts/new" className="btn btn-primary">Создать пост</Link>
      </div>
      <div className="posts">
        {posts.map(post => (
          <Link key={post.id} to={`/posts/${post.id}`} className="post-card" style={{ textDecoration: 'none' }}>
            <div className="post-card__id">#{post.id}</div>
            <div className="post-card__content">{post.content}</div>
            {post.created && <div className="post-card__date">{new Date(post.created).toLocaleString('ru-RU')}</div>}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PostList
