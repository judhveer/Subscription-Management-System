# Subscription-Management-System
This system manages subscriptions for Gym and Tuition services. Each member can subscribe with a custom start date and duration. The system tracks active subscriptions, renewals, payments, and reports. It supports multiple user roles (Seller and Buyer) and allows sellers to manage their own services. Need to create APIs for all the below modules


---

## 📌 Key Modules

### 1. User Management
- User Registration and Login
- Role-based access: **Seller** and **Buyer**
- Secure authentication using **JWT**
- Middleware protection for role-specific access

---

### 2. Service Plans
- **Sellers** can create and manage their services
- Plan Types: **Monthly**, **Quarterly**, **Yearly**
- Custom pricing and duration
- Add discounts to plans
- Service Categories:  
  `Yoga`, `Science Tuition`, `Weight Training`, etc.

---

### 3. Subscription Management
- **Buyers** can subscribe to multiple services from different Sellers
- Select **custom start date**
- Automatic **end date calculation** based on plan type
- Validation for **overlapping subscriptions**

---

### 4. Subscription Lifecycle Management
- **Daily Cron Jobs** to manage subscription status
  - Detect upcoming expirations
  - Mark expired subscriptions automatically
- Filter subscriptions by date using API
- Optional: Send alerts via **Email/SMS**
- Auto-disable expired subscriptions

---

### 5. Payments Management
- Record payment transactions for each subscription
- Link payments with corresponding plans and users
- Maintain **invoice history** for accountability

---

### 6. Reports and Dashboard for Sellers
- Track total active members per service
- Monitor **subscriptions expiring soon**
- Generate service-wise analytics
- Apply **date-wise filters** and **sorting**
- Calculate total revenue for selected period/service

---

## 💡 Bonus Features (Optional)
- PDF Invoice generation
- Share invoices via public link

---

## 🛠️ Technology Stack

| Layer          | Technology              |
|----------------|--------------------------|
| Backend        | Node.js + Express        |
| Database       | MySQL (via Sequelize ORM)|
| Authentication | JWT                      |
| Scheduling     | Cron Jobs                |
| Frontend       | React + Vite + TailwindCSS (no PostCSS/autoprefixer) |

---

## 🧪 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/
   cd 
