# 🌍 WanderLust – A Travel Companion

A full-stack travel companion application designed to help users plan, share, and manage their trips with ease. Built with **Node.js, Express, MongoDB, and EJS**, it provides authentication, trip management, and cloud-based media storage.  

---

## ✨ Features  

- 🔑 User authentication & session management  
- 🏞️ Upload and manage travel experiences (with Cloudinary integration)  
- 📌 Interactive UI with EJS templating  
- 🗂️ Organized MVC project structure (Controllers, Models, Views, Routes)  
- ☁️ Cloud storage support for images and files  
- 📊 MongoDB database for storing user and travel data  

---

## 🚀 Installation & Setup  

1. **Clone the repository**  

```bash
git clone https://github.com/bhanukiran-1511/WanderLust-A-travel-companion.git
cd WanderLust-A-travel-companion
```

2. **Install dependencies**  

```bash
npm install
```

3. **Set up environment variables**  

Create a `.env` file in the root directory and add the following:  

```env
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_URL=your_cloudinary_url   # (if using Cloudinary)
SESSION_SECRET=your_secret_key
```

4. **Start the development server**  

```bash
npm start
```

5. **Visit the app**  
👉 [http://localhost:3000](http://localhost:3000)  

---

## 📂 Project Structure  

```
.
├── app.js
├── cloudConfig.js
├── controllers/
├── models/
├── routes/
├── views/
├── public/css/
├── utils/
├── schema.js
├── middleware.js
└── README.md
```

---

## 🛠️ Tech Stack  

- **Backend**: Node.js, Express.js  
- **Frontend**: EJS, CSS  
- **Database**: MongoDB  
- **Cloud Services**: Cloudinary (for media uploads)  
- **Authentication**: Express-session  

---

## 🤝 Contributing  

Contributions, issues, and feature requests are welcome!  
Feel free to fork this repo and submit a pull request.  

---

## 📜 License  

This project is licensed under the **MIT License**.  
