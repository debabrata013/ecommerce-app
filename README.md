# E-Commerce App with Next.js and Clerk Authentication

This is a [Next.js](https://nextjs.org) e-commerce application with Clerk authentication and a RESTful API backend.

## Features

- User authentication with [Clerk](https://clerk.com)
- Product listing and details
- Shopping cart functionality
- Order management
- Responsive design

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Authentication**: Clerk
- **API**: Next.js API Routes
- **Styling**: TailwindCSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun
- Clerk account for authentication

### Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

3. Create a `.env.local` file in the root directory with your Clerk API keys:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Testing

To test the API endpoints:

1. Make sure your development server is running:
```bash
npm run dev
```

2. In a separate terminal, run the API tests:
```bash
npm run test:api
```

This will test all API endpoints and display the results in the console.

## API Routes

The application includes the following API endpoints:

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product (protected)
- `PUT /api/products/:id` - Update a product (protected)
- `DELETE /api/products/:id` - Delete a product (protected)
- `GET /api/orders` - Get user orders (protected)
- `POST /api/orders` - Create a new order (protected)
- `GET /api/orders/:id` - Get a specific order (protected)
- `PUT /api/orders/:id` - Update an order (protected)
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart` - Update user's cart (protected)
- `GET /api/wishlist` - Get user's wishlist (protected)
- `POST /api/wishlist` - Add to user's wishlist (protected)
- `DELETE /api/wishlist/:id` - Remove from user's wishlist (protected)

## Authentication

This project uses Clerk for authentication. Protected routes and API endpoints require a valid session.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## Deployment

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
