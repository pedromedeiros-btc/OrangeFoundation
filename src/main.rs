mod routes;

#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> rocket::response::content::RawHtml<&'static str> {
    routes::home()
}

#[get("/what-is-bitcoin")]
fn what_is_bitcoin() -> rocket::response::content::RawHtml<&'static str> {
    routes::what_is_bitcoin()
}

#[get("/bitcoin-mining")]
fn bitcoin_mining() -> rocket::response::content::RawHtml<&'static str> {
    routes::bitcoin_mining()
}

#[get("/how-to-buy-bitcoin")]
fn how_to_buy_bitcoin() -> rocket::response::content::RawHtml<&'static str> {
    routes::how_to_buy_bitcoin()
}

#[get("/bitcoin-price-history")]
fn bitcoin_price_history() -> rocket::response::content::RawHtml<&'static str> {
    routes::bitcoin_price_history()
}

use rocket::fs::FileServer;

// ... (previous code remains the same)

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, what_is_bitcoin, bitcoin_mining, how_to_buy_bitcoin, bitcoin_price_history])
        .mount("/static", FileServer::from("static"))
}