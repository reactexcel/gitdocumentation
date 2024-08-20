import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GithubRepository from '../pages/githubRepository'
import Home from '../pages/home'

const Router = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/git' element={<GithubRepository/>} />
    </Routes>
  )
}

export default Router