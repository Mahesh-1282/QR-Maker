# 🚀 Premium QR Code Maker

A modern, fast, and secure frontend-only web application designed to generate fully customizable static QR codes instantly. Built with pure **HTML, CSS, and JavaScript**, this tool requires no backend database and is hosted completely for free via GitHub Pages.

## ✨ Features

- **No Backend Included / 100% Privacy:** Everything happens directly in the browser. Zero data is sent to a server. 
- **Real-Time Customization:** Change the QR code and background colors seamlessly via the intuitive color pickers.
- **Sleek Designs:** Forget the boring square dots! Supports modern aesthetics like **Rounded**, **Extra Rounded**, **Dots**, and **Classy** styles. 
- **Local Storage History:** Never lose an important QR code. Every generated URL is automatically saved into your browser's private `LocalStorage`.
- **Instant Download with Metadata:** Downloads high-quality `.png` files of the generated QR codes alongside detailed specifications mapping your customizations.

## 🛠 Tech Stack

- **HTML5:** Semantic structuring.
- **CSS3 (Custom Properties & Animations):** Featuring a beautiful Dark Mode + Glassmorphism aesthetic.
- **Vanilla JavaScript:** Fast, dependency-free core logic.
- **[qr-code-styling](https://qr-code-styling.com/):** A powerful library for rendering advanced QR Canvas elements on the client side.

## 🚀 Live Demo

[Click here to view the Live Application](https://Mahesh-1282.github.io/QR-Maker)  
*(Since you deployed via GitHub Pages, this URL will typically be active within a few minutes after enabling it in Repo Settings)*

## 📂 Quick Start (Local Setup)

Want to run this on your own machine? It's plug-and-play!

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mahesh-1282/QR-Maker.git
   ```
2. **Navigate into the directory:**
   ```bash
   cd QR-Maker
   ```
3. **Run normally:** Simply double-click `index.html` to open it in any web browser.
4. **Use a Local Server (Optional for best experience):**
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`

## 🎨 Modifying & Contributing

If you want to add new styles or functionality:
- `script.js` handles the real-time preview updating and LocalStorage tracking.
- Adjust `styles.css` if you want to tweak the gradient backgrounds or glassmophic effects.

## 📝 License

This project is open-source and free to use!
