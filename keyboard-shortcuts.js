// Keyboard navigation and shortcuts for the conversation app
const keyboardShortcuts = {
    // Global shortcuts
    global: [
        { key: '?', description: 'Show/hide keyboard shortcuts' },
        { key: 'Esc', description: 'Close popups or cancel current action' },
        { key: 'Tab', description: 'Navigate between interactive elements' },
        { key: 'Enter/Space', description: 'Select or activate focused element' }
    ],
    
    // Conversation tab shortcuts
    conversation: [
        { key: '1-9', description: 'Select conversation option 1-9' },
        { key: 'C', description: 'Continue to next question (when available)' },
        { key: 'R', description: 'Reset conversation' }
    ],
    
    // Editor tab shortcuts
    editor: [
        { key: 'N', description: 'Add new node' },
        { key: 'O', description: 'Add new option to current node' },
        { key: 'S', description: 'Save changes' },
        { key: 'E', description: 'Export conversation' },
        { key: 'I', description: 'Import conversation' },
        { key: 'B', description: 'Back to conversation' }
    ],
    
    // Tree view shortcuts
    treeView: [
        { key: '+', description: 'Zoom in' },
        { key: '-', description: 'Zoom out' },
        { key: '0', description: 'Reset zoom' },
        { key: 'Arrow keys', description: 'Pan the tree view' }
    ],
    
    // Tab navigation
    tabs: [
        { key: 'Alt+1', description: 'Switch to Conversation tab' },
        { key: 'Alt+2', description: 'Switch to Editor tab' },
        { key: 'Alt+3', description: 'Switch to Tree View tab' }
    ]
};

// Function to create and show the shortcuts info popup
function showShortcutsInfo() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('shortcuts-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'shortcuts-modal';
        modal.className = 'modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content shortcuts-content';
        
        // Create header
        const header = document.createElement('div');
        header.className = 'modal-header';
        header.innerHTML = `
            <h2><i class="fas fa-keyboard"></i> Keyboard Shortcuts</h2>
            <button class="close-modal" aria-label="Close shortcuts popup">×</button>
        `;
        
        // Create body with shortcuts sections
        const body = document.createElement('div');
        body.className = 'modal-body';
        
        // Add each section of shortcuts
        for (const [section, shortcuts] of Object.entries(keyboardShortcuts)) {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'shortcuts-section';
            
            // Format section title (capitalize first letter, replace camelCase with spaces)
            const sectionTitle = section.charAt(0).toUpperCase() + 
                section.slice(1).replace(/([A-Z])/g, ' $1');
            
            sectionEl.innerHTML = `<h3>${sectionTitle}</h3>`;
            
            // Create table for shortcuts
            const table = document.createElement('table');
            table.className = 'shortcuts-table';
            
            // Add each shortcut to the table
            shortcuts.forEach(shortcut => {
                const row = document.createElement('tr');
                
                const keyCell = document.createElement('td');
                keyCell.className = 'key-cell';
                keyCell.innerHTML = `<kbd>${shortcut.key}</kbd>`;
                
                const descCell = document.createElement('td');
                descCell.textContent = shortcut.description;
                
                row.appendChild(keyCell);
                row.appendChild(descCell);
                table.appendChild(row);
            });
            
            sectionEl.appendChild(table);
            body.appendChild(sectionEl);
        }
        
        // Assemble modal
        modalContent.appendChild(header);
        modalContent.appendChild(body);
        modal.appendChild(modalContent);
        
        // Add to document
        document.body.appendChild(modal);
        
        // Add event listener to close button
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
            }
        });
        
        // Close when clicking outside the modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    // Show the modal
    modal.classList.add('show');
}

// Function to initialize keyboard shortcuts
function initKeyboardShortcuts() {
    // Global keyboard listener
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Show shortcuts info when pressing ?
        if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
            e.preventDefault();
            showShortcutsInfo();
            return;
        }
        
        // Get active tab
        const activeTab = document.querySelector('.tab.active').getAttribute('data-tab');
        
        // Tab switching shortcuts
        if (e.altKey) {
            if (e.key === '1') {
                e.preventDefault();
                switchTab('conversation');
            } else if (e.key === '2') {
                e.preventDefault();
                switchTab('editor');
            } else if (e.key === '3') {
                e.preventDefault();
                switchTab('tree-view');
            }
            return;
        }
        
        // Conversation tab shortcuts
        if (activeTab === 'conversation') {
            // Number keys for selecting options
            if (/^[1-9]$/.test(e.key)) {
                const optionIndex = parseInt(e.key) - 1;
                const optionButtons = elements.options.querySelectorAll('.option-btn');
                
                if (optionButtons[optionIndex]) {
                    e.preventDefault();
                    optionButtons[optionIndex].click();
                }
            }
            
            // 'C' for continue
            if (e.key === 'c' || e.key === 'C') {
                const continueBtn = elements.response.querySelector('.continue-btn');
                if (continueBtn) {
                    e.preventDefault();
                    continueBtn.click();
                }
            }
            
            // 'R' for reset
            if (e.key === 'r' || e.key === 'R') {
                e.preventDefault();
                resetConversation();
            }
        }
        
        // Editor tab shortcuts
        else if (activeTab === 'editor') {
            // 'N' for new node
            if (e.key === 'n' || e.key === 'N') {
                e.preventDefault();
                addNewNode();
            }
            
            // 'O' for add option
            if (e.key === 'o' || e.key === 'O') {
                e.preventDefault();
                addOption();
            }
            
            // 'S' for save
            if (e.key === 's' || e.key === 'S') {
                e.preventDefault();
                saveConversation();
            }
            
            // 'E' for export
            if (e.key === 'e' || e.key === 'E') {
                e.preventDefault();
                exportConversation();
            }
            
            // 'I' for import
            if (e.key === 'i' || e.key === 'I') {
                e.preventDefault();
                elements.importFile.click();
            }
            
            // 'B' for back to conversation
            if (e.key === 'b' || e.key === 'B') {
                e.preventDefault();
                switchTab('conversation');
            }
        }
        
        // Tree view shortcuts
        else if (activeTab === 'tree-view') {
            // '+' for zoom in
            if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                zoomTree(0.1);
            }
            
            // '-' for zoom out
            if (e.key === '-' || e.key === '_') {
                e.preventDefault();
                zoomTree(-0.1);
            }
            
            // '0' for reset zoom
            if (e.key === '0') {
                e.preventDefault();
                resetTreeZoom();
            }
            
            // Arrow keys for panning
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                const treeViewWrapper = elements.treeView.parentElement;
                const panAmount = 50; // pixels to pan per keypress
                
                switch (e.key) {
                    case 'ArrowUp':
                        treeViewWrapper.scrollTop -= panAmount;
                        break;
                    case 'ArrowDown':
                        treeViewWrapper.scrollTop += panAmount;
                        break;
                    case 'ArrowLeft':
                        treeViewWrapper.scrollLeft -= panAmount;
                        break;
                    case 'ArrowRight':
                        treeViewWrapper.scrollLeft += panAmount;
                        break;
                }
            }
        }
    });
    
    // Add info button to the header
    const header = document.querySelector('header');
    if (header) {
        const infoBtn = document.createElement('button');
        infoBtn.className = 'btn info-btn';
        infoBtn.innerHTML = '<i class="fas fa-keyboard"></i>';
        infoBtn.title = 'Keyboard Shortcuts (?)';
        infoBtn.addEventListener('click', showShortcutsInfo);
        header.appendChild(infoBtn);
    }
}