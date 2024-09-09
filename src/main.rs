mod routes;

#[macro_use] extern crate rocket;

use rocket::fs::FileServer;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![
            routes::home,
            routes::what_is_bitcoin,
            routes::bitcoin_mining,
            routes::how_to_buy_bitcoin,
            routes::bitcoin_price_history
        ])
        .mount("/static", FileServer::from("static"))
}