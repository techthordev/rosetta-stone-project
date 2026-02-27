# Rosetta Stone Project

This project serves as a practical exploration of database-first development and application interoperability. The goal is to implement the same business logic (a Coffee Tracker) using three different backend technologies while sharing the exact same database schema.

* **Database:** PostgreSQL 18
* **Migration Tool:** Flyway CLI
* **Infrastructure:** Podman & Podman Compose
* **Frontend:** Angular 21+ (Signals-first, Standalone Components)

## 1. Database Infrastructure (Podman)

The PostgreSQL database runs in a container managed by Podman.

### Prerequisites

* Podman installed and configured for rootless mode.

### Start the Database

To start the database container, run the following command in the project root:

```bash
podman compose -f podman-compose.yml up -d
```

### Database Configuration

| Parameter | Value |
| --- | --- |
| **Image** | `postgres:18-alpine` |
| **Container Name** | `coffee-db` |
| **User** | `dev` |
| **Password** | `changeme` |
| **Database Name** | `coffeedb` |
| **Port** | `5432:5432` |

## 2. Database Migrations (Flyway)

Database schema changes are managed using Flyway CLI.

### Configuration (`flyway.conf`)

Flyway is configured to connect to the local Podman container:

```properties
flyway.url=jdbc:postgresql://localhost:5432/coffeedb
flyway.user=dev
flyway.password=changeme
flyway.locations=filesystem:db/migration
```

### Running Migrations

To apply pending migrations, run:

```bash
flyway migrate
```

## 3. Backends

All backends use the following environment variable to connect to the database:
`DATABASE_URL=postgres://dev:changeme@localhost:5432/coffeedb`

| Technology | Port | Directory | Run Command |
| --- | --- | --- | --- |
| **Spring Boot 4.0+** | `8080` | `/backend_spring` | `./gradlew bootRun` |
| **Rust (Axum)** | `8081` | `/backend_rust` | `cargo run` |
| **Go (Standard Lib)** | `8082` | `/backend_go` | `go run main.go` |

### 3.1 Spring Boot (Java 25)

Utilizes **Virtual Threads** and **Structured Concurrency** for efficient database access.

* **Build Tool:** Gradle (Groovy DSL)

### 3.2 Go (1.24+)

Built using the standard `net/http` library and `pgxpool` for high-performance connection pooling.

### 3.3 Rust (1.93+)

Implemented with the **Axum** framework and `sqlx` for asynchronous, compile-time checked SQL queries.

## 4. Frontend (Angular 21+)

Located in `/frontend`. This is a modern **Signals-first** application using standalone components.

### Setup & Run

```bash
cd frontend
npm install
ng serve
```

The application will be available at `http://localhost:4200`.

### Shared Components

The project uses a **Shared Coffee Table** component to ensure a consistent UI regardless of which backend is providing the data.

## 5. Verification

To verify that the backends are serving data, you can use `curl`:

```bash
# Test Spring Backend
curl http://localhost:8080/api/coffees

# Test Rust Backend
curl http://localhost:8081/api/coffees

# Test Go Backend
curl http://localhost:8082/api/coffees
```

To execute a SQL query directly against the container:

```bash
podman exec -it coffee-db psql -U dev -d coffeedb -c "SELECT * FROM coffee;"
```
