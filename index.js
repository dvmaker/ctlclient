

// ~  CTL CLIENT by Davi


const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { tag } = require('./src/tag')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const fs = require('fs')
const antilink = JSON.parse(fs.readFileSync('./database/json/antilink.json'))
const { exec } = require('child_process')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const moment = require('moment-timezone')

prefix = '.'
blocked = []

        
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segundos`
}

async function starts() {
	const ctlclient = new WAConnection()
	ctlclient.logger.level = 'warn'
	console.log(banner.string)
	ctlclient.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./ctlclient.json') && ctlclient.loadAuthInfo('./ctlclient.json')
	ctlclient.on('connecting', () => {
		start('2', 'Conectando qr code quase lá...')
	})
	ctlclient.on('open', () => {
		success('2', 'Prontinho mano🐤')
	})
	await ctlclient.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./ctlclient.json', JSON.stringify(ctlclient.base64EncodedAuthInfo(), null, '\t'))


	ctlclient.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return             
            mek = mek.messages.all()[0]              
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return       
            if (mek.key.fromMe && fromMe === true) return
			global.prefix
			global.blocked
			const antibot = mek.isBaileys
			const content = JSON.stringify(mek.message)
			const speed = require('performance-now');
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = 'Your-Api-Key'
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment().tz('America/Sao_Paulo').format('HH:mm:ss')
			const listRM = (type === 'listResponseMessage') ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : ''
			body = (type === 'listResponseMessage' && mek.message.listResponseMessage.title) ? mek.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && mek.message.buttonsResponseMessage.selectedButtonId) ? mek.message.buttonsResponseMessage.selectedButtonId: (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			example = (type === 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedDisplayText : ''
            var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
            const isButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : ''
            const cmdstk = Object.keys(mek.message)[0] == "stickerMessage" ? mek.message.stickerMessage.fileSha256.toString('base64') : ""
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const conts = mek.key.fromMe ? ctlclient.user.jid : ctlclient.contacts[mek.sender]
			const c = args.join(' ')
			const argss = body.split(/ +/g)
			const isCmd = body.startsWith(prefix)
			
			
			const botNumber = ctlclient.user.jid
			
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
		    const pushname = ctlclient.contacts[sender] != undefined ? ctlclient.contacts[sender].vname || ctlclient.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await ctlclient.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const groupId = isGroup ? groupMetadata.jid : ''
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
            const isAntiLink = isGroup ? antilink.includes(from) : false
			const errorurl2 = 'https://i.ibb.co/dttZM8b/591530180aad.png'
			
/
	
	// FUNCTION DE TEMPO 
		/*const sekarang = new Date().getTime();
		var ase = new Date();
                        var waktoo = ase.getHours();
                        switch(waktoo){
                case 0: waktoo = 'Boa noite'; break;
                case 01: waktoo = 'Boa noite'; break;
                case 02: waktoo = 'Boa noite'; break;
                case 03: waktoo = 'Boa noite'; break;
                case 04: waktoo = 'Boa noite'; break;
                case 05: waktoo = 'Boa noite'; break;
                case 06: waktoo = 'Bom dia'; break;
                case 07: waktoo = 'Bom dia'; break;
                case 08: waktoo = 'Bom dia'; break;
                case 09: waktoo = 'Bom dia'; break;
                case 10: waktoo = 'Bom dia'; break;
                case 11: waktoo = 'Boa dia'; break;
                case 12: waktoo = 'Boa tarde️'; break;
                case 13: waktoo = 'Boa tarde️'; break;
                case 14: waktoo = 'Boa tarde️'; break;
                case 15: waktoo = 'Boa tarde'; break;
                case 16: waktoo = 'Boa tarde'; break;
                case 17: waktoo = 'Boa tarde'; break;
                case 18: waktoo = 'Boa noite'; break;
                case 19: waktoo = 'Boa noite'; break;
                case 20: waktoo = 'Boa noite'; break;
                case 21: waktoo = 'Boa noite'; break;
                case 22: waktoo = 'Boa noite'; break;
                case 23: waktoo = 'Boa noite'; break;
            }
            var tampilUcapan = '' + waktoo;
            //FUNCTION DE HORARIO REPLY
            var ase = new Date();
                        var waktoonyabro = ase.getHours();
                        switch(waktoonyabro){
                case 00: waktoonyabro = `Boa noite ${pushname}🌙`; break;
                case 01: waktoonyabro = `Boa noite ${pushname}🌙`; break;
                case 02: waktoonyabro = `Boa noite ${pushname}🌙`; break;
                case 03: waktoonyabro = `Bom Dia ${pushname}✨`; break;
                case 04: waktoonyabro = `Bom Dia ${pushname}✨`; break;
                case 05: waktoonyabro = `Bom Dia ${pushname}✨`; break;
                case 06: waktoonyabro = `Bom Dia ${pushname}✨`; break;
                case 07: waktoonyabro = `Bom Dia ${pushname}✨`; break;
                case 08: waktoonyabro = `Bom Dia ${pushname}✨`; break;
                case 09: waktoonyabro = `Bom Dia ${pushname}✨`; break;
                case 10: waktoonyabro = `Bom Dia ${pushname}✨`; break;
                case 11: waktoonyabro = `Boa tarde ${pushname}🔥`; break;
                case 12: waktoonyabro = `Boa tarde ${pushname}🔥`; break;
                case 13: waktoonyabro = `Boa tarde ${pushname}🔥`; break;
                case 14: waktoonyabro = `Boa tarde ${pushname}🔥`; break;
                case 15: waktoonyabro = `Boa tarde ${pushname}🌹`; break;
                case 16: waktoonyabro = `Boa tarde ${pushname}🌹`; break;
                case 17: waktoonyabro = `Boa tarde ${pushname}🌹`; break;
                case 18: waktoonyabro = `Boa noite ${pushname}🌙`; break;
                case 19: waktoonyabro = `Boa noite ${pushname}🌙`; break;
                case 20: waktoonyabro = `Boa noite ${pushname}🌙`; break;
                case 21: waktoonyabro = `Boa noite ${pushname}🌙`; break;
                case 22: waktoonyabro = `Boa noite ${pushname}🌙`; break;
                case 23: waktoonyabro = `Boa noite ${pushname}🌙`; break;
            }
            var ucapanFakereply = '' + waktoonyabro;
            var date = new Date();
        var tahun = date.getFullYear();
        var bulan1 = date.getMonth();
        var tanggal = date.getDate();
        var hari = date.getDay();
        var jam = date.getHours();
        var menit = date.getMinutes();
        var detik = date.getSeconds();
        var waktoo = date.getHours();
            switch(hari) {
                case 00: hari = 'Domigo'; break;
                case 01: hari = 'Segunda-feira'; break;
                case 02: hari = 'terça'; break;
                case 03: hari = 'quarta-feira'; break;
                case 04: hari = 'quinta-feira'; break;
                case 05: hari = 'sexta-feira'; break;
                case 06: hari = 'sábado'; break;
            }
            switch(bulan1) {
                case 00: bulan1 = '01'; break;
                case 01: bulan1 = '02'; break;
                case 02: bulan1 = '03'; break;
                case 03: bulan1 = '04'; break;
                case 04: bulan1 = '05'; break;
                case 05: bulan1 = '06'; break;
                case 06: bulan1 = '07'; break;
                case 07: bulan1 = '08'; break;
                case 08: bulan1 = '09'; break;
                case 09: bulan1 = '10'; break;
                case 10: bulan1 = '11'; break;
                case 11: bulan1 = '12'; break;
            }
            var tampilHari = '' + hari + '/' + tanggal + '/' + bulan1 + '/' + tahun;
            var tampilJam = + jam + ':' + menit + ':' + detik;*)
            // FIM DA FUNCTION

const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
			ctlclient.sendMessage(from, teks, text,  { quoted: mek, thumbnail: dfrply, sendEphemeral: true})
			}
			const sendImage = (teks) => {
		    ctlclient.sendMessage(from, teks, image,  {quoted: nay1, contextInfo: {"mentionedJid": [sender], forwardingScore: 1000, isForwarded: true }})
		    }
			const sendMess = (hehe, teks) => {
				ctlclient.sendMessage(from, teks, text,  {quoted: say1, contextInfo: {"mentionedJid": [sender], forwardingScore: 1000, isForwarded: true }})
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? ctlclient.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : ctlclient.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			const getGroup = async function(totalchat){
	let grup = []
	let a = []
	let b = []
	for (c of totalchat){
		a.push(c.jid)
	}
	for (d of a){
		if (d && d.includes('g.us')){
			b.push(d)
		}
	}
	for (e of b){
		let ingfo = await ctlclient.groupMetadata(e)
		grup.push(ingfo)
	}
	return grup
}


// ANTILINK
if (budy.includes("youtu.be")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return reply(`Puta desse adm fica mandando link sfd`)
		    ctlclient.updatePresence(from, Presence.composing)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
	    	reply(`Vai de ban 😋👍`)
		    ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
		      setTimeout( () => {
	          
	          }, 0)
		      }

if (budy.includes("http://")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return reply(`Puta desse adm fica mandando link sfd`)
		    ctlclient.updatePresence(from, Presence.composing)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
	    	reply(`Vai de ban 😋👍`)
		    ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
		      setTimeout( () => {
	          
	          }, 0)
		      }

if (budy.includes("https://")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return reply(`Puta desse adm fica mandando link sfd`)
		    ctlclient.updatePresence(from, Presence.composing)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
	    	reply(`Vai de ban 😋👍`)
		    ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
		      setTimeout( () => {
	          
	          }, 0)
		      }

if (budy.includes("chat.whats")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return reply(`Puta desse adm fica mandando link sfd`)
		    ctlclient.updatePresence(from, Presence.composing)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
	    	reply(`Vai de ban 😋👍`)
		    ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
		      setTimeout( () => {
	          
	          }, 0)
		      }
	// FIM DO ANTILINK 
	
// AUTO RESPOSTA 



//FIM

// BOT VIZUALIZA AS MENSAGENS
	ctlclient.chatRead(from)
       // TIPOS DE MENSAGENS
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			const isQuotedText = type === 'extendedTextMessage' && content.includes('textMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mCMD\x1b[1;37m]', time, color(command), 'do mano', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color('Message'), 'do mano', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mCMD\x1b[1;37m]', time, color(command), 'do mano', color(sender.split('@')[0]), 'no', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color('Message'), 'do mano', color(sender.split('@')[0]), 'no', color(groupName), 'args :', color(args.length))
			if (!mek.key.fromMe && !isOwner && banChats === true) return 
			if (isCmd && isBanned) {
            return console.log(color('[BAN] Ignorando comando', 'blue'), color(moment.tz('America/Sao_Paulo').format('HH:mm:ss'), 'yellow'), color(`${command}`),'DE:', color(pushname))}
			switch(command) {
				case 'help':
				case 'menu':
					ctlclient.sendMessage(from, help(prefix), text)
					break

				case 'autogroup':
				case 'autosettings':
					buttons = [{buttonId: `null`,buttonText:{displayText: '🔒 FECHAR GRUPO'},type:1},{buttonId:`null`,buttonText:{displayText:'🔓 ABRIR GRUPO'},type:1}]
					imageMsg = (await ctlclient.prepareMessageMedia(fs.readFileSync(`./fotoautogroup.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./fotoautogroup.jpg`)})).imageMessage
					texto = " ⌜♛⌟ 𝐂𝐋𝐎𝐒𝐄 𝐀𝐍𝐃 𝐎𝐏𝐄𝐍 𝐆𝐑𝐎𝐔𝐏 ▿ 𝐌𝐄𝐍𝐔"
					buttonsMessage = {
					contentText: texto,
					footerText: "🌟 CTL CLiENT - 2022", imageMessage: imageMsg,
					buttons: buttons,
					headerType: 4
					}
					prep = await ctlclient.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
					ctlclient.relayWAMessage(prep)
					break
				

case 'setprefix':
					if (args.length < 1) return
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					prefix = args[0]
					reply(`O prefixo foi alterado com sucesso para : ${prefix}`)
					break

/*case 'kickall':
					if (!isOwner) return reply('Apenas meu dono🤹‍♀️')
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
					teks += `** ${mem.jid.split('@')[0]}\n`
					members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					ctlclient.groupRemove(from, members_id)
break*/

/*case 'kick': 
case 'k':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === null || mek.message.extendedTextMessage === undefined) return;
if (mek.message.extendedTextMessage.contextInfo.participant === undefined) {
entah = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (exe1.groupadmins> 1) {
var M_exe = []
for (let cut of exe1) {
M_exe.push(cut)
}
ctlclient.groupRemove(from, M_exe)
} else {
ctlclient.groupRemove(from, [exe1[0]])
}
} else {
exe1 = mek.message.extendedTextMessage.contextInfo.participant
ctlclient.groupRemove(from, [exe1])
}
ctlclient.sendMessage("Alvo removido com sucesso")
break*/
/*//case 'tempban'://BY SAYO
if (args[1]=="segundos") {var timer = args[0]+"000"
} else if (args[1]=="minuto") {var timer = args[0]+"0000"
} else if (args[1]=="hora") {var timer = args[0]+"00000"
} else {return reply("*selecionar:*\nsegundos\nminuto\nhora")}
if (mek.message.extendedTextMessage === null || mek.message.extendedTextMessage === undefined) return;
if (mek.message.extendedTextMessage.contextInfo.participant === undefined) {
entah = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (exe1.sayo> 1) {
var M_exe = []
for (let cut of exe1) {
M_exe.push(cut)
}
ctlclient.groupRemove(from, M_exe)
} else {
ctlclient.groupRemove(from, [exe1[0]])
}
} else {
exe1 = mek.message.extendedTextMessage.contextInfo.participant
ctlclient.groupRemove(from, [exe1])
}
reply(`[❗] tempo de ban : ${args[0]} ${args[1]}`)
setTimeout( () => {
exe1 = mek.message.extendedTextMessage.contextInfo.participant
ctlclient.groupAdd(from, [exe1])			
}, timer)
break*/


//FIM
default: 
if ((budy === "ajuda") || (budy === "bot") || (budy === "Bot") || (budy === "Ajuda")) {
gambar = fs.readFileSync('./fotos/me2.jpg')
mhan = await ctlclient.prepareMessage(from, gambar, MessageType.image, {quoted: freply, thumbnail: fs.readFileSync('./fotos/me3.jpg'), contextInfo: {"mentionedJid": [sender]}})
gbutsan = [
  {buttonId: 'Regras 👮‍♀', buttonText: {displayText: 'Regras 👮‍♀'}, type: 1},
  {buttonId: 'Meu dono ✓', buttonText: {displayText: 'Meu dono ✓'}, type: 1}]
gbuttonan = {
imageMessage: mhan.message.imageMessage,
    contentText: `Olá @${sender.split("@")[0]}`,
    footerText: `© _Pinguim_\n_caso não apareça os botões, utilize o comando .menu_`,
    buttons: gbutsan,
    headerType: 4
}
await ctlclient.sendMessage(from, gbuttonan, MessageType.buttonsMessage)
}

if (example === '🔓 ABRIR GRUPO') {
ctlclient.updatePresence(from, Presence.composing) 
if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n')
if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, false)
}
if (example === '🔒 FECHAR GRUPO') {
ctlclient.updatePresence(from, Presence.composing) 
if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n')
if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, true);


}
} catch (e) {
console.log('Error : %s', color(e, 'red'))
}
})
}
starts()

// E FIM 😏🔥
                   
                           
