use rocket::response::content::RawHtml;
use rocket::get;

#[get("/")]
pub fn home() -> RawHtml<&'static str> {
    RawHtml(include_str!("../../index.html"))
}

#[get("/what-is-bitcoin")]
pub fn what_is_bitcoin() -> RawHtml<&'static str> {
    RawHtml(include_str!("../templates/what_is_bitcoin.html"))
}

#[get("/bitcoin-mining")]
pub fn bitcoin_mining() -> RawHtml<&'static str> {
    RawHtml(include_str!("../templates/bitcoin_mining.html"))
}

#[get("/how-to-buy-bitcoin")]
pub fn how_to_buy_bitcoin() -> RawHtml<&'static str> {
    RawHtml(include_str!("../templates/how_to_buy_bitcoin.html"))
}

#[get("/bitcoin-price-history")]
pub fn bitcoin_price_history() -> RawHtml<&'static str> {
    RawHtml(include_str!("../templates/bitcoin_price_history.html"))
}