
  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    // 1: "https://ethereumnode.defiterm.io",
    // 3: "https://ethereumnode.defiterm-dev.net"
    5: "https://goerli.infura.io/v3/b125f7b4863b443b995f7db1b100fd4f"
  };

  // Network chain ids
  export const supportedMetamaskNetworks = [1, 3, 4, 5, 42];

  export const TOKEN_ADDRESS = "0xc6869a93ef55e1d8ec8fdcda89c9d93616cf0a72";
  export const CONTRACT_ADDRESS = "0x8E47eB2AAd68CAb81F08bD718C2134ceF20A800A";