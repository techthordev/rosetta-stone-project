FROM rust:1.93-slim AS build
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=build /app/target/release/backend_rust .
ENTRYPOINT ["./backend_rust"]