use rocket::response::content::RawHtml;

pub fn home() -> RawHtml<&'static str> {
    RawHtml(include_str!("../../index.html"))
}

pub fn what_is_bitcoin() -> RawHtml<&'static str> {
    RawHtml(include_str!("../templates/what_is_bitcoin.html"))
}

pub fn bitcoin_mining() -> RawHtml<&'static str> {
    RawHtml(include_str!("../templates/bitcoin_mining.html"))
}

pub fn how_to_buy_bitcoin() -> RawHtml<&'static str> {
    RawHtml(include_str!("../templates/how_to_buy_bitcoin.html"))
}

pub fn bitcoin_price_history() -> RawHtml<&'static str> {
    RawHtml(include_str!("../templates/bitcoin_price_history.html"))
}