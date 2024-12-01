import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";


export const config = createConfig({
    chains: [base],
    connectors: [
        coinbaseWallet({
            appName: "Base Nigeria Idea Launchpad",
            preference: 'smartWalletOnly',
            version: '4',
        }),
    ],
    transports: {
        [base.id]: http(process.env.RPC_URL),
    },
});


declare module "wagmi" {
    interface Register {
        config: typeof config;
    }
}