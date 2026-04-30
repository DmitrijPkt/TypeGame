import { useState } from 'react'

import './App.css'
import Header from './components/Header.tsx'
import Page from './components/Page.tsx'
import LeaderBoard from './components/LeaderBoard.tsx'
import Game from './components/game/Game.tsx'

function App() {
  return (
    <>
     <Page 
      header={
        <Header />
      }
     />
    </>
  )
}

export default App
