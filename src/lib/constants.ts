/* eslint-disable @typescript-eslint/no-require-imports */
import { isProd } from "@/config/env-var";
import { getChainName } from "./node";
import { ChainId, ConnectionMap, Token } from "./types";

export const chainIds: ChainId[] = isProd
  ? ["200901",  "42420", "56", "8453", "1", '42161']
  : ["42421", "84532", "200810", "421614"];
export const defaultChainId: ChainId = isProd ? "42420" : "42421";
export const WALLET_STORAGE_KEY = `web3-wallet`;
export const factoryAddresses: { [key in ChainId]: string } = {
  "97": "0xc33c730fb352350E6974f55F508DA9A46673Da61",
  "42421": "0xc33c730fb352350E6974f55F508DA9A46673Da61",
  "80002": "0xc33c730fb352350E6974f55F508DA9A46673Da61",
  "84532": "0xc33c730fb352350E6974f55F508DA9A46673Da61",
  "421614": "0xc33c730fb352350E6974f55F508DA9A46673Da61",
  "11155111": "0xc33c730fb352350E6974f55F508DA9A46673Da61",
  "200810": "0x937B7F1d54025e6123b4C57734def83DeEDF2Fc1",
  "56": "0xa8D522f81f545EA82a06cFe6A6810b8dF2b0690F",
  "8453": "0xEc6943BB984AED25eC96986898721a7f8aB6212E",
  "42161": "0xa8D522f81f545EA82a06cFe6A6810b8dF2b0690F",
  "42420": "0xEd0534911CA0976dEe191eb0D6051105D5BC4AD2",
  "200901": "0xEd0534911CA0976dEe191eb0D6051105D5BC4AD2",
  "1": "0x5e463B0F0410E811d89870E42A6B3864d73f009E",
  "137": "",
  "421611": "",
  "80001": "",
};

export const DEFAULT_NATIVE_TOKEN_CONTRACT =
  "0x0000000000000000000000000000000000000001";

export const chains = chainIds.map((c) => ({
  label: getChainName(c),
  chainId: c,
  
}));

export const CONFIRMATIONS = {
  "1": 7,
  "97": 42,
  "56": 42,
  "137": 42,
  "369": 42,
  "5000": 42,
  "31337": 42,
  "42161": 42,
  "5001": 42,
  "43113": 42,
  "80001": 42,
  "421614": 42,
  "8453": 42,
  "42421": 5,
  "80002": 42,
  "84532": 42,
  "11155111": 42,
  "200810": 42,
  "200901": 42,
  "42420": 5,
  "421611": 42
};

export const BRIDGEASSISTS = isProd
  ? {
      "1": [
        {
          bridgeAssist: "0x85FCf4D25895Eeb5306643777F1205331415F51a",
          token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        },
        {
          bridgeAssist: "0x26fa2991f15473B3502D767b49e5805753b8F7F8",
          token: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        },
        {
          bridgeAssist: "0x1B2322a56f43DBDcB19fcd97527EeB734EEeD119",
          token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        },
        {
          bridgeAssist: "0xc415231cc96d20d99248706403B7580bE560c140",
          token: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        },
      ],
      "56": [
        {
          bridgeAssist: "0x0FFE2dA242E959a7446Abb56A8f2626D0DC4fce7",
          token: "0x55d398326f99059fF775485246999027B3197955",
        },
      ],
      "8453": [
        {
          bridgeAssist: "0x5E007f834b6Ee2fcdA41631AD444b4dAAEc372b0",
          token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        },
        {
          bridgeAssist: "0xEd87e9170152A12a4D3904F5cdE323b35d880858",
          token: "0x4200000000000000000000000000000000000006",
        },
      ],
      "42161": [
        {
          bridgeAssist: "0x0FFE2dA242E959a7446Abb56A8f2626D0DC4fce7",
          token: "0xAD4b9c1FbF4923061814dD9d5732EB703FaA53D4",
        },
        {
          bridgeAssist: "0x5116990d844bda038DBD037D943FcB7481b5Fee7",
          token: "0x3096e7BFd0878Cc65be71f8899Bc4CFB57187Ba3",
        },
        {
          bridgeAssist: "0x6377C8cC083d7CEB49fD3eE1244351BFB86C961e",
          token: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        },
        {
          bridgeAssist: "0x475d2Ff7955c5359D31B19DC275be3a466f035D5",
          token: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        },
      ],
      "42420": [
        {
          bridgeAssist: "0xA6c8B33edD4894E42d0C5585fEC52aAC6FF9147d",
          token: "0x2B7C1342Cc64add10B2a79C8f9767d2667DE64B2",
        },
        {
          bridgeAssist: "0x08d4a11Fb4fFE7022deBbBbcBb7444005B09a2FC",
          token: "0xDBDc8c7B96286899aB624F6a59dd0250DD4Ce9bC",
        },
        {
          bridgeAssist: "0x4f7C5492919e1dB5Bf667D6397e54B41bB93146c",
          token: "0x0000000000000000000000000000000000000001",
        },
        {
          bridgeAssist: "0x8D03A4E2dBfbf13043Bde6278658EFfCE6FE6b02",
          token: "0xEc6943BB984AED25eC96986898721a7f8aB6212E",
        },
        {
          bridgeAssist: "0x196434734f09DFE6D479b5a248a45cfbe516382a",
          token: "0x26E490d30e73c36800788DC6d6315946C4BbEa24",
        },
        {
          bridgeAssist: "0x32cA10Bb1af2535937b8D84aAA6DBfe95dc15A5d",
          token: "0xbe231A8492487aAe6096278A97050FAe6B9d5BEc",
        },
        {
          bridgeAssist: "0x8C1f4a30eAc37071Ec3ce70A86A1C66c5711181d",
          token: "0xE59EABcDc3C86909a391D0760b039A3f23d48281",
        },
      ],
      "200901": [
        {
          bridgeAssist: "0xA6c8B33edD4894E42d0C5585fEC52aAC6FF9147d",
          token: "0x0000000000000000000000000000000000000001",
        },
      ],
    }
  : {
      "42421": [
        {
          bridgeAssist: "0xE1c83d0Be5a341120A59507a891Ab007FF5954F0",
          token: "0x0000000000000000000000000000000000000001",
        },
        {
          bridgeAssist: "0xD05472A955112A6dD70df561C2BD7446879458D5",
          token: "0x2F633a89Cf5cd1269b71F095265d708e65d56B89",
        },
        {
          bridgeAssist: "0xb5Dc3E50A3a698059a5fa56B4A0106535c349124",
          token: "0xE8975a94296e3A473c1731E09d687Dda8c437309",
        },
        {
          bridgeAssist: "0x58cD62FE7E6c4EBC03dd504B63E36696BB3a2477",
          token: "0x6cb8C82DaB692a708D0bbB533aa6A709d4CE6dCA",
        },
        {
          bridgeAssist: "0xC5e7B562B7f99942Db2B6F265FeFc2a7BBf92C17",
          token: "0xc53eb7797Ab27bFbdCa418665fd07665839B2a1d",
        },
        // {
        //   bridgeAssist: "0x16eBe28f15BF37c5066990684F62A2F471698123",
        //   token: "0x39C6b75fAeAb6B54541BE34860AE6250263377e9",
        // },
        {
          bridgeAssist: "0xFF91925108094cC5165A41e5b56E3F474a8071eA",
          token: "0xc33741fddEBeA854d265db6F9707900Efb0211a2",
        },
      ],
      "84532": [
        {
          bridgeAssist: "0xE1c83d0Be5a341120A59507a891Ab007FF5954F0",
          token: "0x6cb8C82DaB692a708D0bbB533aa6A709d4CE6dCA",
        },
        // {
        //   bridgeAssist: "0xB8696D46A6172953f03306aDCa7c7CE12dEBA99c",
        //   token: "0x43f4A3dA572caabADbf17bac588a5Afda9d0D9dd",
        // },
        {
          bridgeAssist: "0x10ad974526D621667dBaE33E6Fc92Bf711f98054",
          token: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
        },
      ],
      "200810": [
        {
          bridgeAssist: "0xc0ecf31e20521F3b0dA5c2b73Fa6A74A5A0EC236",
          token: "0x0000000000000000000000000000000000000001",
        },
      ],
      "421614": [
        {
          bridgeAssist: "0xE1c83d0Be5a341120A59507a891Ab007FF5954F0",
          token: "0xCA0010bB0Af1729CA608A966Fcb77c5dbCB7b110",
        },
        {
          bridgeAssist: "0xD05472A955112A6dD70df561C2BD7446879458D5",
          token: "0x2F633a89Cf5cd1269b71F095265d708e65d56B89",
        },
        {
          bridgeAssist: "0xb5Dc3E50A3a698059a5fa56B4A0106535c349124",
          token: "0xE8975a94296e3A473c1731E09d687Dda8c437309",
        },
        {
          bridgeAssist: "0x58cD62FE7E6c4EBC03dd504B63E36696BB3a2477",
          token: "0x6cb8C82DaB692a708D0bbB533aa6A709d4CE6dCA",
        },
        {
          bridgeAssist: "0x02C69440Fc8E13d16F9bB53B562ceC405341eFcB",
          token: "0x58B202B9650b4e55D9F3f573c25b2930Ba16d0B2",
        },
      ],
    };

export const chainsTokensConnection: ConnectionMap<string, string> = isProd
  ? [
      {
        chains: ["1", "42420"],
        tokens: ["USDC", "USDT", "WBTC", "WETH"],
      },
      {
        chains: ["56", "42420"],
        tokens: ["USDT"],
      },
      {
        chains: ["8453", "42420"],
        tokens: ["USDC", "USDT"],
      },
      {
        chains: ["8453", "42420"],
        tokens: ["USDC", "USDT"],
      },
      {
        chains: ["8453", "42420"],
        tokens: ["USDC", "WETH"],
      },
      {
        chains: ["42161", "42420"],
        tokens: ["USDT", "WNT", "WETH"],
      },
      {
        chains: ["200901", "42420"],
        tokens: ["BTC"],
      },
    ]
  : [
      {
        chains: ["200810", "42421"],
        tokens: ["BTC"],
      },
      {
        chains: ["42421", "421614"],
        tokens: ["RWA"],
      },
      {
        chains: ["42421", "84532"],
        tokens: ["USDC"],
      },
    ];

export const supportedTokens: Token[] = [
  {
    label: "RWA",
    value: "RWA",
  },
  {
    label: "USDC",
    value: "USDC",
  },
  {
    label: "USDT",
    value: "USDT",
  },
  {
    label: "BTC",
    value: "BTC",
  },
  {
    label: "WETH",
    value: "WETH",
  },
  {
    label: "WBTC",
    value: "WBTC",
  },
  {
    label: "WNT",
    value: "WNT",
  },
];

export const assets = [
  { title: "USDC", subTitle: "USD Coin", icon: require("../../public/assets/USDC.png") },
  { title: "USDT", subTitle: "Tether", icon: require("../../public/assets/USDT.png") },
  { title: "RWA", subTitle: "RWA", icon: require("../../public/assets/RWA.png")},
  { title: "WBTC", subTitle: "Wrapped BTC", icon: require("../../public/assets/WBTC.png")},
  { title: "WETH", subTitle: "Wrapped ETH", icon: require("../../public/assets/WETH.png")},
  { title: "BTC", subTitle: "Bitlayer", icon: require("../../public/assets/BTC.png")},
  { title: "WNT", subTitle: "Wicrpt Network Token", icon: require("../../public/assets/WNT.png")},
]

