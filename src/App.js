import './App.scss';
import { Layout } from './layout/layout';
import {darkTheme} from "./theme";
import { ThemeProvider } from "@material-ui/core";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import {useEagerConnect} from "./connectors/use-eager-connect";
import { SwapPage } from './pages/Swap.page';

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
      <Layout>
        <SwapPage />
      </Layout>
      </Web3ReactProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
