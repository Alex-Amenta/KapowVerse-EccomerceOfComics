import {Route, Routes} from 'react-router-dom';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
    </Routes>
    <h1>Hello world!</h1>
    </>
  )
}

export default App
