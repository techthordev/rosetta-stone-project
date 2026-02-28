# Rosetta Stone Project

This project is a practical exploration of database-first development and backend interoperability.
The same Coffee Tracker business logic is implemented using three different backend technologies, all sharing the exact same PostgreSQL schema.

* **Database:** PostgreSQL 18
* **Migration Tool:** Flyway (Containerized)
* **Infrastructure:** Podman & Podman Compose
* **Frontend:** Angular 21+ (Signals-first, Standalone Components)

---

# 1. Infrastructure (Podman Compose)

The complete stack (Database + Flyway + all Backends) runs via Podman Compose.

## Prerequisites

* Podman (rootless mode recommended)
* Podman Compose (Docker Compose plugin compatible)

---

## Start Everything

From the project root:

```bash
podman compose up -d --build
```

This will:

* Start PostgreSQL
* Run Flyway migrations
* Start all three backends

To stop and remove volumes:

```bash
podman compose down -v
```

---

# 2. Database

| Parameter | Value                |
| --------- | -------------------- |
| Image     | `postgres:18-alpine` |
| Container | `coffee-db`          |
| User      | `dev`                |
| Password  | `changeme`           |
| Database  | `coffeedb`           |
| Port      | `5432:5432`          |

---

## Verify Database State

List tables:

```bash
podman exec -it coffee-db psql -U dev -d coffeedb -c "\dt"
```

Query data:

```bash
podman exec -it coffee-db psql -U dev -d coffeedb -c "SELECT * FROM coffee;"
```

---

# 3. Database Migrations (Flyway Container)

Migrations are located in:

```
db/migration
```

Example:

```
V1__create_coffee.sql
```

Flyway runs automatically on `podman compose up`.

To inspect migration logs:

```bash
podman logs coffee-migrations
```

You should see something like:

```
Successfully applied 1 migration
```

---

# 4. Backends

All backends connect via container networking:

```
postgres://dev:changeme@coffee-db:5432/coffeedb
```

| Technology    | Port | Container                       |
| ------------- | ---- | ------------------------------- |
| Spring Boot   | 8080 | coffee-tracker-backend-spring-1 |
| Rust (Axum)   | 8081 | coffee-tracker-backend-rust-1   |
| Go (net/http) | 8082 | coffee-tracker-backend-go-1     |

---

## 4.1 Spring Boot (Java 25)

* Virtual Threads
* Structured Concurrency
* Hibernate / JPA

---

## 4.2 Go (1.24+)

* Standard `net/http`
* `pgxpool` connection pooling

---

## 4.3 Rust (Axum)

* Axum framework
* `sqlx`
* Async Tokio runtime
* CORS enabled for Angular dev server

The Rust service binds to:

```
0.0.0.0:8081
```

(Required for container port mapping.)

---

# 5. Frontend (Angular 21+)

Located in:

```
/frontend
```

Start locally:

```bash
cd frontend
npm install
ng serve
```

Available at:

```
http://localhost:4200
```

The frontend can switch between:

* `http://localhost:8080` (Spring)
* `http://localhost:8081` (Rust)
* `http://localhost:8082` (Go)

---

# 6. Verification

Test all backends:

```bash
curl http://localhost:8080/api/coffees
curl http://localhost:8081/api/coffees
curl http://localhost:8082/api/coffees
```

Example output:

Spring:

```json
[
  {
    "createdAt": "2026-02-28T01:08:41.360336",
    "id": 1,
    "price": 1.20,
    "type": "Espresso"
  }
]
```

Rust:

```json
[
  {
    "id": 1,
    "type": "Espresso",
    "price": "1.20"
  }
]
```

Go:

```json
[
  {
    "id": 1,
    "type": "Espresso",
    "price": 1.2
  }
]
```
