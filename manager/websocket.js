import { createServer } from 'http';
import { Faye } from 'faye';

const server = createServer();
const bayeux = new Faye.NodeAdapter({ mount: '/faye', timeout: 45 });
bayeux.attach(server);
export default server;