// assets/js/api.js

// Ce fichier centralisera tous les appels `fetch` vers votre backend PHP.
// Pour l'instant, nous simulons les appels.

const FAKE_DELAY = 500; // Simule la latence du réseau












// assets/js/api.js

// ... (fonctions et données existantes)

const FAKE_FRIEND_REQUESTS = [
    { id: 2, name: "Alice Martin", avatar: "https://i.pravatar.cc/60?u=2" },
    { id: 3, name: "Charlie Durand", avatar: "https://i.pravatar.cc/60?u=3" }
];

const FAKE_ALL_USERS = [
    { id: 2, name: "Alice Martin", avatar: "https://i.pravatar.cc/60?u=2" },
    { id: 3, name: "Charlie Durand", avatar: "https://i.pravatar.cc/60?u=3" },
    { id: 4, name: "David Bernard", avatar: "https://i.pravatar.cc/60?u=4" },
    { id: 5, name: "Eva Petit", avatar: "https://i.pravatar.cc/60?u=5" }
];

async function apiFetchFriendRequests() {
    console.log("API: Récupération des demandes d'amis...");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ success: true, requests: FAKE_FRIEND_REQUESTS });
        }, 400);
    });
}

async function apiFetchAllUsers() {
    console.log("API: Récupération de tous les utilisateurs...");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ success: true, users: FAKE_ALL_USERS });
        }, 600);
    });
}

// assets/js/api.js

// ... (fonctions et données existantes)

const FAKE_CONVERSATIONS = [
    { id: 1, userId: 2, userName: "Alice Martin", userAvatar: "https://i.pravatar.cc/50?u=2", lastMessage: "Ok, ça marche pour moi !" },
    { id: 2, userId: 4, userName: "David Bernard", userAvatar: "https://i.pravatar.cc/50?u=4", lastMessage: "Tu as vu le dernier épisode ?" }
];

const FAKE_MESSAGES = {
    "1": [ // Messages pour la conversation avec l'ID 1 (Alice)
        { text: "Salut ! Comment ça va ?", isMe: false },
        { text: "Hey, ça va bien et toi ?", isMe: true },
        { text: "Super ! Dispo pour le projet demain ?", isMe: false },
        { text: "Ok, ça marche pour moi !", isMe: false }
    ],
    "2": [ // Messages pour la conversation avec l'ID 2 (David)
        { text: "Tu as vu le dernier épisode ?", isMe: false }
    ]
};

async function apiFetchConversations() {
    console.log("API: Récupération des conversations...");
    return new Promise(resolve => {
        setTimeout(() => resolve({ success: true, conversations: FAKE_CONVERSATIONS }), 300);
    });
}

async function apiFetchMessagesForConversation(conversationId) {
    console.log(`API: Récupération des messages pour la conv #${conversationId}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            const messages = FAKE_MESSAGES[conversationId] || [];
            resolve({ success: true, messages: messages });
        }, 500);
    });
}

// assets/js/api.js

// ... (fonctions existantes)

const FAKE_REPLIES = [
    "Salut !",
    "Haha, je suis d'accord.",
    "Non, je ne pense pas.",
    "Peut-être...",
    "Je te redis ça plus tard.",
    "D'accord.",
    "Vu."
];

// Simule la réception d'un nouveau message
async function apiGetNewMessage(fromUserName) {
    console.log(`API: Vérification de nouveaux messages de ${fromUserName}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            // Une chance sur trois de recevoir un message pour rendre ça plus réaliste
            if (Math.random() < 0.33) {
                const randomReply = FAKE_REPLIES[Math.floor(Math.random() * FAKE_REPLIES.length)];
                console.log(`API: Nouveau message reçu !`);
                resolve({ success: true, message: { text: randomReply, isMe: false } });
            } else {
                // Pas de nouveau message cette fois
                resolve({ success: false });
            }
        }, 1000); // Simule une latence réseau de 1s
    });
}

