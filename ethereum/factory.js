import web3 from "./web3";
import CampaignFactory from  './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x6987A4539699633EA277D9Fb4C9fbE288CA43563'
);

export default instance;