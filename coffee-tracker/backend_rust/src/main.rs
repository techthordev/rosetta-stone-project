use sqlx::postgres::PgPoolOptions;
use std::env;
use dotenvy::dotenv;
use rust_decimal::Decimal;

#[derive(sqlx::FromRow, Debug)]
struct Coffee {
    id: i64,
    r#type: String,
    price: Decimal,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();
    let db_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await?;
    println!("Successfully connected to database!");
    
    let coffees = sqlx::query_as::<_, Coffee>("SELECT id, type, price FROM coffee")
        .fetch_all(&pool)
        .await?;
    
    for coffee in coffees {
        println!("Coffe: {:?} | {:?} | {:?}", coffee.id, coffee.r#type, coffee.price);
    }
    
    Ok(())
}