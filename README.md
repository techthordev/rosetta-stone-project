# Rosetta Stone Project

This project serves as a practical exploration of database-first development and application interoperability. The goal is to implement the same business logic (a Coffee Tracker) using three different backend technologies while sharing the exact same database schema.

* **Database:** PostgreSQL 18
* **Migration Tool:** Flyway CLI
* **Infrastructure:** Podman & Podman Compose

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

### 3.1 Spring Boot (Java 25)

Located in `/backend_spring`.

```bash
cd backend_spring
./gradlew bootRun

```

### 3.2 Go (1.24+)

Located in `/backend_go`.

```bash
cd backend_go
go run main.go

```

### 3.3 Rust (1.80+)

Located in `/backend_rust`.

```bash
cd backend_rust
cargo run

```

## 4. Verification

To verify that the database is running and migrations have been applied, you can execute a SQL query directly against the container:

```bash
podman exec -it coffee-db psql -U dev -d coffeedb -c "SELECT * FROM coffee;"

```
