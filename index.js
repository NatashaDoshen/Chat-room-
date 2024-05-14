
		let socket = io();

		let form = document.getElementById('form');
		let myname = document.getElementById('myname');
		let message = document.getElementById('message');
		let messageArea = document.getElementById('messageArea');

		form.addEventListener('submit', (e) => {
			e.preventDefault();

			if (message.value) {
				socket.emit('send name', myname.value);
				socket.emit('send message', message.value);
				message.value = '';
			}
		});

		socket.on('send name', (username) => {
			let name = document.createElement('p');
			name.classList.add('message');
			name.innerHTML = `<span class="username">${username}:</span>`;
			messageArea.appendChild(name);
		});

		socket.on('send message', (chat) => {
			let chatContent = document.createElement('p');
			chatContent.classList.add('message');
			chatContent.textContent = chat;
			messageArea.appendChild(chatContent);
		});
        const http = require('http');
        const fs = require('fs');
         
        const server = http.createServer((req, res) => {
            if (req.url === '/') {
                fs.readFile(__dirname + '/index.html', (err, data) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error loading index.html');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(data);
                    }
                });
            }
        });
         
        const io = require('socket.io')(server);
        const port = 5000;
         
        io.on('connection', (socket) => {
            socket.on('send name', (user) => {
                io.emit('send name', user);
            });
         
            socket.on('send message', (chat) => {
                io.emit('send message', chat);
            });
        });
         
        server.listen(port, () => {
            console.log(`Server is listening at the port: ${port}`);
        });