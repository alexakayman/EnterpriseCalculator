# Enterprise Pricing Calculator - Developer Guide

### Prerequisites

- **Bun** (recommended) or Node.js 20+
- **PostgreSQL** database (local or cloud)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd EnterpriseCalculator
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file
   DATABASE_URL=postgresql://username:password@localhost:5432/enterprise_calculator
   NODE_ENV=development
   ```

4. **Start development server**
   ```bash
   bun run dev
   ```

The application will be available at `http://localhost:5000`

## ⚙️ Configuration Guide

### Central Configuration: `shared/pricing-config.ts`

All pricing settings, deliverables, billing options, and payment methods are centrally configured in `shared/pricing-config.ts`. This file is the single source of truth for all pricing-related configurations.

#### Core Pricing Constants

```typescript
export const SEAT_PRICE_MONTHLY = 100; // Base price per seat per month
export const MINIMUM_SEATS = 30; // Minimum seats required
export const SETUP_TRAINING_FEE = 5000; // Mandatory setup fee
export const SIGNING_FEE_PERCENTAGE = 10; // 10% of annual seat cost
```

#### Adding New Deliverables

To add a new deliverable option, simply add it to the `DELIVERABLES` array:

```typescript
export const DELIVERABLES: Deliverable[] = [
  // ... existing deliverables
  {
    id: "new-feature",
    name: "New Enterprise Feature",
    description: "Description of the new feature",
    price: 15000,
  },
];
```

#### Modifying Billing Options

Update the `BILLING_OPTIONS` array to change billing periods and discounts:

```typescript
export const BILLING_OPTIONS: BillingOption[] = [
  {
    id: "monthly",
    name: "Monthly Pricing",
    description: "Billed monthly",
    discountPercentage: 0,
    paymentSchedule: "monthly",
  },
  // Add new billing options here
];
```

#### Adding Payment Methods

Extend the `PAYMENT_METHODS` array to support new payment options:

```typescript
export const PAYMENT_METHODS: PaymentMethod[] = [
  // ... existing payment methods
  {
    id: "wire",
    name: "Wire Transfer",
    description: "No processing fee",
    feeType: "fixed",
    feeAmount: 0,
  },
];
```

## 📁 Project Structure

```
EnterpriseCalculator/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── index.css      # Global styles
│   └── index.html         # HTML entry point
├── server/                # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── vite.ts            # Vite integration
├── shared/                # Shared code between frontend/backend
│   ├── pricing-config.ts  # 🎯 CENTRAL PRICING CONFIGURATION
│   └── schema.ts          # Database schema
├── attached_assets/       # Static assets
└── migrations/            # Database migrations
```

## 🔧 Development Workflow

### Making Pricing Changes

1. **Edit `shared/pricing-config.ts`**

   - Modify constants, deliverables, billing options, or payment methods
   - Changes are immediately reflected in the UI

2. **Test the changes**

   - The development server supports hot reload
   - Pricing calculations update in real-time

3. **Deploy**
   - Build the application: `bun run build`
   - Deploy to your target environment

### Database Operations

```bash
# Push schema changes to database
bun run db:push

# Generate new migration
bunx drizzle-kit generate

# Apply migrations
bunx drizzle-kit migrate
```

## 🎨 Customization

### Styling

- **Tailwind CSS**: Modify `tailwind.config.ts` for design tokens
- **Components**: Use Shadcn/ui components in `client/src/components/`
- **Global Styles**: Edit `client/src/index.css`

### Adding New Features

1. **Frontend**: Add components in `client/src/components/`
2. **Backend**: Add routes in `server/routes.ts`
3. **Database**: Update schema in `shared/schema.ts`
4. **Configuration**: Modify `shared/pricing-config.ts`

## 🚀 Deployment

### Production Build

```bash
bun run build
```

### Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Set to "production" for production builds

### Deployment Targets

- **Replit**: Configured for autoscale deployment
- **Vercel**: Frontend deployment
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🔍 Troubleshooting

### Common Issues

1. **Port 5000 in use**

   ```bash
   lsof -ti:5000 | xargs kill -9
   ```

2. **Database connection issues**

   - Verify `DATABASE_URL` environment variable
   - Ensure PostgreSQL is running
   - Check network connectivity

3. **Build errors**
   ```bash
   bun install  # Reinstall dependencies
   bun run check  # Check TypeScript errors
   ```

### Development Tips

- **Hot Reload**: Changes to `pricing-config.ts` trigger automatic UI updates
- **Type Safety**: All pricing configurations are fully typed
- **Validation**: Form inputs use Zod validation schemas
- **Error Handling**: Comprehensive error handling in both frontend and backend

## 📚 API Reference

### Pricing Calculation Endpoints

The application provides RESTful API endpoints for pricing calculations:

- `GET /api/pricing/calculate` - Calculate pricing based on configuration
- `POST /api/pricing/quote` - Generate pricing quote

### Data Models

All pricing data models are defined in `shared/pricing-config.ts`:

- `Deliverable` - Add-on features and their pricing
- `BillingOption` - Billing periods and discount structures
- `PaymentMethod` - Payment options and processing fees

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make changes to `shared/pricing-config.ts` for pricing updates**
4. **Test thoroughly**
5. **Submit a pull request**

## 📄 License

MIT License - see LICENSE file for details

---

**💡 Pro Tip**: The `shared/pricing-config.ts` file is your primary tool for customizing the enterprise pricing calculator. All pricing logic, deliverables, and billing options can be modified here without touching the core application code.
