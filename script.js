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
    backBtn: document.getElementById('back-btn'),
    reportBtn: document.getElementById('report-btn'),
    treeView: document.getElementById('tree-view'),
    zoomInBtn: document.getElementById('zoom-in-btn'),
    zoomOutBtn: document.getElementById('zoom-out-btn'),
    resetZoomBtn: document.getElementById('reset-zoom-btn')
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
    elements.reportBtn.addEventListener('click', generateReport);
    elements.zoomInBtn.addEventListener('click', () => zoomTree(0.1));
    elements.zoomOutBtn.addEventListener('click', () => zoomTree(-0.1));
    elements.resetZoomBtn.addEventListener('click', resetTreeZoom);
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
    } else if (tabName === 'tree-view') {
        // If switching to tree view, render the tree
        renderConversationTree();
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
        
        // Create a container for the node text and delete button
        const nodeContent = document.createElement('div');
        nodeContent.className = 'node-item-content';
        
        // Add the node text
        const nodeText = document.createElement('span');
        nodeText.textContent = `Node ${id}: ${node.question}`;
        nodeText.className = 'node-text';
        nodeText.addEventListener('click', () => selectNode(id));
        
        // Add the delete button (except for node 1)
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn delete-node-btn';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.title = 'Delete node';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent node selection when clicking delete
            deleteNode(id);
        });
        
        // Hide delete button for node 1
        if (id === '1') {
            deleteButton.style.visibility = 'hidden';
        }
        
        // Assemble the node item
        nodeContent.appendChild(nodeText);
        nodeContent.appendChild(deleteButton);
        nodeItem.appendChild(nodeContent);
        
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

// Add a function to check for references to a node before deletion
function findReferencesToNode(nodeId) {
    const references = [];
    
    for (const [id, node] of Object.entries(conversationTree)) {
        for (const [option, data] of Object.entries(node.options)) {
            if (data.nextQuestionId === nodeId) {
                references.push({
                    nodeId: id,
                    option: option
                });
            }
        }
    }
    
    return references;
}

// Update the deleteNode function to handle references
function deleteNode(nodeId) {
    // Don't allow deleting the first node (root node)
    if (nodeId === '1') {
        showNotification("Cannot delete the root node (Node 1).", "error");
        return;
    }
    
    // Check for references to this node
    const references = findReferencesToNode(nodeId);
    if (references.length > 0) {
        const referenceList = references.map(ref => `Node ${ref.nodeId} (option: "${ref.option}")`).join(', ');
        const confirmMessage = `This node is referenced by: ${referenceList}.\n\nDeleting it will break these connections. Continue?`;
        
        if (!confirm(confirmMessage)) {
            return;
        }
    } else {
        // Standard confirmation
        if (!confirm(`Are you sure you want to delete Node ${nodeId}? This cannot be undone.`)) {
            return;
        }
    }
    
    // Delete the node
    delete conversationTree[nodeId];
    
    // Clear selection if the deleted node was selected
    if (selectedNodeId === nodeId) {
        selectedNodeId = null;
        elements.nodeId.value = '';
        elements.nodeQuestion.value = '';
        elements.optionsContainer.innerHTML = '';
    }
    
    // Update the node list
    populateNodeList();
    
    // Show notification
    showNotification(`Node ${nodeId} has been deleted.`, "success");
    
    // Validate the tree to check for broken connections
    const validation = validateConversationTree();
    if (!validation.valid) {
        const nodeList = validation.unreachableNodes.join(', ');
        showNotification(`Warning: Nodes ${nodeList} are now unreachable!`, 'warning');
    }
}

// Add this CSS to the style element in the script
style.textContent += `
    .node-item-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    
    .node-text {
        flex-grow: 1;
        cursor: pointer;
    }
    
    .delete-node-btn {
        padding: 4px 8px;
        background-color: transparent;
        color: var(--danger-color);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        opacity: 0.6;
        transition: opacity 0.2s, background-color 0.2s;
    }
    
    .delete-node-btn:hover {
        opacity: 1;
        background-color: rgba(239, 71, 111, 0.1);
    }
    
    .node-item:hover .delete-node-btn {
        opacity: 0.8;
    }
`;

function generateReport() {
    // Check if there's any conversation history
    if (elements.historyItems.children.length === 0) {
        showNotification('No conversation history to report!', 'warning');
        return;
    }
    
    // Create the report content
    const reportContent = formatConversationHistory();
    
    // Create modal for the report
    const modal = document.createElement('div');
    modal.className = 'report-modal';
    
    modal.innerHTML = `
        <div class="report-content">
            <div class="report-header">
                <h2><i class="fas fa-file-alt"></i> Conversation Report</h2>
                <button class="close-report">×</button>
            </div>
            <div class="report-body">${reportContent}</div>
            <div class="report-actions">
                <button class="btn export-btn" id="download-report-btn">
                    <i class="fas fa-download"></i> Download Report
                </button>
                <button class="btn back-btn close-report-btn">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        </div>
    `;
    
    // Add modal to the body
    document.body.appendChild(modal);
    
    // Show the modal with a slight delay for animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Add event listeners for the modal buttons
    const closeButtons = modal.querySelectorAll('.close-report, .close-report-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
    });
    
    // Add event listener for the download button
    const downloadBtn = modal.querySelector('#download-report-btn');
    downloadBtn.addEventListener('click', () => {
        downloadReport(reportContent);
    });
}

function formatConversationHistory() {
    let report = "CONVERSATION REPORT\n";
    report += "===================\n\n";
    report += `Date: ${new Date().toLocaleString()}\n\n`;
    report += "CONVERSATION FLOW:\n";
    report += "===================\n\n";
    
    // Get all history items
    const historyItems = elements.historyItems.children;
    
    for (let i = 0; i < historyItems.length; i++) {
        const item = historyItems[i];
        const question = item.querySelector('div:nth-child(1)').textContent;
        const answer = item.querySelector('div:nth-child(2)').textContent;
        const response = item.querySelector('div:nth-child(3)').textContent;
        
        report += `${i + 1}. ${question}\n`;
        report += `   ${answer}\n`;
        report += `   ${response}\n\n`;
    }
    
    report += "===================\n";
    report += "End of Conversation Report";
    
    return report;
}

function downloadReport(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-report-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Report downloaded successfully!', 'success');
}

// Add these variables for tree view at the top of your script
let treeScale = 1;
const treeNodeWidth = 220;
const treeNodeHeight = 130;
const treeHorizontalSpacing = 150; // Increased from 80
const treeVerticalSpacing = 150;   // Increased from 100

// Add these variables for drag functionality
let draggedNode = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let nodePositions = {}; // Store custom positions

// Make sure these elements are properly defined in your elements object
// Add these to your existing elements object
elements.treeView = document.getElementById('tree-view');
elements.zoomInBtn = document.getElementById('zoom-in-btn');
elements.zoomOutBtn = document.getElementById('zoom-out-btn');
elements.resetZoomBtn = document.getElementById('reset-zoom-btn');

// Add these event listeners in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // Your existing event listeners...
    
    // Add these new event listeners for tree view
    elements.zoomInBtn.addEventListener('click', () => zoomTree(0.1));
    elements.zoomOutBtn.addEventListener('click', () => zoomTree(-0.1));
    elements.resetZoomBtn.addEventListener('click', resetTreeZoom);
});

// Update your switchTab function to include the tree view rendering
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
    } else if (tabName === 'tree-view') {
        // If switching to tree view, render the tree
        renderConversationTree();
    }
}

// Modify the calculateTreeLayout function for better spacing
function calculateTreeLayout() {
    const layout = {};
    const queue = [{ id: '1', level: 0, position: 0 }];
    const levelNodes = {}; // Track nodes at each level
    
    // First pass: BFS to calculate relative positions
    while (queue.length > 0) {
        const current = queue.shift();
        const nodeId = current.id;
        const level = current.level;
        const position = current.position;
        
        // Initialize level arrays if not exists
        if (!levelNodes[level]) {
            levelNodes[level] = [];
        }
        
        // Store the position
        layout[nodeId] = {
            level: level,
            position: position
        };
        
        // Add this node to its level
        levelNodes[level].push({
            id: nodeId,
            position: position
        });
        
        // Get the node data
        const node = conversationTree[nodeId];
        if (!node) continue;
        
        // Count options that lead to another node
        let optionsWithNext = 0;
        for (const option of Object.values(node.options)) {
            if (option.nextQuestionId) {
                optionsWithNext++;
            }
        }
        
        // Add child nodes to the queue with more spacing
        let childPosition = position - (optionsWithNext - 1) * 1.2; // Increased spacing multiplier
        for (const [optionText, option] of Object.entries(node.options)) {
            if (option.nextQuestionId) {
                queue.push({
                    id: option.nextQuestionId.toString(),
                    level: level + 1,
                    position: childPosition,
                    parentId: nodeId,
                    optionText: optionText
                });
                
                // Store the connection info in the layout
                if (!layout[nodeId].connections) {
                    layout[nodeId].connections = [];
                }
                
                layout[nodeId].connections.push({
                    target: option.nextQuestionId.toString(),
                    optionText: optionText
                });
                
                childPosition += 2.4; // Increased spacing between siblings
            }
        }
    }
    
    // Second pass: Adjust positions to center each level
    const maxLevel = Math.max(...Object.keys(levelNodes).map(Number));
    
    for (let level = 0; level <= maxLevel; level++) {
        const nodesAtLevel = levelNodes[level];
        if (!nodesAtLevel || nodesAtLevel.length === 0) continue;
        
        // Find min and max positions at this level
        const positions = nodesAtLevel.map(n => n.position);
        const minPos = Math.min(...positions);
        const maxPos = Math.max(...positions);
        
        // Calculate center offset
        const centerOffset = (minPos + maxPos) / 2;
        
        // Adjust positions to center around zero
        for (const node of nodesAtLevel) {
            layout[node.id].position = node.position - centerOffset;
        }
    }
    
    // Third pass: Convert relative positions to absolute coordinates
    const treeViewWidth = elements.treeView.parentElement.clientWidth;
    const centerX = treeViewWidth / 2;
    
    for (const nodeId in layout) {
        const nodeLayout = layout[nodeId];
        const level = nodeLayout.level;
        const position = nodeLayout.position;
        
        // Calculate x and y coordinates
        let x = centerX + position * (treeNodeWidth + treeHorizontalSpacing);
        let y = level * (treeNodeHeight + treeVerticalSpacing) + 50; // Add top margin
        
        // Use custom position if available
        if (nodePositions[nodeId]) {
            x = nodePositions[nodeId].x;
            y = nodePositions[nodeId].y;
        }
        
        nodeLayout.x = x;
        nodeLayout.y = y;
    }
    
    return layout;
}

// Modify the renderConversationTree function to prepare the view
function renderConversationTree() {
    // Clear the tree view
    elements.treeView.innerHTML = '';
    
    // Reset zoom
    resetTreeZoom();
    
    // Set minimum size for the tree view to ensure it's scrollable
    const treeViewWrapper = elements.treeView.parentElement;
    elements.treeView.style.minWidth = treeViewWrapper.clientWidth + 'px';
    elements.treeView.style.minHeight = treeViewWrapper.clientHeight + 'px';
    
    // Calculate tree layout
    const treeLayout = calculateTreeLayout();
    
    // Determine the size needed for the tree
    let maxX = 0, maxY = 0;
    for (const nodeLayout of Object.values(treeLayout)) {
        maxX = Math.max(maxX, nodeLayout.x + treeNodeWidth + 100);
        maxY = Math.max(maxY, nodeLayout.y + treeNodeHeight + 100);
    }
    
    // Set the tree view size
    elements.treeView.style.width = Math.max(treeViewWrapper.clientWidth, maxX) + 'px';
    elements.treeView.style.height = Math.max(treeViewWrapper.clientHeight, maxY) + 'px';
    
    // Create connections first (so they appear behind nodes)
    createTreeConnections(treeLayout);
    
    // Create nodes
    createTreeNodes(treeLayout);
    
    // Set up drag handlers
    setupDragHandlers();
    
    // Center the view on the root node
    const rootLayout = treeLayout['1'];
    if (rootLayout) {
        treeViewWrapper.scrollLeft = rootLayout.x - treeViewWrapper.clientWidth / 2 + treeNodeWidth / 2;
        treeViewWrapper.scrollTop = 0; // Start at the top
    }
}

function createTreeNodes(layout) {
    for (const [nodeId, nodeLayout] of Object.entries(layout)) {
        const node = conversationTree[nodeId];
        if (!node) continue;
        
        // Create node element
        const nodeElement = document.createElement('div');
        nodeElement.className = 'tree-node';
        
        // Check if it's an end node (no next questions)
        let isEndNode = true;
        for (const option of Object.values(node.options)) {
            if (option.nextQuestionId) {
                isEndNode = false;
                break;
            }
        }
        
        if (isEndNode) {
            nodeElement.classList.add('end-node');
        }
        
        // Set position
        nodeElement.style.left = `${nodeLayout.x}px`;
        nodeElement.style.top = `${nodeLayout.y}px`;
        
        // Add content
        nodeElement.innerHTML = `
            <div class="tree-node-id">Node ${nodeId}</div>
            <div class="tree-node-question">${node.question}</div>
            <div class="tree-node-options">
                ${Object.keys(node.options).length} option${Object.keys(node.options).length !== 1 ? 's' : ''}
            </div>
            <div class="tree-node-handle"><i class="fas fa-arrows-alt"></i></div>
        `;
        
        // Add click event to highlight connections
        nodeElement.addEventListener('click', (e) => {
            // Don't trigger if we're dragging
            if (draggedNode) return;
            
            // Remove highlight from all nodes and connections
            document.querySelectorAll('.tree-node.highlight').forEach(el => {
                el.classList.remove('highlight');
            });
            document.querySelectorAll('.tree-connection.highlight').forEach(el => {
                el.classList.remove('highlight');
            });
            document.querySelectorAll('.tree-option-label.highlight').forEach(el => {
                el.classList.remove('highlight');
            });
            
            // Highlight this node
            nodeElement.classList.add('highlight');
            
            // Highlight connections from this node
            if (nodeLayout.connections) {
                for (const connection of nodeLayout.connections) {
                    const connectionEl = document.getElementById(`connection-${nodeId}-${connection.target}`);
                    if (connectionEl) {
                        connectionEl.classList.add('highlight');
                    }
                    
                    const labelEl = document.getElementById(`label-${nodeId}-${connection.target}`);
                    if (labelEl) {
                        labelEl.classList.add('highlight');
                    }
                    
                    // Highlight target node
                    const targetNodeEl = document.querySelector(`.tree-node[data-id="${connection.target}"]`);
                    if (targetNodeEl) {
                        targetNodeEl.classList.add('highlight');
                    }
                }
            }
        });
        
        // Add drag functionality
        const handle = nodeElement.querySelector('.tree-node-handle');
        handle.addEventListener('mousedown', (e) => {
            e.stopPropagation(); // Prevent node selection when starting drag
            e.preventDefault(); // Prevent text selection during drag
            
            draggedNode = nodeElement;
            
            // Calculate offset relative to the node, not the handle
            const nodeRect = nodeElement.getBoundingClientRect();
            dragOffsetX = e.clientX - nodeRect.left;
            dragOffsetY = e.clientY - nodeRect.top;
            
            nodeElement.classList.add('dragging');
        });
        
        // Set data attribute for node ID
        nodeElement.setAttribute('data-id', nodeId);
        nodeElement.setAttribute('data-question', node.question);
        
        // Add to tree view
        elements.treeView.appendChild(nodeElement);
    }
}

function createTreeConnections(layout) {
    for (const [nodeId, nodeLayout] of Object.entries(layout)) {
        if (!nodeLayout.connections) continue;
        
        for (const connection of nodeLayout.connections) {
            const targetLayout = layout[connection.target];
            if (!targetLayout) continue;
            
            // Calculate start and end points
            const startX = nodeLayout.x + treeNodeWidth / 2;
            const startY = nodeLayout.y + treeNodeHeight;
            const endX = targetLayout.x + treeNodeWidth / 2;
            const endY = targetLayout.y;
            
            // Calculate length and angle
            const dx = endX - startX;
            const dy = endY - startY;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            
            // Create connection element
            const connectionElement = document.createElement('div');
            connectionElement.className = 'tree-connection';
            connectionElement.id = `connection-${nodeId}-${connection.target}`;
            
            // Set position and dimensions
            connectionElement.style.width = `${length}px`;
            connectionElement.style.left = `${startX}px`;
            connectionElement.style.top = `${startY}px`;
            connectionElement.style.transform = `rotate(${angle}deg)`;
            
            // Create option label
            const labelElement = document.createElement('div');
            labelElement.className = 'tree-option-label';
            labelElement.id = `label-${nodeId}-${connection.target}`;
            labelElement.textContent = connection.optionText;
            
            // Position the label at the middle of the connection
            const labelX = startX + dx / 2;
            const labelY = startY + dy / 2;
            labelElement.style.left = `${labelX}px`;
            labelElement.style.top = `${labelY}px`;
            
            // Add to tree view
            elements.treeView.appendChild(connectionElement);
            elements.treeView.appendChild(labelElement);
        }
    }
}

function zoomTree(delta) {
    treeScale = Math.max(0.3, Math.min(2, treeScale + delta));
    elements.treeView.style.transform = `scale(${treeScale})`;
}

function resetTreeZoom() {
    treeScale = 1;
    elements.treeView.style.transform = `scale(${treeScale})`;
}

// Add these styles for the tree view
style.textContent += `
    .tree-node.highlight {
        border-color: var(--warning-color);
        box-shadow: 0 0 0 3px rgba(251, 133, 0, 0.3);
    }
    
    .tree-connection.highlight {
        background-color: var(--warning-color);
        z-index: 1;
    }
    
    .tree-connection.highlight::after {
        border-left-color: var(--warning-color);
    }
    
    .tree-option-label.highlight {
        background-color: var(--warning-color);
        color: white;
    }
`;

// Add mouse move and mouse up handlers for dragging
function setupDragHandlers() {
    elements.treeView.addEventListener('mousemove', (e) => {
        if (!draggedNode) return;
        
        const treeRect = elements.treeView.getBoundingClientRect();
        const treeViewWrapper = elements.treeView.parentElement;
        
        // Calculate position within the tree view, accounting for scrolling
        const x = e.clientX - treeRect.left + treeViewWrapper.scrollLeft - dragOffsetX;
        const y = e.clientY - treeRect.top + treeViewWrapper.scrollTop - dragOffsetY;
        
        draggedNode.style.left = `${x}px`;
        draggedNode.style.top = `${y}px`;
        
        // Update connections
        const nodeId = draggedNode.getAttribute('data-id');
        updateConnections(nodeId, x, y);
    });
    
    elements.treeView.addEventListener('mouseup', () => {
        if (!draggedNode) return;
        
        // Save the new position
        const nodeId = draggedNode.getAttribute('data-id');
        const x = parseInt(draggedNode.style.left);
        const y = parseInt(draggedNode.style.top);
        
        nodePositions[nodeId] = { x, y };
        
        draggedNode.classList.remove('dragging');
        draggedNode = null;
    });
    
    // Also handle mouse leaving the tree view
    elements.treeView.parentElement.addEventListener('mouseleave', () => {
        if (draggedNode) {
            draggedNode.classList.remove('dragging');
            draggedNode = null;
        }
    });
}

// Update connections when a node is moved
function updateConnections(nodeId, x, y) {
    // Update connections where this node is the source
    const outgoingConnections = document.querySelectorAll(`[id^="connection-${nodeId}-"]`);
    const outgoingLabels = document.querySelectorAll(`[id^="label-${nodeId}-"]`);
    
    outgoingConnections.forEach(conn => {
        const targetId = conn.id.split('-')[2];
        const targetNode = document.querySelector(`.tree-node[data-id="${targetId}"]`);
        
        if (targetNode) {
            const targetRect = targetNode.getBoundingClientRect();
            const treeRect = elements.treeView.getBoundingClientRect();
            
            const startX = x + treeNodeWidth / 2;
            const startY = y + treeNodeHeight;
            const endX = parseInt(targetNode.style.left) + treeNodeWidth / 2;
            const endY = parseInt(targetNode.style.top);
            
            const dx = endX - startX;
            const dy = endY - startY;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            
            conn.style.width = `${length}px`;
            conn.style.left = `${startX}px`;
            conn.style.top = `${startY}px`;
            conn.style.transform = `rotate(${angle}deg)`;
            
            // Update label position
            const labelIndex = Array.from(outgoingConnections).indexOf(conn);
            if (labelIndex >= 0 && outgoingLabels[labelIndex]) {
                const label = outgoingLabels[labelIndex];
                label.style.left = `${startX + dx / 2}px`;
                label.style.top = `${startY + dy / 2}px`;
            }
        }
    });
    
    // Update connections where this node is the target
    for (const otherNodeId in conversationTree) {
        if (otherNodeId === nodeId) continue;
        
        const conn = document.getElementById(`connection-${otherNodeId}-${nodeId}`);
        const label = document.getElementById(`label-${otherNodeId}-${nodeId}`);
        
        if (conn) {
            const sourceNode = document.querySelector(`.tree-node[data-id="${otherNodeId}"]`);
            
            if (sourceNode) {
                const startX = parseInt(sourceNode.style.left) + treeNodeWidth / 2;
                const startY = parseInt(sourceNode.style.top) + treeNodeHeight;
                const endX = x + treeNodeWidth / 2;
                const endY = y;
                
                const dx = endX - startX;
                const dy = endY - startY;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                
                conn.style.width = `${length}px`;
                conn.style.left = `${startX}px`;
                conn.style.top = `${startY}px`;
                conn.style.transform = `rotate(${angle}deg)`;
                
                // Update label position
                if (label) {
                    label.style.left = `${startX + dx / 2}px`;
                    label.style.top = `${startY + dy / 2}px`;
                }
            }
        }
    }
}

// Add a reset layout button function
function resetTreeLayout() {
    nodePositions = {}; // Clear custom positions
    renderConversationTree(); // Re-render the tree
}
