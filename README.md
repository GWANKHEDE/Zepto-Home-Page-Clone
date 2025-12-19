# Zepto Home Page Clone

A responsive clone of the Zepto home screen with add-to-cart functionality and a cart sidebar sheet, built with Next.js (App Router), TypeScript, Redux Toolkit, and TanStack Query.

## Features

- **Home Screen**: Header with Logo, Location, Search Bar, and Cart Icon. Horizontal Category Tabs and Product Grid (fetched from API).
- **Add to Cart**: Add products, increment/decrement quantity, and persistent cart state.
- **My Cart Sheet**: Sidebar showing items, subtotal, and quantity controls.
- **Tech Stack**: Next.js 14, Tailwind CSS, Redux Toolkit, TanStack Query, Shadcn UI.

## Setup Guide

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd zepto-clone
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

## State Management Choice

**Redux Toolkit** was chosen for cart state management to demonstrate robust global state handling suitable for e-commerce.

- **Store**: Configured in `src/lib/store/store.ts`.
- **Slice**: `cartSlice.ts` handles `addToCart`, `removeFromCart`, `updateQuantity`, and `toggleCart`.
- **Persistence**: Implemented via a subscription model in `src/components/providers.tsx` which syncs Redux state with `localStorage`.
- **Selectors/Dispatch**: Typed hooks (`useAppSelector`, `useAppDispatch`) ensure type safety across the application.

## Screenshots

### Home Screen
<!-- Add your screenshot here: local path or URL -->
![Home Screen](./screenshots/home.png)
*Home screen showing categories and product grid*

### Cart Open
<!-- Add your screenshot here: local path or URL -->
![Cart Open](./screenshots/cart.png)
*Cart sidebar open with items added*

## Folder Structure

The project follows a feature-based architecture within the `src/` directory:

*   `src/app/`: The main entry point. `page.tsx` is the home page.
*   `src/components/`:
    *   `features/`: Contains the core logic components (cart, product, category).
    *   `layout/`: The Header and site-wide frames.
    *   `ui/`: Reusable small blocks (buttons, inputs) from shadcn.
*   `src/lib/`:
    *   `api/`: Functions to interact with FakeStoreAPI.
    *   `store/`: Redux setup and logic.
