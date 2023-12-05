# GST Billing System

This project aims to create a Goods and Services Tax (GST) billing system using React on the client side, Node.js on the server side, and Postgres as the database. The system allows administrators to set GST rates for various product categories, create products, record sales, and generate bills with accurate tax calculations.

## Problem Statement

The primary goal of the GST Billing System is to automate the recording of GST in customer bills based on different product categories. The software's core capabilities include:

1. **GST Rate Management:**
   - Admin can set various GST rates for different product categories (e.g., 5% for Food, 10% for Footwear, 20% for Electronics).

2. **Product Management:**
   - Admin can create various products within different categories.

3. **Sales Recording:**
   - Users can record sales transactions for products, and the system automatically calculates the tax rate based on the product category.

4. **Bill Generation:**
   - Users can view the final bill with taxes calculated for multiple products of various categories.

5. **Sales Reporting:**
   - Admin can view all sales transactions for a specific day.

6. **Revenue Analysis:**
   - Admin can analyze total revenue for a day, month, and year through a graph or a summary widget.

## Screens and Functionality

1. **Create Product Categories:**
   - Users can create new product categories.

2. **Capture GST Rates:**
   - Admin can set GST rates for various product categories.

3. **Create Products:**
   - Users can create products within different product categories.

4. **Sales Recording:**
   - Users can record sales transactions by choosing products from a dropdown. Product category and GST are populated automatically.

5. **Final Bill Generation:**
   - Upon submission, the system generates a final bill with detailed information, including product category, rate, and tax.

## Technologies Used

- **Client Side:** React.js with Bootstrap
- **Server Side:** Node.js
- **Database:** Postgres(supabase.co)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Triptiskillz/deepfleet_tripti_sharma.git
   ```

2. Navigate to the project directory:

   ```bash
   cd client

   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Access the application at [http://localhost:3000](http://localhost:3000).
