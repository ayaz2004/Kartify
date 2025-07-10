# Family Retail Predictor

A full-stack, modular, family-centric retail shopping application with clean separation between backend and frontend.

## 🏗️ Project Structure

```
kartify/
├── backend/                 # Backend API (Express + MongoDB)
│   ├── config/
│   │   └── database.js     # Database connection
│   ├── models/             # Mongoose models
│   │   ├── User.js
│   │   ├── Family.js
│   │   ├── Product.js
│   │   ├── ShoppingList.js
│   │   ├── ListItem.js
│   │   ├── PurchaseHistory.js
│   │   └── Inventory.js
│   ├── routes/             # Express routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── families.js
│   │   ├── products.js
│   │   ├── shoppingLists.js
│   │   ├── purchaseHistory.js
│   │   └── inventory.js
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   └── server.js           # Express server entry point
├── frontend/               # Frontend app (React + Vite)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main App component
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── .env        # Frontend environment variables
├── package.json            # Backend dependencies (ROOT)
├── .env            # Backend environment variables
└── README.md
```


### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (local or cloud)


## 🛠️ Tech Stack

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Security**: Helmet, CORS, Rate Limiting
- **Development**: Nodemon

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, Walmart-inspired green theme
- **Animations**: Smooth transitions with Framer Motion
- **Accessibility**: Built with accessibility in mind

## 📋 Features

- **Authentication**: User registration and login
- **Family Management**: Create and manage family groups
- **Product Catalog**: Browse and search products
- **Shopping Lists**: Create and share family shopping lists
- **Inventory Tracking**: Track household inventory
- **Purchase History**: View past purchases
- **Responsive Dashboard**: Family-centric dashboard
