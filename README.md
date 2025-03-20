# Match Management API

## 🚀 Overview
This is a **Match Management API** built using **NestJS** and **Prisma ORM** with MongoDB. It allows users to create, retrieve, filter, and delete matches between experts and clients.

---

## 🛠️ Setup Instructions

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/u0m5e0s9h/backend-assignment.git
cd backend-assignment
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Configure Environment Variables**
Create a `.env` file in the project root and add:
```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority"
PORT=3000
```

### 4️⃣ **Run Prisma Migrations**
```sh
npx prisma generate
npx prisma migrate dev
```

### 5️⃣ **Start the Server**
```sh
npm run start:dev
```

The API will be available at: **`http://localhost:3000`**

---

## 📖 API Endpoints

### 1️⃣ **Create a Match**
**POST** `/matches`
```json
{
  "expertId": "65123abc456def7890123456",
  "clientId": "65123abc456def7890123457",
  "rating": 4.5,
  "specialization": "Cardiology"
}
```

### 2️⃣ **Get All Matches (Optional Filters)**
**GET** `/matches`
- Retrieve all matches
- Filter by specialization or rating

```sh
GET /matches?specialization=Cardiology&rating=4.5
```

### 3️⃣ **Delete a Match**
**DELETE** `/matches/:id`

```sh
DELETE /matches/67db235b542ac0e27a7c157b
```

---

## 🎯 **Design Choices**

### 1️⃣ **NestJS Framework**
- Provides modular structure for scalability
- Dependency injection for better maintainability

### 2️⃣ **Prisma ORM with MongoDB**
- Schema-first approach for database modeling
- Type safety and efficient query execution

### 3️⃣ **DTOs for Validation**
- `class-validator` ensures input validation before reaching the service layer
- Example:
  ```ts
  @IsMongoId()
  @IsNotEmpty()
  expertId: string;
  ```

### 4️⃣ **Query-Based Filtering**
- Matches can be retrieved using `specialization` and `rating` filters
- Enables dynamic API requests

### 5️⃣ **Error Handling**
- `ConflictException` for duplicate client matches
- `NotFoundException` when trying to delete a non-existent match

---




