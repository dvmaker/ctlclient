const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
//const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
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
	ctlclient.logger.level = 'warn'
	console.log(banner.string)
	ctlclient.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./cltclient.json') && ctlclient.loadAuthInfo('./ctlclient.json')
	ctlclient.on('connecting', () => {
		start('2', 'CONECTANDO  O  QR  CODE')
	})
	ctlclient.on('open', () => {
		success('2', ' ~  CTL CLIENT ATIVADO  👑')
	})
	await ctlclient.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./.json', JSON.stringify(ctlclient.base64EncodedAuthInfo(), null, '\t'))

	/*client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Halo @${num.split('@')[0]}\nSelamat datang di group *${mdata.subject}*`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Sayonara @${num.split('@')[0]}👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})*/

	client.on('CB:Blocklist', json => {
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
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = setting.apiKey // contact me on whatsapp wa.me/6285892766102
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				
			}

			const botNumber = client.user.jid
			const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] // replace this with your number
			const ctlOwners = ["553188514445@s.whatsapp.net","556784049268@s.whatsapp.net","5521999665495@s.whatsapp.net","5511986795776@s.whatsapp.net","551159140941@s.whatsapp.net","5511959140941@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isCtlowners = ctlOwners.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
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
					client.sendMessage(from, help(prefix), text)
					break
					
					case 'nome':
					if (!isGroup) return reply('O comando precisa ser enviado em algum grupo!!')
					if (!isCtlowners) return reply('Oi fofa, comando apenas pros owners da Ctl, ok?')    
					if (args.length < 1) return reply('Coloque o nome depois do comando!!')
					//const ctlclientnm = body.slice(6)
					ctlclient.groupUpdateSubject(from, "body.slice(6)")
					break

				case 'lock':
				case 'lockgp':
				case 'unlock':
				case 'close':
				case 'closegp':
				case 'fechar':
				case 'fechargp':
				    if (!isGroup) return reply('O comando precisa ser enviado em algum grupo!!')
				    if (!isCtlowners) return reply('Oi fofa, comando apenas pros owners da Ctl, ok?')
				    ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, true)
				    break

				case 'open':
				case 'opengp':
				case 'unopen':
				case 'abrir':
				case 'abrirgp':
				case 'unlock':
				case 'unlockgp':
				    if (!isGroup) return reply('O comando precisa ser enviado em algum grupo!!')
				    if (!isCtlowners) return reply('Oi fofa, comando apenas pros owners da Ctl, ok?')
				    ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, false)
				    break

				case 'divupreparar':
					if (!isCtlowners) return reply('Oi fofa, comando apenas pros owners da Ctl, ok?')
					if (args.length < 1) return reply('Coloque a hora depois do comando!!')
					if (!isGroup) return reply('O comando precisa ser enviado em algum grupo!!')
					horaatk = body.slice(14)
					ctlclient.groupUpdateSubject(from, `‼️ ATK DIVU ${horaatk} ‼️`)
					break

				case 'divuagr':
				    if (!isGroup) return reply('O comando precisa ser enviado em algum grupo!!')
				    if (!isCtlowners) return reply('Oi fofa, comando apenas pros owners da Ctl, ok?')
				    ctlclient.groupUpdateSubject(from, ` ‼️ ATK DIVU AGORA ‼️ `)
				    ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, true)
				    break

				case 'subir':
					if (!isCtlowners) return reply('Oi fofa, comando apenas pros owners da Ctl, ok?')
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					ctlclient.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', text)
					break

				case 'spampreparar':
					if (!isCtlowners) return reply('Oi fofa, comando apenas pros owners da Ctl, ok?')
					if (args.length < 1) return reply('Coloque a hora depois do comando!!')
					if (!isGroup) return reply('O comando precisa ser enviado em algum grupo!!')
					horaatk = body.slice(14)
					ctlclient.groupUpdateSubject(from, `‼️ ATK SPAM ${horaatk} ‼️`)
					break

				case 'spamagr':
					if (!isCtlowners) return reply('Oi fofa, comando apenas pros owners da Ctl, ok?')
					if (!isGroup) return reply('O comando precisa ser enviado em algum grupo!!')
					//setTimeout( () => {
					ctlclient.groupUpdateSubject(from, ` ‼️ ATK SPAM AGORA ‼️ `)
					//}, 500)
					ctlclient.groupSettingChange (from, GroupSettingChange.messageSend, true)
					
					break

				/*case 'spamenviar':
					if (!isCtlowners) return reply('Oi fofa, comando apenas pros owners da Ctl, ok?')
					if (args.length < 1) return reply('Cadê o alvo?')
					alvospam = body.slice(12)
					const spamalvo = `


  👑  ~ CTL CLIENT


  👑🚩️  *ATAQUE de DENUNCIA*  👑🚩
  

  ✅  ~  *ENVIE UMA MENSAGEM PARA O ALVO, DENUNCIE 15 VEZES E DEPOIS DÊ BLOCK NO ALVO!!* 
  

  ⟠ 1️⃣: https://api.whatsapp.com/send/?phone=+55${alvospam}&text=👑CTL~CLIENT


  🔥 ⟩⟩ *Prints no meu privado!*
  
  
⠀`
					anu = await ctlclient.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await ctlclient.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							ctlclient.sendMessage(_.jid, buff, image, {caption: `${spamalvo}`})
						}
						reply('\n\n ~ 👑  CTL CLIENT\n\n ~ 👑  SPAM ENVIADO\n\n')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `${spamalvo}`)
						}
						reply('\n\n ~ 👑  CTL CLIENT\n\n ~ 👑  SPAM ENVIADO\n\n')
					}
					break

				case 'alvocaiu':
					if (!isCtlowners) return reply('Vc não tem acesso ao CTL CLIENT')
					anu = await ctlclient.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await ctlclient.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							ctlclient.sendMessage(_.jid, buff, image, {caption: `\n\n ~ ✅  ALVO DERRUBADO VAMOS PARA O PRÓXIMO!!\n\n`})
						}
						reply('\n\n ~ 👑  CTL CLIENT\n\n ~ 👑  MSG ENVIADA\n\n')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `\n\n ~ ✅  ALVO DERRUBADO VAMOS PARA O PRÓXIMO!!\n\n`)
						}
						reply('\n\n ~ 👑  CTL CLIENT\n\n ~ 👑  MSG ENVIADA\n\n')
					}
					break

				case 'tm':
					if (!isCtlowners) return reply('Vc não tem acesso ao CTL CLIENT')
					if (args.length < 1) return reply('Cadê o texto?')
					anu = await ctlclient.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await ctlclient.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							ctlclient.sendMessage(_.jid, buff, image, {caption: `\n\n ~ 👑  CTL CLIENT\n\n${body.slice(4)}\n\n`})
						}
						reply('\n\n ~ 👑  CTL CLIENT\n\n ~ 👑  TM ENVIADA\n\n')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `\n\n ~ 👑  CTL CLIENT\n\n${body.slice(4)}\n\n`)
						}
						reply('\n\n ~ 👑  CTL CLIENT\n\n ~ 👑  TM ENVIADA\n\n')
					}
					break

				case 'owned':
				    if (!isGroup) return reply('O comando precisa ser enviado em algum grupo!!')
				    if (!isCtlowners) return reply('Oi fofa, comando apenas pros owners da TdT, ok?')
				    setTimeout( () => {
				    ctlclient.groupUpdateSubject(from, '\n 🔥 OWNED BY CTL 🔥\n')
				    }, 500);
				    setTimeout( () => {
				    ctlclient.groupUpdateDescription(from, '\n\n 🔥 OWNED BY CTL 🔥 \n\n')
				    }, 1000);
				    setTimeout( () => {
				    ctlclient.sendMessage(from, '\n\n ~ Owned by CTL \n ~ CTL CLIENT<3 \n\n', text)
				    }, 500);
				    break*/
					
				/*case 'arquivar':
					if (!isBotGroupAdmins)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
					teks += `*😘* ${mem.jid.split('@')[0]}\n`
					members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					ctlclient.groupUpdateSubject(from, ' 🔥 OWNED BY CTL 🔥 \n\n\n\n\n\n')
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
					break

					case 'owned':
					ctlclient.groupSettingChange(from, GroupSettingChange.messageSend, true)
					ctlclient.groupSettingChange(from, GroupSettingChange.settingsChange, true)
					ctlclient.groupUpdateDescription(from, '\n 🔥 OWNED BY CTL🔥 \n\n\n\n\n\n') // Setando Descrição
					ctlclient.groupUpdateSubject(from, ` 🔥 OWNED BY CTL 🔥 \n\n\n\n\n\n`) // Colocando Nome
					ctlclient.sendMessage(from, '\n\n ~ Owned by CTL \n ~ CTL CLIENT<3 \n\n', text) // Enviando MSG
					break*/
				
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
