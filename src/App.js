import './App.scss';
import { Layout } from './layout/layout';
import {darkTheme} from "./theme";
import { ThemeProvider } from "@material-ui/core";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import {useEagerConnect} from "./connectors/use-eager-connect";
import { SwapPage } from './pages/Swap.page';
import { ToastContainer, } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { UserPage } from './pages/user.page';
import { MintNFTPage } from './pages/mint-nft.page';
  
function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  useEagerConnect();
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ToastContainer />
      <Layout>
        <Routes>
          <Route path="/" element={<UserPage />}/>
          <Route path="/swap" element={<SwapPage />}/>
          <Route path="/nft-mint" element={<MintNFTPage />}/>
        </Routes>
        
      </Layout>
      </Web3ReactProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
