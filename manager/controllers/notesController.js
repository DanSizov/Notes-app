import axios from 'axios';

import axiosRetry from 'axios-retry';

class NotesManager {

    constructor(accessorApiUrl, port, httpServer, fayeClient) {
        this.accessorApiUrl = accessorApiUrl;
        this.port = port;
        this.bayeux = null;
        this.httpServer = httpServer;
        this.fayeClient = fayeClient;
        axiosRetry(axios, {
            retries: 3,
            retryCondition: (error) => {
                const shouldRetry = axiosRetry.isNetworkOrIdempotentRequestError(error);
                const isRetryableMethod = error.config && (error.config.method === 'get' || error.config.method === 'post');
                return shouldRetry && isRetryableMethod;
            }
        });
    }

    async createNote(noteData) {
        try {
            const response = await axios.post(`${this.accessorApiUrl}/notes`, noteData);
            this.publishUpdate('/notes', { event: 'created', note: response.data });
            return response.data;
        } catch (error) {
            console.error("Failed to create note: ", error);
            throw error;
        }
    }

    async getNotes() {
        try {
            const response = await axios.get(`${this.accessorApiUrl}/notes`);
            return response.data;
        } catch (error) {
            console.error("Failed to get notes: ", error);
            throw error;
        }
    }

    async updateNote(noteId, noteData) {
        try {
            const response = await axios.put(`${this.accessorApiUrl}/notes/${noteId}`, noteData);
            this.publishUpdate('/notes', { event: 'updated', note: response.data });
            return response.data;
        } catch (error) {
            console.error("Failed to update note: ", error);
            throw error;
        }
    }

    async deleteNote(noteId) {
        try {
            const response = await axios.delete(`${this.accessorApiUrl}/notes/${noteId}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to delete note with id : ${noteId}. Error: `, error);
            throw error;
        }
    }

    // setupWebSocket(webSocketPath) {
    //     if (!this.httpServer) {
    //         throw new Error('httpServer is not defined');
    //     }
    //     this.bayeux = new webSocketServer({ mount: webSocketPath, timeout: 45 });
    //     this.bayeux.attach(this.httpServer);

    //     this.bayeux.on('handshake', (clientId) => {
    //         console.log(`WebSocket connection established with client: ${clientId}`);
    //     });

    //     this.bayeux.on('subscribe', (clientId, channel) => {
    //         console.log(`Client: ${clientId} subscribed to channel: ${channel}`);
    //     });
    // }

    publishUpdate(channel, data) {
        this.fayeClient.publish(channel, data);
    }

}

export default NotesManager;