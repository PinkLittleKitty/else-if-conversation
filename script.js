// Default conversation tree
let conversationTree = {
    1: {
        question: "Do you live there?",
        options: {
            yes: {
                response: "I see! How long have you lived there?",
                nextQuestionId: 2
            },
            no: {
                response: "Oh, are you just visiting then?",
                nextQuestionId: 3
            }
        }
    },
    2: {
        question: "How long have you lived there?",
        options: {
            "Less than a year": {
                response: "You're still pretty new to the area then!",
                nextQuestionId: 4
            },
            "1-5 years": {
                response: "You must be pretty familiar with the neighborhood by now.",
                nextQuestionId: 4
            },
            "More than 5 years": {
                response: "Wow, you're practically a local expert!",
                nextQuestionId: 4
            }
        }
    },
    3: {
        question: "Are you just visiting then?",
        options: {
            yes: {
                response: "That's nice! How are you enjoying your visit?",
                nextQuestionId: 5
            },
            no: {
                response: "Oh, so you're planning to move there?",
                nextQuestionId: 6
            }
        }
    },
    4: {
        question: "Do you like living in that area?",
        options: {
            yes: {
                response: "That's great! What's your favorite thing about living there?",
                nextQuestionId: 7
            },
            no: {
                response: "I'm sorry to hear that. Are you planning to move somewhere else?",
                nextQuestionId: 8
            }
        }
    },
    5: {
        question: "How are you enjoying your visit?",
        options: {
            "It's great!": {
                response: "Wonderful! What's been your favorite place to visit so far?",
                nextQuestionId: 9
            },
            "It's okay": {
                response: "I see. What would make your visit better?",
                nextQuestionId: 10
            },
            "Not enjoying it": {
                response: "I'm sorry to hear that. What's been disappointing?",
                nextQuestionId: 11
            }
        }
    },
    6: {
        question: "Are you planning to move there?",
        options: {
            yes: {
                response: "How exciting! When are you planning to move?",
                nextQuestionId: 12
            },
            no: {
                response: "I see. So what brings you to that area?",
                nextQuestionId: 13
            }
        }
    },
    7: {
        question: "What's your favorite thing about living there?",
        options: {
            "The people": {
                response: "Community is so important! It's great you've found good people there.",
                nextQuestionId: null
            },
            "The location": {
                response: "Location is key! It's wonderful when you find the perfect spot.",
                nextQuestionId: null
            },
            "The amenities": {
                response: "Having good amenities nearby makes life so much more convenient!",
                nextQuestionId: null
            }
        }
    },
    8: {
        question: "Are you planning to move somewhere else?",
        options: {
            yes: {
                response: "Change can be good! I hope you find a place you love.",
                nextQuestionId: null
            },
            no: {
                response: "Sometimes we have to make the best of our current situation.",
                nextQuestionId: null
            },
            "Not sure yet": {
                response: "Taking time to decide is wise. It's a big decision!",
                nextQuestionId: null
            }
        }
    },
    9: {
        question: "What's been your favorite place to visit so far?",
        options: {
            "Local attractions": {
                response: "The local spots often have the most authentic experiences!",
                nextQuestionId: null
            },
            "Tourist sites": {
                response: "The famous spots are popular for a reason! Hope you got some great photos.",
                nextQuestionId: null
            },
            "Restaurants and cafes": {
                response: "Food is such an important part of experiencing a new place!",
                nextQuestionId: null
            }
        }
    },
    10: {
        question: "What would make your visit better?",
        options: {
            "Better weather": {
                response: "Weather can really impact a trip! Hopefully it improves for you.",
                nextQuestionId: null
            },
            "More time": {
                response: "There never seems to be enough time to see everything, does there?",
                nextQuestionId: null
            },
            "Local recommendations": {
                response: "Talking to locals can really enhance your experience!",
                nextQuestionId: null
            }
        }
    },
    11: {
        question: "What's been disappointing?",
        options: {
            "Too crowded": {
                response: "Crowds can definitely take away from the experience. Maybe try visiting some less popular spots?",
                nextQuestionId: null
            },
            "Too expensive": {
                response: "Travel costs can add up quickly! There are often free or low-cost alternatives worth exploring.",
                nextQuestionId: null
            },
            "Not what I expected": {
                response: "It's frustrating when reality doesn't match expectations. Sometimes the unexpected can lead to new discoveries though!",
                nextQuestionId: null
            }
        }
    },
    12: {
        question: "When are you planning to move?",
        options: {
            "Within a month": {
                response: "That's coming up quickly! I wish you a smooth transition to your new home.",
                nextQuestionId: null
            },
            "In a few months": {
                response: "That gives you some time to prepare. Moving can be both exciting and stressful!",
                nextQuestionId: null
            },
            "Next year": {
                response: "You have plenty of time to plan. I hope everything goes well with your move when the time comes!",
                nextQuestionId: null
            }
        }
    },
    13: {
        question: "What brings you to that area?",
        options: {
            "Work": {
                response: "Work takes us to many places! I hope it's a good opportunity for you.",
                nextQuestionId: null
            },
            "Family": {
                response: "Family connections are important. It's nice you're able to visit them.",
                nextQuestionId: null
            },
            "Just exploring": {
                response: "Exploration is a wonderful reason to visit new places! I hope you discover something interesting.",
                nextQuestionId: null
            }
        }
    }
};

// Global variables
let currentQuestionId = 1;
let selectedNodeId = null;

// DOM Elements
const elements = {
    // Tabs
    tabs: document.querySelectorAll('.tab'),
    sections: document.querySelectorAll('.section'),
    
    // Conversation elements
    currentQuestion: document.getElementById('current-question'),
    options: document.getElementById('options'),
    response: document.getElementById('response'),
    historyItems: document.getElementById('history-items'),
    
    // Editor elements
    nodeList: document.getElementById('node-list'),
    nodeId: document.getElementById('node-id'),
    nodeQuestion: document.getElementById('node-question'),
    optionsContainer: document.getElementById('options-container'),
    
    // Buttons
    resetBtn: document.getElementById('reset-btn'),
    editBtn: document.getElementById('edit-btn'),
    addNodeBtn: document.getElementById('add-node-btn'),
    addOptionBtn: document.getElementById('add-option-btn'),
    saveBtn: document.getElementById('save-btn'),
    exportBtn: document.getElementById('export-btn'),
    importBtn: document.getElementById('import-btn'),
    importFile: document.getElementById('importFile'),
    backBtn: document.getElementById('back-btn')
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the conversation
    displayQuestion(1);
    
    // Tab switching
    elements.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Button event listeners
    elements.resetBtn.addEventListener('click', resetConversation);
    elements.editBtn.addEventListener('click', () => switchTab('editor'));
    elements.addNodeBtn.addEventListener('click', addNewNode);
    elements.addOptionBtn.addEventListener('click', addOption);
    elements.saveBtn.addEventListener('click', saveConversation);
    elements.exportBtn.addEventListener('click', exportConversation);
    elements.importBtn.addEventListener('click', () => elements.importFile.click());
    elements.importFile.addEventListener('change', importConversation);
    elements.backBtn.addEventListener('click', () => switchTab('conversation'));
});

// Conversation Functions
function selectOption(option, questionId) {
    const questionData = conversationTree[questionId];
    const selectedOption = questionData.options[option];
    
    // Display the response
    elements.response.textContent = selectedOption.response;
    elements.response.style.display = 'block';
    
    // Add to history
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
        <div><strong>Q: ${questionData.question}</strong></div>
        <div>A: ${option}</div>
        <div><em>${selectedOption.response}</em></div>
    `;
    elements.historyItems.appendChild(historyItem);
    
    // Clear options
    elements.options.innerHTML = '';
    
    // If there's a next question, display it after a short delay
    if (selectedOption.nextQuestionId) {
        setTimeout(() => {
            displayQuestion(selectedOption.nextQuestionId);
        }, 1000);
    } else {
        // End of conversation
        setTimeout(() => {
            elements.currentQuestion.textContent = "Thanks for chatting!";
            elements.response.style.display = 'none';
        }, 1000);
    }
}

function displayQuestion(questionId) {
    currentQuestionId = questionId;
    const questionData = conversationTree[questionId];
    
    // Update question text
    elements.currentQuestion.textContent = questionData.question;
    
    // Clear previous response
    elements.response.style.display = 'none';
    
    // Create option buttons
    elements.options.innerHTML = '';
    
    for (const [option, data] of Object.entries(questionData.options)) {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(option, questionId));
        elements.options.appendChild(button);
    }
}

function resetConversation() {
    // Clear history
    elements.historyItems.innerHTML = '';
    
    // Reset to first question
    displayQuestion(1);
}

// Editor Functions
function switchTab(tabName) {
    // Update tab classes
    elements.tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Show/hide sections
    elements.sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === `${tabName}-section`) {
            section.classList.add('active');
        }
    });
    
    // If switching to editor, populate the node list
    if (tabName === 'editor') {
        populateNodeList();
    } else if (tabName === 'conversation') {
        // If switching to conversation, reset it to ensure it's using the latest tree
        resetConversation();
    }
}

function populateNodeList() {
    elements.nodeList.innerHTML = '';
    
    for (const [id, node] of Object.entries(conversationTree)) {
        const nodeItem = document.createElement('div');
        nodeItem.className = 'node-item';
        if (selectedNodeId === id) {
            nodeItem.classList.add('selected');
        }
        nodeItem.textContent = `Node ${id}: ${node.question}`;
        nodeItem.addEventListener('click', () => selectNode(id));
        elements.nodeList.appendChild(nodeItem);
    }
}

function selectNode(nodeId) {
    selectedNodeId = nodeId;
    populateNodeList(); // Refresh list to show selection
    
    const node = conversationTree[nodeId];
    elements.nodeId.value = nodeId;
    elements.optionsContainer.innerHTML = '';
    
    for (const [optionText, optionData] of Object.entries(node.options)) {
        addOptionToForm(optionText, optionData.response, optionData.nextQuestionId);
    }
}

function addOptionToForm(optionText = '', response = '', nextQuestionId = '') {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option-editor';
    
    optionDiv.innerHTML = `
        <div class="form-group">
            <label>Option Text:</label>
            <input type="text" class="option-text" value="${optionText}" placeholder="Enter option text...">
        </div>
        
        <div class="form-group">
            <label>Response:</label>
            <textarea class="option-response" rows="3" placeholder="Enter response...">${response}</textarea>
        </div>
        
        <div class="form-group">
            <label>Next Question ID (leave empty for end of conversation):</label>
            <input type="text" class="next-question-id" value="${nextQuestionId || ''}" placeholder="Enter next question ID...">
        </div>
        
        <button class="btn remove-btn remove-option-btn">
            <i class="fas fa-trash"></i> Remove Option
        </button>
    `;
    
    // Add event listener to the remove button
    const removeBtn = optionDiv.querySelector('.remove-option-btn');
    removeBtn.addEventListener('click', () => optionDiv.remove());
    
    elements.optionsContainer.appendChild(optionDiv);
}

function addOption() {
    addOptionToForm();
}

function saveNodeChanges() {
    const nodeId = elements.nodeId.value;
    const question = elements.nodeQuestion.value;
    
    if (!nodeId || !question) {
        showNotification('Node ID and question are required!', 'error');
        return false;
    }
    
    const options = {};
    const optionElements = document.querySelectorAll('.option-editor');
    
    if (optionElements.length === 0) {
        showNotification('At least one option is required!', 'error');
        return false;
    }
    
    for (const optionElement of optionElements) {
        const optionText = optionElement.querySelector('.option-text').value;
        const response = optionElement.querySelector('.option-response').value;
        const nextQuestionId = optionElement.querySelector('.next-question-id').value;
        
        if (!optionText || !response) {
            showNotification('All options must have text and a response!', 'error');
            return false;
        }
        
        options[optionText] = {
            response: response,
            nextQuestionId: nextQuestionId ? nextQuestionId : null
        };
    }
    
    conversationTree[nodeId] = {
        question: question,
        options: options
    };
    
    return true;
}

function addNewNode() {
    // Find the next available node ID
    const nodeIds = Object.keys(conversationTree).map(id => parseInt(id));
    const nextId = nodeIds.length > 0 ? Math.max(...nodeIds) + 1 : 1;
    
    // Create a new empty node
    conversationTree[nextId] = {
        question: "New Question",
        options: {
            "Option 1": {
                response: "Response to Option 1",
                nextQuestionId: null
            }
        }
    };
    
    // Select the new node
    populateNodeList();
    selectNode(nextId.toString());
    
    // Show notification
    showNotification('New node created!', 'success');
}

function saveConversation() {
    if (selectedNodeId && !saveNodeChanges()) {
        return; // Don't proceed if there was an error saving the current node
    }
    
    showNotification('Conversation saved successfully!', 'success');
    populateNodeList();
}

function exportConversation() {
    if (selectedNodeId) {
        saveNodeChanges();
    }
    
    const conversationJSON = JSON.stringify(conversationTree, null, 2);
    const blob = new Blob([conversationJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'conversation.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Conversation exported successfully!', 'success');
}

function importConversation(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedTree = JSON.parse(e.target.result);
            conversationTree = importedTree;
            selectedNodeId = null;
            populateNodeList();
            showNotification('Conversation imported successfully!', 'success');
        } catch (error) {
            showNotification('Error importing conversation: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getIconForType(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getIconForType(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Add notification styles to the existing CSS
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        background-color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
        max-width: 350px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification i {
        font-size: 20px;
    }
    
    .notification.success {
        background-color: #d4edda;
        border-left: 4px solid var(--success-color);
    }
    
    .notification.success i {
        color: var(--success-color);
    }
    
    .notification.error {
        background-color: #f8d7da;
        border-left: 4px solid var(--danger-color);
    }
    
    .notification.error i {
        color: var(--danger-color);
    }
    
    .notification.warning {
        background-color: #fff3cd;
        border-left: 4px solid var(--warning-color);
    }
    
    .notification.warning i {
        color: var(--warning-color);
    }
    
    .notification.info {
        background-color: #d1ecf1;
        border-left: 4px solid var(--accent-color);
    }
    
    .notification.info i {
        color: var(--accent-color);
    }
`;

document.head.appendChild(style);

// Validate connections between nodes
function validateConversationTree() {
    const nodeIds = Object.keys(conversationTree);
    const reachableNodes = new Set(['1']); // Start with the first node
    const unreachableNodes = new Set();
    
    // Find all reachable nodes
    let newNodesFound = true;
    while (newNodesFound) {
        newNodesFound = false;
        
        for (const nodeId of reachableNodes) {
            const node = conversationTree[nodeId];
            if (!node) continue;
            
            for (const option of Object.values(node.options)) {
                if (option.nextQuestionId && !reachableNodes.has(option.nextQuestionId.toString())) {
                    reachableNodes.add(option.nextQuestionId.toString());
                    newNodesFound = true;
                }
            }
        }
    }
    
    // Find unreachable nodes
    for (const nodeId of nodeIds) {
        if (!reachableNodes.has(nodeId)) {
            unreachableNodes.add(nodeId);
        }
    }
    
    return {
        valid: unreachableNodes.size === 0,
        unreachableNodes: Array.from(unreachableNodes)
    };
}

// Add validation when saving
const originalSaveConversation = saveConversation;
saveConversation = function() {
    if (selectedNodeId && !saveNodeChanges()) {
        return;
    }
    
    const validation = validateConversationTree();
    if (!validation.valid) {
        const nodeList = validation.unreachableNodes.join(', ');
        showNotification(`Warning: Nodes ${nodeList} are unreachable!`, 'warning');
    }
    
    showNotification('Conversation saved successfully!', 'success');
    populateNodeList();
};
