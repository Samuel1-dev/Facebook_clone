// assets/js/templates.js




// Nouveau template pour une carte utilisateur

// assets/js/templates.js

// ... (fonctions existantes)

// Template pour un élément de la liste des conversations (sidebar)
function createConversationItemHTML(convo) {
    return `
        <div class="conversation-item" data-conv-id="${convo.id}" data-user-name="${convo.userName}" data-user-avatar="${convo.userAvatar}" style="display: flex; align-items: center; padding: 10px; gap: 10px; cursor: pointer;">
            <img src="${convo.userAvatar}" alt="${convo.userName}" style="width: 50px; height: 50px; border-radius: 50%;">
            <div>
                <strong>${convo.userName}</strong>
                <p style="margin: 0; color: #666; font-size: 0.9em;">${convo.lastMessage}</p>
            </div>
        </div>
    `;
}

// Template pour un message dans une conversation
function createMessageHTML(message) {
    // On aligne à droite si c'est notre message, à gauche sinon
    const messageClass = message.isMe ? 'sent' : 'received';
    const alignStyle = message.isMe ? 'align-self: flex-end; background-color: #0084ff; color: white;' : 'align-self: flex-start; background-color: #e4e6eb;';
    
    return `
        <div class="message ${messageClass}" style="max-width: 60%; padding: 8px 12px; border-radius: 18px; margin-bottom: 5px; ${alignStyle}">
            <p style="margin: 0;">${message.text}</p>
        </div>
    `;
}

