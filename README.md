# 🌍 WanderLust – Your Travel Companion  

WanderLust is a **full-stack travel companion app** that helps users plan, share, and manage their trips effortlessly. From storing your travel experiences to organizing itineraries, WanderLust brings everything together with a clean UI and cloud-powered media storage.  

🔗 **Live Demo**: [WanderLust on Render](https://wanderlust-a-travel-companion-1.onrender.com/listings)  
📂 **GitHub Repository**: [View Repo](https://github.com/bhanukiran-1511/WanderLust-A-travel-companion.git)  

---

## ✨ Features  

- 🔑 **Authentication & Sessions** – Secure login and session handling  
- 🏞️ **Travel Posts** – Upload, view, and manage travel experiences  
- ☁️ **Cloud Integration** – Cloudinary support for media uploads  
- 📊 **Database Management** – MongoDB to store user & trip data  
- 🎨 **Dynamic UI** – Built with **EJS templating** and custom CSS  
- 🗂️ **Scalable Structure** – MVC-based project organization  

---

## 🚀 Getting Started  

### 1. Clone the Repository  

```bash
git clone https://github.com/bhanukiran-1511/WanderLust-A-travel-companion.git
cd WanderLust-A-travel-companion
```

### 2. Install Dependencies  

```bash
npm install
```

### 3. Configure Environment Variables  

Create a `.env` file in the root directory and add:  

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

ATLAS_DB_URL=your_mongodb_connection_string

SECRET=your_session_secret
```

⚠️ **Important:** Do not share your real credentials publicly. Keep them safe in your `.env` file.  

### 4. Start the Development Server  

```bash
node app.js
```

👉 The app will be running at: [http://localhost:3000](http://localhost:3000)  

---

## 📂 Project Structure  

```
.
├── app.js
├── cloudConfig.js
├── controllers/       # Route logic
├── models/            # MongoDB models
├── routes/            # Express routes
├── views/             # EJS templates
├── public/css/        # Stylesheets
├── utils/             # Utility functions
├── schema.js          # Validation schema
├── middleware.js      # Custom middleware
└── README.md
```

---

## 🛠️ Tech Stack  

- **Backend**: Node.js, Express.js  
- **Frontend**: EJS, CSS  
- **Database**: MongoDB Atlas  
- **Cloud Storage**: Cloudinary  
- **Authentication**: express-session  

---

## 🤝 Contributing  

Contributions are welcome! 🎉  
If you’d like to improve WanderLust, fork the repo and open a pull request.  

---

⭐ If you find this project helpful, don’t forget to give it a **star** on GitHub!  
