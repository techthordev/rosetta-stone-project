package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Coffee struct {
	ID int64 `json:"id"`
	Type string `json:"type"`
	Price float64 `json:"price"`
}

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

	http.HandleFunc("/api/coffees", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
		w.Header().Set("Content-Type", "application/json")

		rows, err := dbpool.Query(ctx, "SELECT id, type, price FROM coffee")
		if err != nil {
			log.Fatalf("Query failed: %v\n", err)
		}
		defer rows.Close()
	
		var coffees []Coffee
		for rows.Next() {
			var c Coffee			
			if err := rows.Scan(&c.ID, &c.Type, &c.Price); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			coffees = append(coffees, c)

		}

		json.NewEncoder(w).Encode(coffees)
		
	})
	
	fmt.Println("Server starting on port 8082...")
	log.Fatal(http.ListenAndServe(":8082", nil))
}
