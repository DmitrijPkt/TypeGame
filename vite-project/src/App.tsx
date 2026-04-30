import './App.css'
import Header from './components/Header.tsx'
import Page from './components/Page.tsx'

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
