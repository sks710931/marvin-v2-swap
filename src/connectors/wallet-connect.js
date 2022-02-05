import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const walletConnect = new WalletConnectConnector({
  rpc: { 56: "https://bsc-dataseed1.binance.org/" },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 12000,
  infuraId:"12351ae7b81b4899bf671dfc4f732b16"
});
