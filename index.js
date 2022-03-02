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
const { sholtz } = require('./src/sholtz')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const fs = require('fs')
const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'))
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
//const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
prefix = setting.prefix
blocked = []
//akamekey = 'QsJ2nSNx'

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} hora(s)${pad(minutes)} Minutos ${pad(seconds)} Segundos`
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
		start('2', 'Conectando qr code quase la...')
	})
	ctlclient.on('open', () => {
		success('2', 'Prontinho mano')
	})
	await ctlclient.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./ctlclient.json', JSON.stringify(ctlclient.base64EncodedAuthInfo(), null, '\t'))


/*ctlclient.on('group-participants-update', async (anu) => {
		if(antifake.includes(anu.jid)) {
	const mdata = await ctlclient.groupMetadata(anu.jid)
			if (anu.action == 'add'){
				num = anu.participants[0]
				if(!num.split('@')[0].startsWith(55)) {
				ctlclient.sendMessage(mdata.id, 'Digita️', MessageType.text)
				setTimeout(async function () {
				ctlclient.groupRemove(mdata.id, [num])
					}, 1000)
				}
			}
		}
	}*/


	ctlclient.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await ctlclient.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
			num = anu.participants[0]
			teks = `\n\n Eae @${num.split('@')[0]} usa a tag ae\n\n𝐓𝚫𝐆 𝐞 𝐑𝐄𝐂𝚫𝐃𝐎:\n\n • ]ㅤא 𝐨𝐮 ᶜᵗˡ\n\n • ] 🔥ᬊ͜͡♞𝐒𝚹͢𝐔 𝐂𝐑͢𝐢𝚫⃫ 𝐃͢𝚫⃫ 𝐂͢𝚲𝐑͢𝐓𝚵͢𝐋♞͜͡ᬉ🔥\n\n Use ${prefix}help ou ${prefix}menu, para usar o Ctl Client\n\n`
			teks2 = `\n\nEae mn seja bem vindo a Cartel Spam eu sou o bot da Cartel\n\n Use ${prefix}help ou ${prefix}menu para ver meus comandos\n\n`
			ctlclient.sendMessage(mdata.id, teks, MessageType.text)
			ctlclient.sendMessage(`${num.split('@')[0]}@s.whatsapp.net`, teks2, MessageType.text)
			} else if (anu.action == 'remove') {
			num = anu.participants[0]
			teks = `F`
			ctlclient.sendMessage(mdata.id, teks, MessageType.text)
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})


	ctlclient.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const speed = require('performance-now');
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = setting.apiKey // contact me on whatsapp wa.me/6285892766102
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			example = (type === 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedDisplayText : ''
			const isButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)


			const botNumber = ctlclient.user.jid
			const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] // replace this with your number
			const ctlOwners = ["553188514445@s.whatsapp.net","556784049268@s.whatsapp.net","5521999665495@s.whatsapp.net","5511986795776@s.whatsapp.net","551159140941@s.whatsapp.net","5511959140941@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await ctlclient.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			pushname = ctlclient.contacts[sender] != undefined ? ctlclient.contacts[sender].vname || ctlclient.contacts[sender].notify : undefined
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isCtlowners = ctlOwners.includes(sender)
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				ctlclient.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				ctlclient.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? ctlclient.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : ctlclient.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			const enviarfig = (stickerDir) => {
			ctlclient.sendMessage(from, {
			sticker: fs.readFileSync(stickerDir),
			mimetype: 'video/webp'
			})
			}


const sekarang = new Date().getTime();
			var ase = new Date();
                        var waktoo = ase.getHours();
                        switch(waktoo){
                case 0: waktoo = 'Meia-noite 🌑'; break;
                case 01: waktoo = 'De manhã cedo 🌑'; break;
                case 02: waktoo = 'De manhã cedo 🌒'; break;
                case 03: waktoo = 'De manhã cedo 🌓'; break;
                case 04: waktoo = 'Alvorecer 🌔'; break;
                case 05: waktoo = 'Alvorecer 🌔'; break;
                case 06: waktoo = 'Bom dia 🌕'; break;
                case 07: waktoo = 'Bom dia 🌕'; break;
                case 08: waktoo = 'Bom dia 🌕'; break;
                case 09: waktoo = 'Bom dia 🌕'; break;
                case 10: waktoo = 'Bom dia 🌕'; break;
                case 11: waktoo = 'Boa dia 🌕'; break;
                case 12: waktoo = 'Boa tarde ☀️'; break;
                case 13: waktoo = 'Boa tarde ☀️'; break;
                case 14: waktoo = 'Boa tarde ☀️'; break;
                case 15: waktoo = 'Boa tarde 🌕'; break;
                case 16: waktoo = 'Boa tarde 🌕'; break;
                case 17: waktoo = 'Boa tarde 🌖'; break;
                case 18: waktoo = 'Boa noite 🌘'; break;
                case 19: waktoo = 'Boa noite 🌑'; break;
                case 20: waktoo = 'Boa noite 🌑'; break;
                case 21: waktoo = 'Boa noite 🌑'; break;
                case 22: waktoo = 'Boa noite 🌑'; break;
                case 23: waktoo = 'Boa noite 🌑'; break;
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
            var data = '' + hari + '/' + tanggal + '/' + bulan1 + '/' + tahun;
            var horario = jam + ':' + menit + ':' + detik;


if (budy.includes("youtu.be")){
		      if (!isGroup) return
		      if (!isAntiLink) return
		      if (isGroupAdmins) return
		      ctlclient.updatePresence(from, Presence.composing)
		      var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		      ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
		      }

if (budy.includes("http://")){
		      if (!isGroup) return
		      if (!isAntiLink) return
		      if (isGroupAdmins) return
		      ctlclient.updatePresence(from, Presence.composing)
		      var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		      ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
		      }

if (budy.includes("https://")){
		      if (!isGroup) return
		      if (!isAntiLink) return
		      if (isGroupAdmins) return
		      ctlclient.updatePresence(from, Presence.composing)
		      var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		      ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
		      }

if (budy.includes("chat.whats")){
		      if (!isGroup) return
		      if (!isAntiLink) return
		      if (isGroupAdmins) return
		      ctlclient.updatePresence(from, Presence.composing)
		      var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		      ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
		      }
		      
	 /*if (budy.includes("Oi")){
	                  figadolf = fs.readFileSync('./src/adolf.webp')
		      ctlclient.sendMessage(from, figadolf, sticker, {quoted: mek})
		      sendMess('Adolf Jackson 👍')
		      }*/
		      
	if (budy.includes("Oi")){
	enviarfig('./src/adolf.webp')
	}
		      
	     /* if (budy.includes("🔒 FECHAR GRUPO")){
		client.updatePresence(from, Presence.composing) 
		if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
		if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da CTL\n\n')
		ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, true)
		}

	      if (budy.includes("🔓 ABRIR GRUPO")){
	    	client.updatePresence(from, Presence.composing) 
		if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
		if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da CTL\n\n')
		ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, false)
		}*/

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			let authorname = ctlclient.contacts[from] != undefined ? ctlclient.contacts[from].vname || ctlclient.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }	
			
			function addMetadata(packname, author) {	
				if (!packname) packname = 'WABot'; if (!author) author = 'Bot';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
					return `./src/stickers/${name}.exif`	
				})	

			}
			switch(command) {
				case 'menu':
				case 'help':
				    foto = fs.readFileSync('./src/foto1.jpg')
				    ctlclient.sendMessage(from, foto, image, {quoted: mek, caption: help(prefix)})
				    break

case 'acharmeupai':
ctlclient.sendMessage(from, 'assim vc me complica né', text, { quoted: mek})
break

/*case "ppt":
if (args.length < 1) return reply(`Você deve digitar ${prefix}ppt pedra, ${prefix}ppt papel ou ${prefix}ppt tesoura`)
ppt = ["pedra","papel","tesoura"]
ppy = ppt[Math.floor(Math.random() * ppt.length)]
ppg = Math.floor(Math.random() * 13) + 349
pptb = ppy
pph = `Você ganhou ${ppg} em xp`
if ((pptb == "pedra" && args == "papel") || 
(pptb == "papel" && args == "tesoura") || 
(pptb == "tesoura" && args == "pedra")) {
var vit = "vitoria"
} else if ((pptb == "pedra" && args == "tesoura") || 
(pptb == "papel" && args == "pedra") || 
(pptb == "tesoura" && args == "papel")) {
var vit = "derrota"
} else if ((pptb == "pedra" && args == "pedra") ||
(pptb == "papel" && args == "papel") ||
(pptb == "tesoura" && args == "tesoura")) {
var vit = "empate"
} else if (vit = "undefined") {
return reply(ptbr.tterro())
}
if (vit == "vitoria") {
var tes = "Vitória do jogador"
}
if (vit == "derrota" ) {
var tes = "A vitória é do Pinguim🐧"
}
if (vit == "empate" ) {
var tes = "O jogo terminou em empate 🤝"
}
reply(`\n\n Ctl Client jogou: ${pptb}\n\n O jogador jogou: ${args}\n\n${tes}`)
if (tes == "Vitória do jogador") {
reply(pph)
}
break*/

				case 'setprefix':
					if (args.length < 1) return reply('\n\n Você precisa colocar o novo prefixo depois do comando!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n') 
					prefix = args[0]
					setting.prefix = prefix
					fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'))
					reply(`Novo prefixo: ${prefix}`)
					break

case 'testcart':
                let pi = ctlclient.prepareMessageFromContent(from, {
           "listMessage": {
						"title": "⌜ MENU KE -2 ⌟",
						"description": 'OjanBot',
						"buttonText": "𝐊𝐥𝐢𝐤 𝐃𝐢𝐬𝐢𝐧𝐢 ⌕",
						"listType": "SINGLE_SELECT",
						"sections": [
							{
								"title": "Pilih salah satu tot",
								"rows": [
									{
										"title": `${prefix}sound22`,
										"rowId": "ASU"
									},
									{
										"title": "maker menu",
										"rowId": "ASU"
									},
									{
										"title": "owner menu",
										"rowId": "ASU"
									},
									{
										"title": "spesial menu",
										"rowId": "ASU"
									},
									{
										"title": "sertifikat menu",
										"rowId": "ASU"
									},
									{
										"title": "stick menu",
										"rowId": "ASU"
									},
									{
										"title": "randomtext",
										"rowId": "ASU"
									},
									{
										"title": "game menu",
										"rowId": "ASU"
									},
									{
										"title": "tag menu",
										"rowId": "ASU"
									},
									{
										"title": "cek menu",
										"rowId": "ASU"
									},
									{
										"title": "news menu",
										"rowId": "ASU"
									},
									{
										"title": "storage menu",
										"rowId": "ASU"
									},
									{
										"title": "porn menu",
										"rowId": "ASU"
									},
									{
										"title": "sound menu",
										"rowId": "ASU"
									},
									{
										"title": "download menu",
										"rowId": "ASU"
									},
									{
										"title": "pro menu",
										"rowId": "ASU"
									},
									{
										"title": "grup menu",
										"rowId": "ASU"
									},
									{
										"title": "asupan menu",
										"rowId": "ASU"
									},
									{
										"title": "gacha cecan",
										"rowId": "ASU"
									},
									{
										"title": "nsfw menu",
										"rowId": "ASU"
									}
								]
							}
						]
					}}, {})
 ctlclient.relayWAMessage(pi, {waitForAck: true})
                break

				/*case 'autogroup':
				case 'autosettings':
					if (!isGroup) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para grupos!!\n\n')    
					buttons = [{buttonId: `.fechar`,buttonText:{displayText: '🔒 FECHAR GRUPO'},type:1},{buttonId:`.abrir`,buttonText:{displayText:'🔓 ABRIR GRUPO'},type:1}]
					imageMsg = (await ctlclient.prepareMessageMedia(fs.readFileSync(`./src/foto1.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/foto1.jpg`)})).imageMessage
					texto = "\n\n⌜♛⌟ 𝐂𝐋𝐎𝐒𝐄 𝐀𝐍𝐃 𝐎𝐏𝐄𝐍 𝐆𝐑𝐎𝐔𝐏 ▿ 𝐌𝐄𝐍𝐔\n"
					buttonsMessage = {
					contentText: texto,
					footerText: "🌟 CTL CLiENT - 2022", imageMessage: imageMsg,
					buttons: buttons,
					headerType: 4
					}
					prep = await ctlclient.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
					ctlclient.relayWAMessage(prep)
					break*/
					
				case 'phlogo':
					if (args.length < 1) return reply('\n\n Onde está o texto??\n\n')
					exe = body.slice(8)
					teks98 = exe.split("|")[0];
					teks99 = exe.split("|")[1];
					reply(`\n\n Eae ${waktoo}\n\n Calma ae que já estou fazendo\n\n`)
					i = await getBuffer(`https://akame-api.herokuapp.com/api/textpro/pornhub?texto=${teks98}&texto2=${teks99}&apikey=QsJ2nSNx`)
					ctlclient.sendMessage(from, i, image, {quoted: mek, caption: '\n\n punhetero safado\n\n'})
					break
					
				case 'travarios':
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					if (args.length < 1) return reply('Cadê o alvo')
					ctlclient.sendMessage(`${body.slice(11)}@s.whatsapp.net`, sholtz(prefix), text)
					/*ctlclient.sendMessage(`${ctlclient}@s.whatsapp.net`, sholtz(prefix), text)
					ctlclient.sendMessage(`${ctlclient}@s.whatsapp.net`, sholtz(prefix), text)
					ctlclient.sendMessage(`${ctlclient}@s.whatsapp.net`, sholtz(prefix), text)
					ctlclient.sendMessage(`${ctlclient}@s.whatsapp.net`, sholtz(prefix), text)
					ctlclient.sendMessage(`${ctlclient}@s.whatsapp.net`, sholtz(prefix), text)
					ctlclient.sendMessage(`${ctlclient}@s.whatsapp.net`, sholtz(prefix), text)
					ctlclient.sendMessage(`${ctlclient}@s.whatsapp.net`, sholtz(prefix), text)
					ctlclient.sendMessage(`${ctlclient}@s.whatsapp.net`, sholtz(prefix), text)
					ctlclient.sendMessage(`${ctlclient}@s.whatsapp.net`, sholtz(prefix), text)*/
					break
				case 'ddd':
					if (args.length < 1) return reply('\n\n Coloque o ddd que você quer consultar depois do comando!!\n\n')
					ctlclient = body.slice(5)
					ctl = await fetchJson(`https://akame-api.herokuapp.com/api/consulta/ddd?ddd=${ctlclient}&apikey=QsJ2nSNx`)
					foto = fs.readFileSync('./src/foto1.jpg')
				  	ctlclient.sendMessage(from, foto, image, {quoted: mek, caption: consultaddd(prefix)})
				    	break
					
				case 'normalrct1':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, false)
					ctlclient.groupUpdateSubject(from, `🔥⃟ ▪️ 𝐂𝐓͢𝐋 ⟠ 𝐓𝐒𝐒 𝟏𝟗𝟗𝟒▪️ ⃟🔥`)
					break

				case 'normalrct2':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, false)
					ctlclient.groupUpdateSubject(from, `🔥⃟ ▪️ 𝐂𝐓͢𝐋 ⟠ 𝐑𝐂𝐓 𝟐.𝟎▪️ ⃟🔥`)
					break

				case 'normalofc':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, false)
					ctlclient.groupUpdateSubject(from, `🔥⃟ ▪️ 𝐂𝐓͢𝐋 ⟠ 𝐎𝐅𝐂▪️ ⃟🔥`)
					break

				case 'normaladms':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, false)
					ctlclient.groupUpdateSubject(from, ` 𐎟 𝚫͢𝐃𝐌͢𝐢𝐍𝐒͢ 𐎟 𝐂𝐓͢𝐋 𐎟`)
					break

				case 'tag':
					ctlclient.sendMessage(from, tag(prefix, pushname), text)
					break

				case 'attp':
					if (!isGroup) return reply('\n\n Este é apenas para grupos!!\n\n')
					if (args.length < 1) return reply(`Cadê o texto?`)
					attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
					ctlclient.sendMessage(from, attp2, sticker, {quoted: mek})
					break

				case 'figu':
				case 'fig':
				case 'f':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await ctlclient.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply('\n\n Erro, tente denovo\n\n')
							})
							.on('end', function () {
								console.log('Finish')
								ctlclient.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await ctlclient.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply('\n\n Espere um pouco\n\n')
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Falhou, no momento da conversão ${tipe} para o adesivo`)
							})
							.on('end', function () {
								console.log('Finish')
								ctlclient.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await ctlclient.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply('\n\n Espere um pouco\n\n')
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Falha, ocorreu um erro, tente novamente mais tarde.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply('\n\n Erro, tente denovo\n\n')
								ctlclient.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
								reply(`\n\n Olá ${pushname}, sua figurinha está pronta 👍\n\n`)
							})
						})
					} else {
						reply(`Envie fotos com legendas *.f* ou marque uma imagem que já foi enviada`)
					}
					break

				case 'toimg':
					if (!isQuotedSticker) return reply('{ ❗ } *Marque a figurinha*')
					reply('\n\n Espere um pouco\n\n')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await ctlclient.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Falha ao converter adesivos em imagens ❌')
						buffer = fs.readFileSync(ran)
						ctlclient.sendMessage(from, buffer, image, {quoted: mek, caption: '>//<'})
						fs.unlinkSync(ran)
					})
					break

				case 'report':
					const msg = body.slice(8)
					if (args.length < 1) return reply('Onde está o texto?')
					if (msg.length > 300) return ctlclient.sendMessage(from, 'Ops..., passou de 300 caracteres.', text, {quoted: mek})
					var nomor = mek.participant
					const teks1 = `\n\n ~  👑 CTL CLIENT\n\n Reportado por: wa.me/+${sender.split("@")[0]}\n\nBug: ${msg}`
					var options = {
					text: teks1,
					contextInfo: {mentionedJid: [nomor]},
					}
					ctlclient.sendMessage(`5511986795776@s.whatsapp.net`, options, text)
					reply('bug reportado')
					break

				case 'speed':
				case 'ping':
					const timestamp = speed();
					const latensi = speed() - timestamp
					ctlclient.updatePresence(from, Presence.composing) 
					uptime = process.uptime()
					ctlclient.sendMessage(from, `\n\n Velocidade: ${latensi.toFixed(4)} Segundos\n\n RAM: 4/128\n\n Dispositivo: Xiaomi\n\n O bot está ativo a ${kyun(uptime)}\n\n`, text, { quoted: mek})
					break

				case 'delete':
				case 'del':
				case 'd':  
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					ctlclient.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break

				case 'nome':
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n')    
					if (args.length < 1) return reply('Coloque o nome depois do comando!!')
					const ctlclientnm = body.slice(6)
					ctlclient.groupUpdateSubject(from, `${ctlclientnm}`)
					break

				case 'open':
				case 'opengp':
				case 'unopen':
				case 'abrir':
				case 'abrirgp':
					if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, false)
					break

				case 'lock':
				case 'lockgp':
				case 'unlock':
				case 'close':
				case 'closegp':
				case 'fechar':
				case 'fechargp':
					if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n')
					if (!isGroupAdmins) return reply('\n\n Comando apenas para adms do grupo!!\n\n')
					//if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, true)
					break

				case 'antilink':
				case 'antlink':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da CTL\n\n')
					if (args.length < 1) return reply('\n\n Use 1 para ativar ou 0 para desativar!!\n\n')
					if (Number(args[0]) === 1) {
					if (isAntiLink) return reply(`\n\n Oiee, ${ucapanFakereply}, O anti-link está ativo\n\n`)
					antilink.push(from)
					fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
					reply(`\n\n Oiee, ${ucapanFakereply}, O anti-link foi ativado\n\n`)
					} else if (Number(args[0]) === 0) {			
					antilink.splice(from, 1)
					fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
					reply(`\n\n Oiee, ${ucapanFakereply}, O anti-link foi desativado\n\n`)
					} else {
					reply(`\n\n Oiee, ${ucapanFakereply}, Use 1 para ativar ou 0 para desativar\n\n`)
					}
					break

				case 'bemvindo':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da CTL\n\n')
					if (args.length < 1) return reply('\n\n Use 1 para ativar ou 0 para desativar!!\n\n')
					if (Number(args[0]) === 1) {
					if (isWelkom) return reply(`\n\n Oiee, ${ucapanFakereply}, O sistema de bem vindo está ativo\n\n`)
				    	welkom.push(from)
					fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
				    	reply(`\n\n Oiee, ${ucapanFakereply}, O sistema de bem vindo foi ativado\n\n`)
					} else if (Number(args[0]) === 0) {
					welkom.splice(from, 1)
					fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
					reply(`\n\n Oiee, ${ucapanFakereply}, O sistema de bem vindo foi desativado\n\n`)
					} else {
					reply(`\n\n Oiee, ${ucapanFakereply}, Use 1 para ativar ou 0 para desativar\n\n`)
					}
					break

				case 'spampreparar':
					if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					if (args.length < 1) return reply('Coloque a hora depois do comando!!')
					horaatk = body.slice(14)
					ctlclient.groupUpdateSubject(from, `‼️ ATK SPAM ${horaatk} ‼️`)
					break

				case 'spamagr':
					if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					setTimeout( () => {
					ctlclient.groupUpdateSubject(from, ` ‼️ ATK SPAM AGORA ‼️ `)
					}, 500)
					ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, true)
					break

				case 'divupreparar':
					if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					if (args.length < 1) return reply('Coloque a hora depois do comando!!')
					horaatk = body.slice(14)
					ctlclient.groupUpdateSubject(from, `‼️ ATK DIVU ${horaatk} ‼️`)
					break

				case 'divuagr':
				    if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n')
				    if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
				    ctlclient.groupUpdateSubject(from, ` ‼️ ATK DIVU AGORA ‼️ `)
				    ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, true)
				    break

				case 'subir':
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					break

case 'marcar':
					if (!isGroup) return reply(mesg.gp)
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n ~  👑 CTL CLIENT \n\n'
					for (let mem of groupMembers) {
						teks += ` ~  @${mem.jid.split('@')[0]}\n\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break

				case 'sorteio':
					if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')    
					member = []
					const ctl1 = groupMembers
                        			const ctl2 = ctl1[Math.floor(Math.random() * ctl1.length)]          
                        			textsorteio = `\n\n ~  👑 CTL CLIENT \n\n Vencedor: @${ctl2.jid.split('@')[0]} \n\n PARABÉNS VOCÊ GANHOU O SORTEIO!!\n\n`
                        			member.push(ctl2.jid)
                        			mentions(textsorteio, member, true)
                        			break

				case 'cassino':
					const ctl = ['7', '🍉', '🍒', '🍊', '🍌', '🍇']
					const dv1 = ctl[Math.floor(Math.random() * (ctl.length))]
					const dv2 = ctl[Math.floor(Math.random() * (ctl.length))]
					const dv3 = ctl[Math.floor(Math.random() * (ctl.length))]
					//const ctlcassino = ' ~  👑  CTL CASSINO\n-- ${dv1} : ${dv2} : ${dv3}'
					ctlclient.sendMessage(from, `\n\n ~  👑 CTL CASSINO\n\n-- ${dv1} : ${dv2} : ${dv3}\n\n`, text, {quoted: mek})
					break

case 'oi':
ctlclient.sendMessage(from, 'oi', text)
break

case 'bomdia':
ctlclient.sendMessage(from, 'bomdiaa', text)
break

case 'boatarde':
ctlclient.sendMessage(from, 'boatardee', text)
break

case 'testbutton':
buttons = [{buttonId: `.oi`,buttonText:{displayText: 'oi'},type:1},{buttonId:`.bomdia`,buttonText:{displayText:'bomdia'},type:1},{buttonId:`.boatarde`,buttonText:{displayText:'boatarde'},type:1}]

imageMsg = (await ctlclient.prepareMessageMedia(fs.readFileSync(`./src/foto1.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/foto1.jpg`)})).imageMessage

dvingithub = "CTL BUTTON"

buttonsMessage = {
contentText: dvingithub,
footerText: "by davi - CTL 2022", imageMessage: imageMsg,
buttons: buttons,
headerType: 4
}
prep = await ctlclient.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
ctlclient.relayWAMessage(prep)
break

				/*case 'autogroup':
				case 'autosettings':
					if (!isGroup) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para grupos!!\n\n')    
					buttons = [{buttonId: `.oi`,buttonText:{displayText: 'mandar oi'},type:1},{buttonId:`.boatarde`,buttonText:{displayText:'mandar boa tarde'},type:1}]
					imageMsg = (await ctlclient.prepareMessageMedia(fs.readFileSync(`./src/foto1.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/foto1.jpg`)})).imageMessage
					texto = "\n\n⌜♛⌟ 𝐂𝐋𝐎𝐒𝐄 𝐀𝐍𝐃 𝐎𝐏𝐄𝐍 𝐆𝐑𝐎𝐔𝐏 ▿ 𝐌𝐄𝐍𝐔\n"
					buttonsMessage = {
					contentText: texto,
					footerText: "🌟 CTL CLiENT - 2022", imageMessage: imageMsg,
					buttons: buttons,
					headerType: 4
					}
					prep = await ctlclient.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
					ctlclient.relayWAMessage(prep)
					break*/

/*case 'buttons':
buttons = [{buttonId: `null`,buttonText:{displayText: ' 🔒 FECHAR GRUPO'},type:1},{buttonId:`null`,buttonText:{displayText:' 🔓 ABRIR GRUPO'},type:1}]
imageMsg = (await ctlclient.prepareMessageMedia(fs.readFileSync(`./foto2.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./foto3.jpg`)})).imageMessage
texto = " ⌜♛⌟ 𝐂𝐋𝐎𝐒𝐄 𝐀𝐍𝐃 𝐎𝐏𝐄𝐍 𝐆𝐑𝐎𝐔𝐏 ▿ 𝐌𝐄𝐍𝐔"
buttonsMessage = {
contentText: texto,
footerText: "🌟 CTL CLiENT - 2022", imageMessage: imageMsg,
buttons: buttons,
headerType: 4
}
prep = await ctlclient.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
ctlclient.relayWAMessage(prep)
break*/

					
				default:
/*if (example === '🔓 ABRIR GRUPO') {
client.updatePresence(from, Presence.composing) 
if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n')
if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
client.groupSettingChange (from, GroupSettingChange.messageSend, false)
}
if (example === '🔒 FECHAR GRUPO') {
client.updatePresence(from, Presence.composing) 
if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n')
if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da Ctl!!\n\n')
client.groupSettingChange (from, GroupSettingChange.messageSend, true);
}*/
					if (isGroup && budy != undefined) {
						console.log(budy)
					} else {
						return //console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()