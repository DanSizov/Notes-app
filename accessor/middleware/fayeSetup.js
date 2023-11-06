import faye from 'faye';

export const bayeux = new faye.NodeAdapter({ mount: '/faye', timeout: 45 });
export function attachBayeuxToServer(server) {
    bayeux.attach(server);

    bayeux.on('publish', (clientId, channel, data) => {
        if (channel === '/notes') {
            console.log('Message from manager:', data);
        }
    });
}
