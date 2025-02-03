import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Aside from './components/Aside'
import Main from './components/Main';

function App() {
  const [state, setState] = useState({
    page: 'home',
  });

  return (
    <div className="flex flex-col min-h-screen text-base font-sans" data-controller="app">
      < Header />
      <div className="absolute flex top-0 w-full h-416 md:h-400 lg:h-424 xl:h-352 mt-136 bg-grey-200">
        <div className="absolute right-0 w-half h-full bg-y-gradient-white-grey-200"></div>
      </div>
      <div className="absolute flex top-0 w-full h-416 md:h-400 lg:h-424 xl:h-352 mt-136 bg-no-repeat bg-right-bottom bg-height-fit sm:opacity-100 opacity-50 z-10" style={{ "backgroundImage": "url(/doc/assets/images/home/pattern-f302b47d.svg)" }}></div>
      <div className="flex-1 mx-auto w-full max-w-1440 bg-white pt-72">
        <div className="flex h-full">
          < Aside setState={setState} />
          <div className="w-full lg:ml-376 overflow-x-hidden">
            < Main />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
