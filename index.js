//* Se hace llamado a la dependencias para correr el node index.js
require('dotenv').config();
const axios = require('axios');
const dolar = require("consulta-dolar-venezuela");

//* Extraer del discord.js:
const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client
    ({
        intents:
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });


//* Luego cuando el cliente esta listo se muestra un mensaje en la consola:
    client.on('ready',()=>{
        console.log('el bot esta listo')
    });

    client.on('messageCreate',async(message)=>{
        if(message.content === 'ping'){
            message.reply({
                content:'pong'
            });
        }else if(message.content === 'quote'){
            let resp = await axios.get('https://api.quotable.io/random') //<---el axios funciona igual a lo que seria el fetch api
            const quote = resp.data.content;

            message.reply({
                content:quote
            });
        }else if(message.content === 'hola'){
            message.reply({
                content:'Bienvenido a nuestro canal'
            });
        }else if(message.content === 'tasa de hoy'){
            let tasaDolar = await dolar.getMonitor("EnParaleloVzla", "price", false);
            
            message.reply({
                content: tasaDolar
            });
        }
    })

//* Y también se hace un login con las variables de entorno(env):
//esas variables se crean por temas de seguridad
    client.login(process.env.DISCORD_BOT_ID);