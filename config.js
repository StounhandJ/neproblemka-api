mesStatusCode ={
    200: "Успех",
    400: "Неверный запрос",
    304: "Не изменялось",
    404: "Не найденно"
}

stateOfOrder ={
    0: "Заказ на рассмотрение",
    1: "Происходит оплата всей суммы",
    2: "Происходит оплата половины суммы",
    11: "Оплачено все",
    12: "Оплачена половина",
}

module.exports ={
    mesStatusCode: mesStatusCode,

    DB_login:"mysql",
    DB_password:"mysql",
    DB_name:"neproblemka",
    DB_host:"localhost",

    directory_store: "public",
}