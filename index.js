const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle nested routes without .html extension
app.get('*', (req, res, next) => {
    // Skip if the request is for a static file
    if (req.path.includes('.')) {
        return next();
    }

    // Remove trailing slash if present
    const cleanPath = req.path.replace(/\/$/, '');
    
    // Try to serve the HTML file
    const filePath = path.join(__dirname, `${cleanPath}.html`);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            // If file doesn't exist, move to next handler
            next();
        }
    });
});

// Error handling for 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
