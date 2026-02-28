# 📦 InvenAI - AI-Powered Inventory Dashboard

**KitaHack 2026 Submission**

InvenAI is a smart SaaS inventory management dashboard designed to optimize stock levels, prevent shortages, and streamline supply chain tracking. 

🌍 **SDG Alignment:** This project addresses **SDG 12: Responsible Consumption and Production** by utilizing AI to predict stock needs, thereby reducing overstocking and minimizing product waste.

---

## ✨ Key Features & Technology

* **🤖 Smart Stock Prediction (Google Gemini):** Analyzes current inventory levels and thresholds to predict potential shortages and suggest optimal reorder times.
* **🏷️ Auto-Categorization (Google Gemini):** Automatically assigns logical categories to newly added items based on their names.
* **☁️ Secondary Google Technology:** Utilizes [Insert your secondary tech here, e.g., Firebase Authentication / Google Cloud Platform] to [Insert brief reason here, e.g., ensure secure user access].
* **📊 Real-Time Dashboard:** Visualizes inventory health, low-stock alerts, and recent activities at a glance.

---

## 🛠️ Tech Stack

* **Frontend:** React / Next.js
* **Backend:** Node.js, Express
* **AI Integration:** Google Gemini API
* **Secondary Google Tech:** [Insert Firebase / GCP / etc.]
* **Database:** MongoDB / PostgreSQL

---

## 🚀 Setup & Installation

Follow these steps to run InvenAI locally for evaluation.

### 1. Prerequisites
* Node.js (v18.0.0 or higher)
* npm or yarn

### 2. Clone the Repository

    git clone https://github.com/Homura-Am/InvenAI.git
    cd InvenAI

### 3. Environment Variables
Create a `.env` file in the root directory and add your credentials. 
*Note: Do not commit your actual `.env` file to version control.*

    PORT=5000
    DATABASE_URL=your_database_url_here
    GEMINI_API_KEY=your_google_gemini_api_key_here

### 4. Running the Application

**Start the Backend Server:**
Open a terminal and run:

    cd server
    npm install
    npm start

**Start the Frontend Client:**
Open a second terminal window and run:

    cd client
    npm install
    npm run dev


The application will be available at `http://localhost:3000` (or your configured port).

---

## 📖 How to Use the App

1. **Dashboard Overview:** Upon launching, view the high-level metrics (Total Stock, Low Stock Alerts) to gauge inventory health.
2. **Add Inventory:** Navigate to the **Inventory** tab. Click **Add Item**, input the product details, and save. 
3. **Auto-Categorize:** When adding a new item, leave the category blank and click **Auto-Categorize** to let Gemini instantly assign the correct tag.
4. **AI Analytics:** Navigate to the **AI Analytics** tab and click **Generate Insights**. Gemini will process the data and provide clear reports on stock risks and reorder suggestions.
