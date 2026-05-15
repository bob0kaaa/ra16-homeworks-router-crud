import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PostList from './components/PostList'
import NewPost from './components/NewPost'
import ViewPost from './components/ViewPost'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/new" element={<NewPost />} />
      <Route path="/posts/:id" element={<ViewPost />} />
    </Routes>
  )
}
