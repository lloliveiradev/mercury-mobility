import logo from './logo.svg';
import './App.css';
import Nav from './components/test/Nav';
import Footer from './components/test/Footer';
import Promo from './components/test/Promo';
import Intro1 from './components/test/Intro1';
import Intro2 from './components/test/Intro2';
import Intro3 from './components/test/Intro3';
import Card from './components/test/Card';

function Heading(props) {
  return (
    <header>
      <h1>{props.greet}, {props.name}</h1>
    </header>
  );
}

function App(props) {
  return (
    <div className="App">
      <img src={logo} style={{ "max-width": "200px" }} alt="logo" />
      <Nav />
      <Heading greet={props.greet} name={props.name} />
      <Promo />
      <h2>{props.title}</h2>
      <Intro1 />
      <Intro2 />
      <Intro3 />
      < Card h2="Card 1" h3="Card 1 content" />
      < Card h2="Card 2" h3="Card 2 content" />
      < Card h2="Card 3" h3="Card 3 content" />
      <Footer />
    </div>
  );
}

export default App;
