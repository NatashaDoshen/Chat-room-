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

		