import 'dotenv/config';import {Client,GatewayIntentBits,REST,Routes,ChatInputCommandInteraction,SlashCommandBuilder} from 'discord.js';
const token=process.env.DISCORD_TOKEN!,clientId=process.env.DISCORD_CLIENT_ID!,guildId=process.env.DISCORD_GUILD_ID!,api=process.env.API_BASE_URL||'http://localhost:3001',web=process.env.WEB_BASE_URL||'http://localhost:5173';
const command=new SlashCommandBuilder().setName('verify').setDescription('Verify your THE PRIMALS NFT holdings');
const rest=new REST({version:'10'}).setToken(token);await rest.put(Routes.applicationGuildCommands(clientId,guildId),{body:[command.toJSON()]});
const client=new Client({intents:[GatewayIntentBits.Guilds]});client.on('interactionCreate',async i=>{if(!i.isChatInputCommand()||i.commandName!=='verify')return;await verify(i)});
async function verify(i:ChatInputCommandInteraction){const r=await fetch(api+'/session',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({discordUserId:i.user.id})});const s:any=await r.json();if(!r.ok)return void i.reply({content:'Unable to create verification session.',ephemeral:true});const url=`${web}/?session=${encodeURIComponent(s.sessionId)}`;await i.reply({content:`Verify securely here: ${url}\nThis session expires in 5 minutes.`,ephemeral:true});}
client.login(token);
