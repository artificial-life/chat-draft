'use strict'

const Hapi = require('hapi');
const Nes = require('nes');

const server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 9999
});

module.exports = {
	run(chat) {
		server.register(Nes, function(err) {
			server.subscription('/chat/message/new');

			let publish_new = server.publish.bind(server, '/chat/message/new');

			chat.on('operator-message', publish_new);
			chat.on('client-message', publish_new);

			server.route({
				method: 'post',
				path: '/chat/message',
				config: {
					id: 'chat-message',
					handler: function(request, reply) {
						chat.addMessage(request.payload);
					}
				}
			});

			server.start(function(err) {
				console.log('start serve');
			});

			server.route({
				method: 'GET',
				path: '/chat/contacts',
				handler: function(request, reply) {
					return reply(chat.getContactList());
				}
			});

			server.route({
				method: 'GET',
				path: '/chat/dialog/{id}',
				handler: function(request, reply) {
					let id = request.params.id;
					let dialog = chat.getDialog(id);

					return reply(dialog.loadMessages());
				}
			});


		});
	}
}
