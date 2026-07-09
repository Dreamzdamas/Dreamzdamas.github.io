const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup sessions for authentication state
app.use(session({
    secret: 'dreamz-secret-key', // In real production, use a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS directly
}));

// Serve static assets like images, css, and js (except html files directly if we want to protect them)
app.use(express.static(path.join(__dirname), { index: false }));

// Backend Route: Display the Entry / Login form (Frontend)
app.get('/', (req, res) => {
    if (req.session.isAuthenticated) {
        return res.redirect('/portfolio');
    }
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Backend Route: Handle Login POST Request
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Hardcoded credentials for demonstration what the backend needs
    if (username === 'admin' && password === 'dreamz123') {
        req.session.isAuthenticated = true;
        return res.json({ success: true, redirect: '/portfolio' });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Backend Middleware: Protect routes
function requireAuth(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
}

// Protected Route: The Main Website
app.get('/portfolio', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Protect other sensitive HTML pages
app.get('/:page.html', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, `${req.params.page}.html`));
});

// Handle Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
    console.log('Frontend login gate served at the root URL.');
});
