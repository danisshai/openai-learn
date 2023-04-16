import logo from './logo.svg';
import './App.css';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import CustomizedTreeView from "./componentes/tree/CustomizedTreeView.tsx"
import GmailTreeView from "./componentes/tree/GmailTreeView.tsx"
function App() {
  return (
    
    <div className="App" style={{width:"100vw"}}>
<CustomizedTreeView />
<GmailTreeView />

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
