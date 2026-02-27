package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://dev:changeme@localhost:5432/coffeedb"
	}

	ctx := context.Background()
	dbpool, err := pgxpool.New(ctx, dbURL)
	if err != nil {
		log.Fatalf("Unable to create connection pool: %v\n", err)
	}
	defer dbpool.Close()

	err = dbpool.Ping(ctx)
	if err != nil {
		log.Fatalf("Unable to ping database: %v\n", err)
	}
	fmt.Println("Successfully connected to database!")

	rows, err := dbpool.Query(ctx, "SELECT id, type, price FROM coffee")
	if err != nil {
		log.Fatalf("Query failed: %v\n", err)
	}
	defer rows.Close()

	for rows.Next() {
		var id int64
		var coffeeType string
		var price float64
		if err := rows.Scan(&id, &coffeeType, &price); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("Coffee: %d | %s | %.2f\n", id, coffeeType, price)
	}
}
