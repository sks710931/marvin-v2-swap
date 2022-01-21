import { InjectedConnector } from "@web3-react/injected-connector";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    56, 97
  ], //421611 arb test change to 42161, 8001 => 137
});