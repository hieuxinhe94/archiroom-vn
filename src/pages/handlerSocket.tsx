import React, { useEffect, useState } from "react";
import io from "socket.io-client";



const PageSocket = () => {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [socket, setSocket] = useState(null);
    
    useEffect(() => {
        socketInitializer();

        return () => {
            socket?.disconnect();
        };
    }, [socket]);

    async function socketInitializer() {

        // ping the server to setup a socket if not already running
        //await fetch("http://localhost:3000");

        // Setup the Socket 
        const socket = io('https://api.tryonhub.ai/socket/vto_biz');

        socket.emit('events', { test: 'my-biz-id' });
        // Standard socket management
        socket.on('connect', () => {
            console.log('Connected to the server');

            socket.emit('events', { test: 'my-biz-id' });
            socket.emit('identity', 0, response =>
              console.log('Identity:', response),
            );
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the server');
        });

        socket.on('connect_error', (error) => {
            console.log('Connection error:', error);
        });

        socket.on('reconnect', (attemptNumber) => {
            console.log('Reconnected to the server. Attempt:', attemptNumber);
        });

        socket.on('reconnect_error', (error) => {
            console.log('Reconnection error:', error);
        });

        socket.on('reconnect_failed', () => {
            console.log('Failed to reconnect to the server');
        });

        // Manage socket message events
        socket.on('client-new', (message) => {
            console.log("new client", message);
        });

        socket.on('message', (message) => {
            console.log("Message", message);
        });

        socket.on('client-count', (count) => {
            console.log("clientCount", count)
        });

        setSocket(socket)
    }

    function handleSubmit(e) {
        e.preventDefault();

        socket.emit("VTO", {
            username,
            message
        });

        setMessage("");
    }

    return (
        <div>
            <h1>Chat app</h1>
            <h1>Enter a username</h1>

            <input value={username} onChange={(e) => setUsername(e.target.value)} />

            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        name="message"
                        placeholder="enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        autoComplete={"off"}
                    />
                </form>
            </div>
        </div>
    );
};

export default PageSocket;