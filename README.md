# Rosetta Stone Project

This project serves as a practical exploration of database-first development and application interopability. The goal is to implement the same business logic (a Coffee Tracker) using three different backend technologies while sharing the exact same database schema.

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
| **Database Name** | `coffedb` |
| **Port** | `5432:5432` |

## 2. Database Migrations (Flyway)

Database schema changes are managed using Flyway CLI.

### Installation

Flyway is installed globally via a tarball and linked to `/usr/bin/flyway`.

### Configuration (`flyway.conf`)

Flyway is configured to connect to the local Podman container:

```properties
flyway.url=jdbc:postgresql://localhost:5432/coffedb
flyway.user=dev
flyway.password=changeme
flyway.locations=filesystem:db/migration
```

### Running Migrations

To apply pending migrations, run:

```bash
flyway migrate
```

## 3. Verification

To verify that the database is running and migrations have been applied, you can execute a SQL query directly against the container:

```bash
podman exec -it coffee-db psql -U dev -d coffedb -c "SELECT * FROM coffee;"
```
