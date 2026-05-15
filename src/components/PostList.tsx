import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API = 'http://localhost:7070/posts'

interface Post {
  id: number
  content: string
  created?: string
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then((data: Post[]) => { setPosts(data); setLoading(false) })
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
          <div key={post.id} className="post-card" onClick={() => navigate(`/posts/${post.id}`)}>
            <div className="post-card__id">#{post.id}</div>
            <div className="post-card__content">{post.content}</div>
            {post.created && <div className="post-card__date">{post.created}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostList
