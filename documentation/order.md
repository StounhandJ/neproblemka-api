- [**order**](#-order) – *Получить заказ*
- [**order.all**](#-orderall) – *Получить заказы*
- [**order.create**](#-ordercreate) – *Создать заказ*
- [**order.priceSet**](#-orderpriceset) – *Расчет платежа*
- [**order.chequeCreate**](#-orderchequecreate) – *Обновить заказ*
- [**order.chequeCompleted**](#-orderchequecompleted) – *Обновить заказ*
- [**order.del**](#-orderdel) – *Удалить заказ*
# Описание методов: 

## • order
Получить информацию о заказе по id
```js
GET /order
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id* | int | ID заказа


### Примеры запросов
```js
/order?id=1
```

### Пример ответа
```
{
    "id": 1,
    "Client": {
        "id": 5,
        "mail": "tset@gmail.com",
        "telegramID":524523,
        "phoneNumber":890972341
    },
    "description":"Что же за заказ",
    "document":{
        "path":"orderDocument/2146/file.txt",
        "pathDisk":null,
        "documentTelegramId":"dsgb23blbsfv3bgsdg43gssvu"
        },
    "typeWork":"Проектирование",
    "price": 5900,
    "promoCodeID": null,        
    "otherDiscount": 5,        
    "separate": 0,
    "date": 52351241125,
    "stateOfOrder":3
}
```
***



## • order.all
Получить информацию о заказах
```js
GET /order.all
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
idClient | int | ID клиента
typeWorkID | int | ID типа работы
stateOfOrder | int | ID состояния
offset | int | Смещение возврата
limit | int | Сколько вернуть

*Если ни один параметр не указан, вернуться все активные заказы*

### Примеры запросов
```js
/order.all?typeWorkID=3&stateOfOrder=1
```

### Пример ответа
```
[
    [Возвращаемые поля идентичны /order]
]
```
***



## • order.create
Создать заказ
```js
POST /order.create
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
idClient* | int | ID клиента
description* | string | Описание заказа
typeWork* | str | Имя типа работы
otherDiscount* | int | Дополнительная скидка %
separate* | int[0,1] | По частям ли оплата
promoCodeID | int | ID промокода
docTelegID | string | ID документа в телеграме | null
document | document | Документ | null

*document отправлять как файл*

### Примеры запросов
```js
/order.create?idClient=2&description=testOrder&typeWork=works
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /order]
}
```
***



## • order.priceSet
Установить сумму оплаты за заказ
```js
POST /order.priceSet
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id* | int | ID клиента
price* | int | Сумма оплаты в копейках

*Вся оплата и расчет проводиться в копейках*

### Примеры запросов
```js
/order.priceSet?id=2&price=170000
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /order]
}
```
***



## • order.chequeCreate
Создать чек для оплаты, используя секретный ключ
```js
POST /order.chequeCreate
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id* | int | ID заказа
secretKey* | str | Секртеный ключ


### Примеры запросов
```js
/order.chequeCreate?id=6&secretKey=8d66688a59626ce12efed6c532b51e05
```

### Пример ответа
```
7500
```
***


## • order.chequeCompleted
По серетному ключу подтвердить оплату заказа
```js
POST /order.chequeCompleted
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
secretKey* | str | Секртеный ключ


### Примеры запросов
```js
/order.chequeCompleted?secretKey=8d66688a59626ce12efed6c532b51e05
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /order]
}
```
***



## • order.del
Обновить заказ
```js
POST /order.del
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id* | int | ID заказа

### Примеры запросов
```js
/order.del?id=6
```

### Пример ответа
```
[]
```
***