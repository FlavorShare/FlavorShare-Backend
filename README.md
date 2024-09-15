# **FlavorShare-Backend - Node.js/Express**

This is the backend for the **FlavorShare** iOS app, built using **Node.js**, **Express**, and **MongoDB** for managing text-based data. The database is currently configured to run locally but can be modified as needed.

---

## **Features**

- RESTful API for managing user and recipe data
- MongoDB database for storing app data

---

## **Prerequisites**

1. **Node.js** (v16.x or higher recommended)
2. **MongoDB** (Local setup for now)
3. **npm** (Node Package Manager)

---

## **Installation**

### **1. Clone the repository**

```bash
gh repo clone FlavorShare/FlavorShare-Backend
cd Flavorshare-Backend
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Configure the database**

Navigate to the `src/config/database.ts` file and update the `dbUri`:

```ts
let dbUri = "mongodb://localhost:27017/flavorshare";
```

Replace `"mongodb://localhost:27017/flavorshare"` with your desired MongoDB connection string if needed.

---

## **Running the Backend**

1. Ensure **MongoDB** is running on your local machine. You can start MongoDB locally by running:

```bash
mongosh
```

2. Start the Node.js server:

```bash
npm run dev
```

By default, the server will run on `http://localhost:3000`.

---

## **Contributing**

Feel free to open issues or submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
