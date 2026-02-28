use axum::{
    extract::State,
    http::{HeaderValue, Method},
    response::IntoResponse,
    routing::get,
    Json, Router,
};
use dotenvy::dotenv;
use rust_decimal::Decimal;
use serde::Serialize;
use sqlx::postgres::PgPoolOptions;
use std::env;
use tower_http::cors::CorsLayer;

#[derive(sqlx::FromRow, Debug, Serialize)]
struct Coffee {
    id: i64,
    #[serde(rename = "type")]
    r#type: String,
    price: Decimal,
}

#[tokio::main]
async fn main()  {
    dotenv().ok();
    let db_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)        
        .await
        .expect("Failed to create pool");
    println!("Successfully connected to database!");

    let cors = CorsLayer::new()
        .allow_origin("http://localhost:4200".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET])
        .allow_headers(tower_http::cors::Any);

    let app = Router::new()
        .route("/api/coffees", get(get_coffees))
        .with_state(pool)
        .layer(cors);
    
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8081").await.unwrap();
    println!("Server running on http://0.0.0.0:8081");
    axum::serve(listener, app).await.unwrap();

}

async fn get_coffees(State(pool): State<sqlx::PgPool>) -> impl IntoResponse {
    let coffees = sqlx::query_as::<_, Coffee>("SELECT id, type, price FROM coffee")
        .fetch_all(&pool)
        .await;

    match coffees {
        Ok(data) => (axum::http::StatusCode::OK, Json(data)).into_response(),
        Err(e) => {
            eprintln!("Database error: {}", e);
            (axum::http::StatusCode::INTERNAL_SERVER_ERROR, "Internal Server Error").into_response()
        }
    }
}