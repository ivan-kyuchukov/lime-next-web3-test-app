
  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    // 1: "https://ethereumnode.defiterm.io",
    // 3: "https://ethereumnode.defiterm-dev.net"
    //5: "https://goerli.infura.io/v3/b125f7b4863b443b995f7db1b100fd4f"
    31337: "http://localhost:8545"
  };

  // Network chain ids
  export const supportedMetamaskNetworks = [1, 3, 4, 5, 42, 31337];

  export const TOKEN_ADDRESS = "0xc6869a93ef55e1d8ec8fdcda89c9d93616cf0a72";
  export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";