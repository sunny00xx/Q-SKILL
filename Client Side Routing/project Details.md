# Client-Side Routing Implementation

This project uses **React Router DOM (v6)** for client-side routing, enabling a single-page application (SPA) experience where pages load instantly without refreshing the browser.

## Core Configuration (`App.jsx`)

The main routing logic is defined in `src/App.jsx`.

### 1. BrowserRouter
The entire application is wrapped in `<Router>` (aliased `BrowserRouter`), which enables the routing context.

### 2. Route Structure
We use nested routes to apply a common layout to the main application pages while keeping the Login page separate.

```jsx
<Routes>
  {/* Public Route: Login Page (No Sidebar) */}
  <Route path="/login" element={<Login />} />

  {/* layout Wrapper: Applies Sidebar to all child routes */}
  <Route path="/" element={<Layout />}>
    {/* Default Index Route (Dashboard) */}
    <Route index element={<Dashboard />} />
    
    {/* Feature Routes */}
    <Route path="rooms" element={<Rooms />} />
    <Route path="bookings" element={<Bookings />} />
  </Route>
</Routes>
```

## Navigation Components

### 1. Sidebar Navigation (`Sidebar.jsx`)
The sidebar uses the `<NavLink>` component. This is special because it automatically knows if it is "active" (matching the current URL) and allows us to style the active link differently (e.g., highlighting it blue).

```jsx
<NavLink 
  to="/bookings" 
  className={({ isActive }) => isActive ? 'bg-blue-600' : 'text-slate-400'}
>
  Bookings
</NavLink>
```

### 2. Programmatic Navigation
For actions like **Logout**, we use the `useNavigate` hook instead of a link. This allows us to run code (like clearing data) before changing the page.

```jsx
const navigate = useNavigate();
// ... inside handleLogout
navigate('/login');
```

## Layout Strategy (`Layout.jsx`)
The `<Layout />` component uses the `<Outlet />` element. This acts as a placeholder where the child route's content (Dashboard, Rooms, etc.) is rendered.

1. **Sidebar**: Fixed on the left.
2. **Main Content**: The `<Outlet />` renders the specific page content on the right.

## Project Structure

```
client-routing/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Sidebar.jsx
│   │   └── DashboardStats.jsx
│   ├── pages/
│   │   ├── Bookings.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Rooms.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```
