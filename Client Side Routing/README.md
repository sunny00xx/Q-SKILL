# Hotel Management System (Client-Side Routing)

A modern, responsive Single Page Application (SPA) built with **React** and **Vite**, demonstrating advanced client-side routing and state management techniques.

## 🚀 Project Overview

This project implements a comprehensive Hotel Management Dashboard that allows administrators to manage rooms, bookings, and view real-time statistics. It showcases the power of **Client-Side Routing** to create a seamless, app-like experience without page reloads.

### Key Features

*   **⚡ Zero-Reload Navigation**: Using **React Router DOM v6**, the app transitions instantly between pages (Dashboard, Rooms, Bookings).
*   **📊 Dynamic Dashboard**: Real-time overview of occupancy, revenue, and recent booking activities.
*   **📝 CRUD Operations**: Full capability to **Add**, **Edit**, **Delete**, and **View** bookings.
*   **💾 Data Persistence**: Uses `localStorage` to save all booking data, ensuring it survives browser refreshes and sessions.
*   **🔍 Search & Filter**: Real-time search functionality with keyword highlighting for finding guest bookings.
*   **🎨 Glassmorphism UI**: A premium, modern interface designed with **Tailwind CSS**.

## 🛠️ Tech Stack

*   **Frontend Library**: React (v18+)
*   **Build Tool**: Vite
*   **Routing**: React Router DOM (v6)
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React

## 📂 Project Structure

```bash
client-routing/
├── src/
│   ├── components/      # Reusable UI components (Stats, Sidebar)
│   ├── layout/          # Main application wrapper
│   ├── pages/           # Route views (Dashboard, Bookings, Rooms)
│   ├── App.jsx          # Main routing configuration
│   └── index.css        # Global styles & Tailwind directives
```

## 🚀 How to Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📝 Evaluation Note

This project aims to demonstrate proficiency in:
1.  **SPA Architecture**: Understanding the difference between server-side and client-side navigation.
2.  **State Management**: Handling complex data flows across multiple components.
3.  **Modern UI/UX**: Implementing responsive and interactive design patterns.
