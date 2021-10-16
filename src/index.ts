import TelegramBot from "node-telegram-bot-api";
import axios, {AxiosResponse} from 'axios';

const token = "put ypur token here"
const bot = new TelegramBot(token, {polling: true});

const API_URL = "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";

type ResponseR = {
    leagues: Array<{
        abbreviation: string;
    }>
}


bot.on('message', (msg)=> {
    axios.get(API_URL)
        .then((res) => res.data)
        .then((obj) => (obj as ResponseR).leagues[0].abbreviation)
        .then((abbreviation) => bot.sendMessage(msg.chat.id, abbreviation))



});




