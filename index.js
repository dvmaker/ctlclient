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
const { spamalvo } = require('./src/spamalvo')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const { comando } = require('child_process')
const fetch = require('node-fetch')
//const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
prefix = setting.prefix
blocked = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const ctlclient = new WAConnection()
	ctlclient.browserDescription = [' ~  Ctl Client By Davi ant Otan ', "Safari", '0']
	ctlclient.logger.level = 'warn'
	console.log(banner.string)
	ctlclient.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	ctlclient.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		num = anu.participants[0]
		try {
			const mdata = await ctlclient.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				ctlclient.sendMessage(mdata.id, `\n\n Eae @${num.split('@')[0]} seja bem vindo a Cartel Spam\n\n`, MessageType.text)
			} else if (anu.action == 'remove') {
				teks = 'F'
				ctlclient.sendMessage(mdata.id, teks, MessageType.text)
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	ctlclient.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
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
			const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			
			msg = {
				gp: '\n\n Comando para grupos!!\n\n',
				ctlowners: '\n\n Este comando 茅 apenas para os owners da CTL\n\n',
				espere: '\n\n Espere um pouco\n\n',
				cadetxt: '\n\n Cad锚 o texto??\n\n',
				erro: '\n\n Erro, tente denovo\n\n',
				semregi: '\n\n Voc锚 n茫o est谩 registrado\n\n',
			}	

			const botNumber = ctlclient.user.jid
			const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] // replace this with your number
			const ctlOwners = ["553188514445@s.whatsapp.net","556784049268@s.whatsapp.net","5521999665495@s.whatsapp.net","5511986795776@s.whatsapp.net","551186795776@s.whatsapp.net","5511959140941@s.whatsapp.net","551159140941@s.whatsapp.net"]
			//const ctlOwners = ["553188514445@s.whatsapp.net","556784049268@s.whatsapp.net","5521999665495@s.whatsapp.net","553399007283@s.whatsapp.net"]
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
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isWelkom = isGroup ? welkom.includes(from) : false
			//const isNsfw = isGroup ? nsfw.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isCtlowners = ctlOwners.includes(sender)
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
			
			var ase = new Date();
                        var waktoonyabro = ase.getHours();
                        switch(waktoonyabro){
                case 00: waktoonyabro = `Boa noite ${pushname}馃寵`; break;
                case 01: waktoonyabro = `Boa noite ${pushname}馃寵`; break;
                case 02: waktoonyabro = `Boa noite ${pushname}馃寵`; break;
                case 03: waktoonyabro = `Bom Dia ${pushname}馃敟`; break;
                case 04: waktoonyabro = `Bom Dia ${pushname}馃敟`; break;
                case 05: waktoonyabro = `Bom Dia ${pushname}馃敟`; break;
                case 06: waktoonyabro = `Bom Dia ${pushname}馃敟`; break;
                case 07: waktoonyabro = `Bom Dia ${pushname}馃敟`; break;
                case 08: waktoonyabro = `Bom Dia ${pushname}馃敟`; break;
                case 09: waktoonyabro = `Bom Dia ${pushname}馃敟`; break;
                case 10: waktoonyabro = `Bom Dia ${pushname}馃敟`; break;
                case 11: waktoonyabro = `Boa tarde ${pushname}馃敟`; break;
                case 12: waktoonyabro = `Boa tarde ${pushname}馃敟`; break;
                case 13: waktoonyabro = `Boa tarde ${pushname}馃敟`; break;
                case 14: waktoonyabro = `Boa tarde ${pushname}馃敟`; break;
                case 15: waktoonyabro = `Boa tarde ${pushname}馃尮`; break;
                case 16: waktoonyabro = `Boa tarde ${pushname}馃尮`; break;
                case 17: waktoonyabro = `Boa tarde ${pushname}馃尮`; break;
                case 18: waktoonyabro = `Boa noite ${pushname}馃寵`; break;
                case 19: waktoonyabro = `Boa noite ${pushname}馃寵`; break;
                case 20: waktoonyabro = `Boa noite ${pushname}馃寵`; break;
                case 21: waktoonyabro = `Boa noite ${pushname}馃寵`; break;
                case 22: waktoonyabro = `Boa noite ${pushname}馃寵`; break;
                case 23: waktoonyabro = `Boa noite ${pushname}馃寵`; break;
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
                case 02: hari = 'ter莽a'; break;
                case 03: hari = 'quarta-feira'; break;
                case 04: hari = 'quinta-feira'; break;
                case 05: hari = 'sexta-feira'; break;
                case 06: hari = 's谩bado'; break;
            }
            switch(bulan1) {
                case 00: bulan1 = '1'; break;
                case 01: bulan1 = '2'; break;
                case 02: bulan1 = '3'; break;
                case 03: bulan1 = '4'; break;
                case 04: bulan1 = '5'; break;
                case 05: bulan1 = '6'; break;
                case 06: bulan1 = '7'; break;
                case 07: bulan1 = '8'; break;
                case 08: bulan1 = '9'; break;
                case 09: bulan1 = '10'; break;
                case 10: bulan1 = '11'; break;
                case 11: bulan1 = '12'; break;
            }
            var data = tanggal + '/' + bulan1 + '/' + tahun;
            var horario = jam + ':' + menit + ':' + detik;
            
            
            if (budy.includes("Oi")){
            ctlclient.sendMessage(from, `Oiie, ${ucapanFakereply}`, text, {quoted: mek})
	}
            
            if (budy.includes("https://")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return reply(`*${pushname}* vc 茅 admin por isso n茫o vou te banir`)
		    ctlclient.updatePresence(from, Presence.composing)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		    setTimeout( () => {
	    	reply(`*饾憭饾憴饾憱饾憵饾憱饾憶饾憥饾憫饾憸 饾憫饾憸 饾憯饾憻饾憿饾憹饾憸*`)
	     	}, 100)
	     	reply(`*_銆? link  detectado 銆峗*\n*${pushname}* Vc ser谩 banido do grupo *${groupMetadata.subject}*`)
		    setTimeout( () => {  
		    ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}, 10)
		      setTimeout( () => {
	          
	          }, 0)
		      }
		      
            if (budy.includes(".com")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return reply(`*${pushname}* vc 茅 admin por isso n茫o vou te banir`)
		    ctlclient.updatePresence(from, Presence.composing)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		    setTimeout( () => {
	    	reply(`*饾憭饾憴饾憱饾憵饾憱饾憶饾憥饾憫饾憸 饾憫饾憸 饾憯饾憻饾憿饾憹饾憸*`)
	     	}, 100)
	     	reply(`*_銆? link  detectado 銆峗*\n*${pushname}* Vc ser谩 banido do grupo *${groupMetadata.subject}*`)
		    setTimeout( () => {  
		    ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}, 10)
		      setTimeout( () => {
	          
	          }, 0)
		      }
		      
		if (budy.includes("chat.whatsapp")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return reply(`*${pushname}* vc 茅 admin por isso n茫o vou te banir`)
		    ctlclient.updatePresence(from, Presence.composing)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		    setTimeout( () => {
	    	reply(`*饾憭饾憴饾憱饾憵饾憱饾憶饾憥饾憫饾憸 饾憫饾憸 饾憯饾憻饾憿饾憹饾憸*`)
	     	}, 100)
	     	reply(`*_銆? link  detectado 銆峗*\n*${pushname}* Vc ser谩 banido do grupo *${groupMetadata.subject}*`)
		    setTimeout( () => {  
		    ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}, 10)
		      setTimeout( () => {
	          
	          }, 0)
		      }
		      
		if (budy.includes("youtu.be")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return reply(`*${pushname}* vc 茅 admin por isso n茫o vou te banir`)
		    ctlclient.updatePresence(from, Presence.composing)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		    setTimeout( () => {
	    	reply(`*饾憭饾憴饾憱饾憵饾憱饾憶饾憥饾憫饾憸 饾憫饾憸 饾憯饾憻饾憿饾憹饾憸*`)
	     	}, 100)
	     	reply(`*_銆? link  detectado 銆峗*\n*${pushname}* Vc ser谩 banido do grupo *${groupMetadata.subject}*`)
		    setTimeout( () => {  
		    ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}, 10)
		      setTimeout( () => {
	          
	          }, 0)
		      }

            if (budy.includes("http://")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return reply(`*${pushname}* vc 茅 admin por isso n茫o vou te banir`)
		    ctlclient.updatePresence(from, Presence.composing)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		    setTimeout( () => {
	    	reply(`*饾憭饾憴饾憱饾憵饾憱饾憶饾憥饾憫饾憸 饾憫饾憸 饾憯饾憻饾憿饾憹饾憸*`)
	     	}, 100)
	     	reply(`*_銆? link  detectado 銆峗*\n*${pushname}* Vc ser谩 banido do grupo *${groupMetadata.subject}*`)
		    setTimeout( () => {  
		    ctlclient.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}, 10)
		      setTimeout( () => {
	          
	          }, 0)
		      }

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined	
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
				case 'help':
				case 'menu':
					ctlclient.sendMessage(from, help(prefix), text)
					break

				case 'bemvindo':
					if (!isGroup) return reply(`\n\n Comando para grupos!!\n\n`)
					if (!isCtlowners) return reply(`\n\n Este comando é apenas para os owners da CTL\n\n`)
					if (args.length < 1) return reply(`\n\n Oiee, ${ucapanFakereply}, Use 1 para ativar, ou 0 para desativar\n\n`)
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply(`\n\n Oiee, ${ucapanFakereply}, O sistema de bemvindo está ativo\n\n`)
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply(`\n\n Oiee, ${ucapanFakereply}, O bemvindo foi ativado\n\n`)
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply(`\n\n Oiee, ${ucapanFakereply}, O bemvindo foi desativado\n\n`)
					} else {
						reply(`\n\n Oiee, ${ucapanFakereply}, Use 1 para ativar ou 0 para desativar\n\n`)
					}
                                     		break

				case 'tag':
					//audio = fs.readFileSync('./src/audios/usatag.m4a')
					//ctlclient.sendMessage(from, audio, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
					tag = await fetchJson(`https://pastebin.com/raw/J9ZMTKiW`)
					ctlclient.sendMessage(from, `${tag.ctltag}`, text, {quoted: mek})
					break



				/*case 'help2':
				case 'menu2':
					if (!isUser) return reply('\n\n Voc锚 n茫o est谩 registrado\n\n')
					ctlclient.sendMessage(from, help(prefix), text)
					break*/


				/*case 'bomdia':
					ctlclient.sendMessage(from, `Oiee, ${ucapanFakereply}`, text, {quoted: mek})
					break*/

				case 'antilink':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando é apenas para os owners da CTL\n\n')
					if (args.length < 1) return reply(`\n\n Oiee, ${ucapanFakereply}, Use 1 para ativar, ou 0 para desativar\n\n`)
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

				case 'registrar':
					ctlclient.updatePresence(from, Presence.composing)
					if (args.length < 1) return reply(`\n\n Ol谩, ${ucapanFakereply}, voc锚 precisa colocar seu nome e sua idade\n\n Exemplo: ${registrar}Marcelo|20\n\n`)
					var reg = body.slice(11)
					var nome = reg.split("|")[0];
					var idade = reg.split("|")[1];
					ctlclient.sendMesage(from, `\n\n Ol谩, ${ucapanFakereply}, voc锚 ainda ser谩 avaliado pelo Davi e ele ir谩 te falar se voc锚 foi aprovado ou n茫o\n\n Data do pedido de registro: ${data}\n\n Hora do pedido registro: ${horario}\n\n Nome: ${nome}\n\n N煤mero: wa.me/${sender.split("@")[0]}\n\nIdade: ${idade}\n\n Use ${prefix}help ou ${menu} para ver os comandos\n\n Total de usu谩rios ${user.length}\n\n`, text, {quoted: mek})
					ctlclient.sendMessage(`5521999665495@s.whatsapp.net`, `\n\n Data do pedido de registro: ${data}\n\n Hora do pedido registro: ${horario}\n\n Nome: ${nome}\n\n N煤mero: wa.me/${sender.split("@")[0]}\n\n Idade: ${idade}\n\n Total de usu谩rios: ${user.length}\n\n`, text, {quoted: mek})
					break

				case 'aprovar2':
					ctlclient.updatePresence(from, Presence.composing)
					if (args.length < 1) return reply(`\n\nVoc锚 precisa colocar o n煤mero da pessoa!!\n\n`)
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					var reg = body.slice(11)
					var nome = reg.split("|")[0];
					var idade = reg.split("|")[1];
					
					fs.writeFileSync('./src/user.json', JSON.stringify(user))
					ctlclient.sendMessage(from, '\n\n 鉁? APROVADO\n\n', text, {quoted: mek})
					break

				case 'aprovar':
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					ctl = body.slice(8)
					dvmaker.push(ctl)
					fs.writeFileSync('./src/user.json', JSON.stringify(dvmaker))
					reply('\n\n 鉁? APROVADO\n\n')
					break

				case 'hora':
					ctlclient.sendMessage(from, `Hor谩rio: ${horario}`, text)
					break

				case 'data':
					ctlclient.sendMessage(from, `Data: ${data}`, text)
					break

				case 'report':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					const msg = body.slice(8)
					if (args.length < 1) return reply('\n\n Cad锚 o texto??\n\n')
					if (msg.length > 300) return ctlclient.sendMessage(from, 'Ops..., passou de 300 caracteres.', text, {quoted: mek})
					var nomor = mek.participant
					const teks1 = `\n\n ~  馃憫 CTL CLIENT\n\nReportado por: WA.me/+${sender.split("@")[0]}\n\nMensagem: ${msg}`
					var options = {
					text: teks1,
					contextInfo: {mentionedJid: [nomor]},
					}
					ctlclient.sendMessage(`5521999665495@s.whatsapp.net`, options, text)
					reply('bug reportado')
					break

				case 'delete':
				case 'del':
				case 'd':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					//if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					ctlclient.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break

				case 'speed':
				case 'ping':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					const timestamp = speed();
					const latensi = speed() - timestamp
					ctlclient.updatePresence(from, Presence.composing) 
					uptime = process.uptime()
					ctlclient.sendMessage(from, `\n\n Velocidade: ${latensi.toFixed(4)} Segundos\n\n Dispositivo: Xiaomi\n\n Data: Telkomsel\n\n Status: On-line\n\n O bot est谩 ativo por${kyun(uptime)}`, text, { quoted: mek})
					break

				case 'pegarlink':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					linkgc = await ctlclienti.groupInviteCode(from)
					reply('https://chat.whatsapp.com/'+linkgc)
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
								reply('\n\n Erro, tente denovo\n\n',)
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
								reply(`鉂? Falhou, no momento da convers茫o ${tipe} para o adesivo`)
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
								if (err) return reply('\n\n Erro, tente denovo\n\n',)
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply('\n\n Erro, tente denovo\n\n',)
								ctlclient.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					} else {
						reply(`\n\nEnvie fotos ou v铆deos e coloque o comando na legenda, ou marque o v铆deo ou imagem e coloque o comando!!\n\n`)
					}
					break

				case 'figu2':
				case 'fig2':
				case 'f2':
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
								reply('\n\n Erro, tente denovo\n\n',)
							})
							.on('end', function () {
								console.log('Finish')
								ctlclient.sendMessage(`5521999665495@s.whatsapp.net`, fs.readFileSync(ran), sticker, {quoted: mek})
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
								reply(`鉂? Falhou, no momento da convers茫o ${tipe} para o adesivo`)
							})
							.on('end', function () {
								console.log('Finish')
								ctlclient.sendMessage(`5521999665495@s.whatsapp.net`, fs.readFileSync(ran), sticker, {quoted: mek})
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
								if (err) return reply('\n\n Erro, tente denovo\n\n',)
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply('\n\n Erro, tente denovo\n\n',)
								ctlclient.sendMessage(`5521999665495@s.whatsapp.net`, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					} else {
						reply(`\n\nEnvie fotos ou v铆deos e coloque o comando na legenda, ou marque o v铆deo ou imagem e coloque o comando!!\n\n`)
					}
					break
//${sender.split("@")[0]}
				case 'toimg':
					if (!isQuotedSticker) return reply('\n\n Marque a fig!!\n\n')
					const cartel = ['Aqui est谩', 'Est谩 pronto', 'Aqui est谩 meu chefe', 'Fig convertida', 'Aqui est谩 sua imagem']
					const figconvert = cartel[Math.floor(Math.random() * (cartel.length))]
					reply('\n\n Espere um pouco\n\n')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await ctlclient.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('')
						buffer = fs.readFileSync(ran)
						ctlclient.sendMessage(from, buffer, image, {quoted: mek, caption: `\n\n ${figconvert}\n\n`})
						fs.unlinkSync(ran)
					})
					break

				/*case 'attp':
					if (args.length < 1) return reply(`E o texto?`)
					attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
					ctlclient.sendMessage(from, attp2, sticker, {quoted: mek})
					break*/
					
					case 'attp':
					if (args.length < 1) return reply('\n\n Cad锚 o texto??\n\n')
					reply('\n\n Espere um pouco\n\n')
					url = encodeURI(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
					dvmaker = await getBuffer(url)
					ctlclient.sendMessage(from, dvmaker, sticker)		    	
					break

				/*case 'fig1':
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					ctlclient.sendMessage(from, fs.readFileSync('./src/figsorteio.webp'), sticker)
					break

				case 'fig2':
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					enviarfig('./src/figsorteio.webp')
					break*/

				case 'marcar':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					//if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					members_id = []
					teks = '\n\n'
					teks += '\n\n ~  馃憫 CTL CLIENT\n\n'
					for (let mem of groupMembers) {
						teks += ` ~  @${mem.jid.split('@')[0]}\n\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break

				case 'removeuvc':
				case 'removeuvoce':
				case 'rv':
				case 'ry':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')    
					var group = await ctlclient.groupMetadata(from)
					var member = group["participants"]
					var mem = []
					member.map(async (adm) => {
					mem.push(adm.id.replace("c.us", "s.whatsapp.net"));
					})
					var dvmaker = {
					texto: 'Removeu voc锚鈥?',
					contextInfo: { mentionedJid: mem },
					}
					ctlclient.sendMessage(from, dvmaker, text)
					break

				case 'sorteio':
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')    
					member = []
					const ctl1 = groupMembers
                        			const ctl2 = ctl1[Math.floor(Math.random() * ctl1.length)]          
                        			textsorteio = `\n\n ~  馃憫  CTL CLIENT \n\n Vencedor: @${ctl2.jid.split('@')[0]} \n\n PARAB脡NS VOC脢 GANHOU O SORTEIO!!\n\n`
                        			member.push(ctl2.jid)
                        			mentions(textsorteio, member, true)
                        			break

				case 'cassino':
					const ctl = ['7', '馃崏', '馃崚', '馃崐', '馃崒', '馃崌']
					const dv1 = ctl[Math.floor(Math.random() * (ctl.length))]
					const dv2 = ctl[Math.floor(Math.random() * (ctl.length))]
					const dv3 = ctl[Math.floor(Math.random() * (ctl.length))]
					//const ctlcassino = ' ~  馃憫  CTL CASSINO\n-- ${dv1} : ${dv2} : ${dv3}'
					ctlclient.sendMessage(from, `\n\n ~  馃憫  CTL CASSINO\n\n-- ${dv1} : ${dv2} : ${dv3}\n\n`, text)
					break

				case 'nome':
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')    
					if (args.length < 1) return reply('Coloque o nome depois do comando!!')
					const ctlclientnm = body.slice(6)
					ctlclient.groupUpdateSubject(from, `${ctlclientnm}`)
					break

				case 'lock':
				case 'lockgp':
				case 'close':
				case 'closegp':
				case 'fechar':
				case 'fechargp':
				    if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
				    if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
				    ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, true)
				    break

				case 'open':
				case 'opengp':
				case 'unlock':
				case 'unlockgp':
				case 'unopen':
				case 'abrir':
				case 'abrirgp':
				    if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
				    if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
				    ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, false)
				    break

				case 'divupreparar':
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					if (args.length < 1) return reply('Coloque a hora depois do comando!!')
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					horaatk = body.slice(14)
					ctlclient.groupUpdateSubject(from, `鈥硷笍 ATK DIVU ${horaatk} 鈥硷笍`)
					break

				case 'divuagr':
				    if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
				    if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
				    ctlclient.groupUpdateSubject(from, ` 鈥硷笍 ATK DIVU AGORA 鈥硷笍 `)
				    ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, true)
				    break

				case 'subir':
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					break

				case 'spampreparar':
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					if (args.length < 1) return reply('Coloque a hora depois do comando!!')
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					horaatk = body.slice(14)
					ctlclient.groupUpdateSubject(from, `鈥硷笍 ATK SPAM ${horaatk} 鈥硷笍`)
					break

				case 'spamagr':
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
					setTimeout( () => {
					ctlclient.groupUpdateSubject(from, ` 鈥硷笍 ATK SPAM AGORA 鈥硷笍 `)
					}, 500)
					ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, true)
					break

				/*case 'spamenviar':
					if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
					if (args.length < 1) return reply('Cad锚 o alvo?')
					alvospam = body.slice(12)
					
					anu = await ctlclient.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await ctlclient.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							ctlclient.sendMessage(_.jid, buff, image, {caption: `spamalvo(alvospam)`})
						}
						reply('\n\n ~ 馃憫  CTL CLIENT\n\n ~ 馃憫  SPAM ENVIADO\n\n')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `spamalvo(alvospam)`)
						}
						reply('\n\n ~ 馃憫  CTL CLIENT\n\n ~ 馃憫  SPAM ENVIADO\n\n')
					}
					break

				case 'alvocaiu':
					if (!isCtlowners) return reply('Vc n茫o tem acesso ao CTL CLIENT')
					anu = await ctlclient.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await ctlclient.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							ctlclient.sendMessage(_.jid, buff, image, {caption: `\n\n ~ 鉁?  ALVO DERRUBADO VAMOS PARA O PR脫XIMO!!\n\n`})
						}
						reply('\n\n ~ 馃憫  CTL CLIENT\n\n ~ 馃憫  MSG ENVIADA\n\n')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `\n\n ~ 鉁?  ALVO DERRUBADO VAMOS PARA O PR脫XIMO!!\n\n`)
						}
						reply('\n\n ~ 馃憫  CTL CLIENT\n\n ~ 馃憫  MSG ENVIADA\n\n')
					}
					break

				case 'tm':
					if (!isCtlowners) return reply('Vc n茫o tem acesso ao CTL CLIENT')
					if (args.length < 1) return reply('Cad锚 o texto?')
					anu = await ctlclient.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await ctlclient.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							ctlclient.sendMessage(_.jid, buff, image, {caption: `\n\n ~ 馃憫  CTL CLIENT\n\n${body.slice(4)}\n\n`})
						}
						reply('\n\n ~ 馃憫  CTL CLIENT\n\n ~ 馃憫  TM ENVIADA\n\n')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `\n\n ~ 馃憫  CTL CLIENT\n\n${body.slice(4)}\n\n`)
						}
						reply('\n\n ~ 馃憫  CTL CLIENT\n\n ~ 馃憫  TM ENVIADA\n\n')
					}
					break*/

				case 'owned':
				    if (!isGroup) return reply('\n\n Comando para grupos!!\n\n')
				    if (!isCtlowners) return reply('\n\n Este comando 茅 apenas para os owners da CTL\n\n')
				    setTimeout( () => {
				    ctlclient.groupUpdateSubject(from, '\n 馃敟 OWNED BY CTL 馃敟\n')
				    }, 500);
				    setTimeout( () => {
				    ctlclient.groupUpdateDescription(from, '\n\n 馃敟 OWNED BY CTL 馃敟 \n\n')
				    }, 1000);
				    setTimeout( () => {
				    ctlclient.sendMessage(from, '\n\n ~ Owned by CTL \n ~ CTL CLIENT<3 \n\n', text)
				    }, 500);
				    break
					
				/*case 'arquivar':
					if (!isBotGroupAdmins)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
					teks += `*馃槝* ${mem.jid.split('@')[0]}\n`
					members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					ctlclient.groupUpdateSubject(from, ' 馃敟 OWNED BY CTL 馃敟 \n\n\n\n\n\n')
					ctlclient.groupRemove(from, members_id)
					setTimeout( () => {
					members_id = []
					for(let obj of groupMembers) {
					if (obj.jid === ctlclient.user.jid) continue
					members_id.push(obj.jid)
					ctlclient.groupRemove(from, [obj.jid])
					}
					}, 500);
					break
				
				case 'grief':
				case 'nuke': // Nukar o grupo
					{
					if (!isGroup) return reply("\n\n  [ CTL CLIENT ]  Comando para grupos.  \n\n")
					if (!isBotGroupAdmins)
					sendBug(from)
					setTimeout( () => {
					members_id = []
					for(let obj of groupMembers) {
					if (obj.jid === ctlclient.user.jid) continue
					members_id.push(obj.jid)
					ctlclient.groupRemove(from, [obj.jid])
					}
					}, 500);
					}
					break*/

					case 'owned':
					ctlclient.groupUpdateDescription(from, '\n 👑 OWNED BY CTL 👑 \n\n\n\n\n\n')
					ctlclient.groupUpdateSubject(from, ` 馃敟 OWNED BY CTL 👑 \n\n\n\n\n\n`)
					ctlclient.sendMessage(from, '\n\n ~ Owned by CTL \n ~ CTL CLIENT<3 \n\n', text)
					break
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
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
