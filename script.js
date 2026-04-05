document.addEventListener('DOMContentLoaded', () => {
    const qrInput = document.getElementById('qr-input');
    const generateBtn = document.getElementById('generate-btn');
    const resultContainer = document.getElementById('result-container');
    const qrCodeBox = document.getElementById('qr-code-box');
    const downloadBtn = document.getElementById('download-btn');
    const saveHistoryBtn = document.getElementById('save-history-btn');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    // Customization inputs
    const colorQr = document.getElementById('qr-color');
    const colorBg = document.getElementById('bg-color');
    const dotStyleSelect = document.getElementById('dot-style');
    const cornerStyleSelect = document.getElementById('corner-style');

    let currentQRText = '';
    
    // Initialize QR Code Styling instance
    const qrCode = new QRCodeStyling({
        width: 250,
        height: 250,
        type: "canvas",
        data: "https://example.com",
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 10
        },
        dotsOptions: {
            color: colorQr.value,
            type: dotStyleSelect.value
        },
        backgroundOptions: {
            color: colorBg.value,
        },
        cornersSquareOptions: {
            type: cornerStyleSelect.value
        }
    });

    // Initialize LocalStorage Data
    loadHistory();

    // Generate QR Code Function
    function generateQR() {
        const text = qrInput.value.trim();
        if (!text) {
            return false;
        }
        
        currentQRText = text;
        
        qrCode.update({
            data: text,
            dotsOptions: {
                color: colorQr.value,
                type: dotStyleSelect.value
            },
            backgroundOptions: {
                color: colorBg.value,
            },
            cornersSquareOptions: {
                type: cornerStyleSelect.value
            }
        });

        // Clear previous and append new
        qrCodeBox.innerHTML = '';
        qrCode.append(qrCodeBox);
        
        resultContainer.classList.remove('hidden');
        return true;
    }

    // Button Click
    generateBtn.addEventListener('click', () => {
        if (!generateQR()) {
            alert('Please enter a valid text or URL.');
        }
    });

    // Option to generate on 'Enter' key
    qrInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });

    // Auto-update when customization changes
    const configInputs = [colorQr, colorBg, dotStyleSelect, cornerStyleSelect];
    configInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (currentQRText) {
                generateQR();
            }
        });
        // For color pickers to preview live while dragging
        if (input.type === 'color') {
            input.addEventListener('input', () => {
                if (currentQRText) {
                    generateQR();
                }
            });
        }
    });

    // Download QR Code
    downloadBtn.addEventListener('click', () => {
        if (currentQRText) {
            qrCode.download({ name: `QR_${new Date().getTime()}`, extension: "png" });
        }
    });

    // Save to History (LocalStorage)
    saveHistoryBtn.addEventListener('click', () => {
        if (!currentQRText) return;
        saveToLocalStorage(currentQRText);
        loadHistory();
        
        // Visual feedback
        const originalText = saveHistoryBtn.innerHTML;
        saveHistoryBtn.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
        saveHistoryBtn.style.color = '#10b981';
        saveHistoryBtn.style.borderColor = '#10b981';
        
        setTimeout(() => {
            saveHistoryBtn.innerHTML = originalText;
            saveHistoryBtn.style.color = '';
            saveHistoryBtn.style.borderColor = '';
        }, 2000);
    });

    // Local Storage Functions
    function saveToLocalStorage(text) {
        let history = JSON.parse(localStorage.getItem('qrHistory') || '[]');
        
        // Simple logic to not add exact duplicate consecutively at the top
        if (history.length > 0 && history[0].text === text) return;

        const newItem = {
            id: new Date().getTime(),
            text: text,
            date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        };
        
        history.unshift(newItem); // add to top
        
        // Keep max 20 items
        if(history.length > 20) {
            history.pop();
        }
        
        localStorage.setItem('qrHistory', JSON.stringify(history));
    }

    function loadHistory() {
        const history = JSON.parse(localStorage.getItem('qrHistory') || '[]');
        historyList.innerHTML = '';

        if (history.length === 0) {
            historyList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 1rem 0;">No history yet. Generate and save some QR codes!</p>';
            return;
        }

        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-content">
                    <span class="history-text">${escapeHTML(item.text)}</span>
                    <span class="history-date">${item.date}</span>
                </div>
                <div class="history-actions">
                    <button class="icon-btn restore-btn" title="Generate this again"><i class="fa-solid fa-rotate-right"></i></button>
                    <button class="icon-btn delete-btn" title="Delete from history"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            // Restore/Regenerate item
            const restoreBtn = historyItem.querySelector('.restore-btn');
            restoreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                qrInput.value = item.text;
                generateBtn.click();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // Delete item
            const deleteBtn = historyItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteHistoryItem(item.id);
            });

            // Click entire item to regenerate
            historyItem.addEventListener('click', () => {
                qrInput.value = item.text;
                generateBtn.click();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            historyList.appendChild(historyItem);
        });
    }

    function deleteHistoryItem(id) {
        let history = JSON.parse(localStorage.getItem('qrHistory') || '[]');
        history = history.filter(item => item.id !== id);
        localStorage.setItem('qrHistory', JSON.stringify(history));
        loadHistory();
    }

    // Fast HTML escaping to prevent XSS in history rendering
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag])
        );
    }
});
