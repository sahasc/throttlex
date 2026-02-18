# ThrottleX - Premium Performance Community Platform

## 🚀 Pushing to Your Visual Studio Code

### Method 1: Download & Open in VS Code

1. **Download the project:**
   - In Emergent interface, click on your profile/menu
   - Select "Download Code" or "Export Project"
   - Save the ZIP file to your computer
   - Extract the ZIP file to a folder

2. **Open in VS Code:**
   ```bash
   # Navigate to the extracted folder
   cd path/to/throttlex
   
   # Open in VS Code
   code .
   ```

3. **Install dependencies:**
   ```bash
   # Install frontend dependencies
   cd frontend
   yarn install
   
   # Install backend dependencies (if needed)
   cd ../backend
   pip install -r requirements.txt
   ```

4. **Run locally:**
   ```bash
   # Frontend (from frontend folder)
   yarn start
   
   # Backend (from backend folder) - Optional, since we use localStorage
   uvicorn server:app --reload --port 8001
   ```

---

### Method 2: Git Clone (If pushed to GitHub)

1. **Initialize Git repository in Emergent:**
   ```bash
   git init
   git add .
   git commit -m "Initial ThrottleX build"
   ```

2. **Create GitHub repo and push:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/throttlex.git
   git branch -M main
   git push -u origin main
   ```

3. **Clone to your local machine:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/throttlex.git
   cd throttlex
   code .
   ```

---

### Method 3: Direct File Copy (Manual)

1. **Copy files from Emergent:**
   - Use Emergent's file explorer to browse `/app`
   - Download individual folders (frontend, backend)
   - Copy to your local directory

2. **Recreate structure locally:**
   ```
   throttlex/
   ├── frontend/
   │   ├── src/
   │   ├── public/
   │   ├── package.json
   │   └── ...
   └── backend/
       ├── server.py
       ├── requirements.txt
       └── ...
   ```

---

## 🔧 Important Configuration

### Environment Variables

**Frontend `.env`:**
```
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

**Backend `.env` (optional, since we use localStorage):**
```
MONGO_URL=your_mongo_connection_string
DB_NAME=throttlex
CORS_ORIGINS=http://localhost:3000
```

### Google Maps API Key
1. Go to: https://console.cloud.google.com/
2. Create a new project
3. Enable: Maps JavaScript API, Places API, Geocoding API
4. Create API key under "APIs & Services" > "Credentials"
5. Add to `frontend/.env`

---

## 🎨 Features Included

✅ **Demo Seed Data** - 3 users, 3 rides, 2 packs, 3 marketplace items loaded automatically
✅ **Image Upload** - Base64 image upload for rides, packs, and marketplace items
✅ **Leaderboard** - Top Creators, EV Champions, Most Active community members
✅ **Pack Scheduled Rides** - Upcoming pack rides displayed on pack detail pages
✅ **Seller Ratings** - Marketplace items show seller ratings
✅ **Google Maps Integration** - Location autocomplete and map display
✅ **Rating System** - 5-star rating for rides
✅ **Real-time Chat** - Pack member chat functionality
✅ **localStorage Database** - All data persists in browser localStorage

---

## 🏗️ Project Structure

```
throttlex/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navigation.js
│   │   │   ├── Hero.js
│   │   │   ├── RideCard.js
│   │   │   ├── PackCard.js
│   │   │   ├── MarketplaceCard.js
│   │   │   ├── ImageUpload.js
│   │   │   ├── PlaceAutocomplete.js
│   │   │   └── RideMap.js
│   │   ├── contexts/         # State management
│   │   │   ├── AuthContext.js
│   │   │   └── DataContext.js
│   │   ├── pages/            # All pages
│   │   │   ├── Auth.js
│   │   │   ├── Home.js
│   │   │   ├── Rides.js
│   │   │   ├── RideDetail.js
│   │   │   ├── Packs.js
│   │   │   ├── PackDetail.js
│   │   │   ├── Marketplace.js
│   │   │   ├── ItemDetail.js
│   │   │   ├── Sustainability.js
│   │   │   ├── Profile.js
│   │   │   └── Leaderboard.js
│   │   ├── utils/            # Helper functions
│   │   │   ├── localStorage.js
│   │   │   └── seedData.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── backend/                   # Optional (using localStorage)
    ├── server.py
    └── requirements.txt
```

---

## 🎨 Design System

- **Background**: #050505 (Deep Black)
- **Primary Red**: #E10600
- **Neon Green** (EV): #CCFF00
- **Typography**: Barlow Condensed (headings), Manrope (body)
- **Style**: Dark, cinematic, high-contrast, glassmorphism

---

## 🚦 Running the App

```bash
# Frontend only (since we use localStorage)
cd frontend
yarn install
yarn start

# Visit: http://localhost:3000
```

---

## 📝 Demo Credentials

**Demo Users (pre-seeded):**
- Email: rider1@throttlex.com | Password: demo123
- Email: rider2@throttlex.com | Password: demo123
- Email: rider3@throttlex.com | Password: demo123

Or create your own account!

---

## 🎯 Key Technologies

- React 19
- React Router v7
- TailwindCSS 3.4
- Framer Motion 12
- Google Maps API (@vis.gl/react-google-maps)
- localStorage for data persistence
- Context API for state management

---

## 🐛 Troubleshooting

**Issue: Map not loading**
- Check if Google Maps API key is added to `.env`
- Verify APIs are enabled in Google Cloud Console

**Issue: Demo data not showing**
- Clear localStorage: `localStorage.clear()`
- Refresh the page

**Issue: Images not uploading**
- Check file size (max 2MB)
- Ensure file is image type (JPG/PNG)

---

## 📞 Support

Built with Emergent AI - https://emergent.sh

For issues or questions, contact: support@emergent.sh

---

**Enjoy building with ThrottleX! 🏁**
