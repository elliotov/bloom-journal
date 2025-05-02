import { useState } from "react";

export default function ChatInterface() {
    const [message, setMessage] = useState('');

    return(
        <div>
            <p>Chat will go here.</p>
            <input
                type="text"
                value={message}
                placeholder="type here..."
                onChange={(e) => setMessage(e.target.value)}
            />
            <p>Characters: {message.length}</p>
        </div>
    );
}