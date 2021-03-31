- [**paymentOrder**](#-paymentorder) – *Получить оплату заказа*
- [**paymentOrder.all**](#-paymentorderall) – *Получить оплаты заказов*
- [**paymentOrder.create**](#-paymentordercreate) – *Создать оплату заказа*
- [**paymentOrder.del**](#-paymentorderdel) – *Удалить оплату заказа*

# Описание методов: 

## • paymentOrder
Получить оплату заказа по ID
```js
GET /paymentOrder
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id* | int | ID промокода

### Примеры запросов
```js
/paymentOrder?id=8
```

### Пример ответа
```
{
    "id": 8,
    "idOrder": 142,
    "price": 2500,
    "dateEnd": 1616483915,
    "promoCodeID": 21,
    "otherDiscount": 5
}
```
***



## • paymentOrder.all
Получить оплаты заказов
```js
GET /paymentOrder.all
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
idOrder | int | ID заказа
promoCodeID | int | ID промокода

### Примеры запросов
```js
/paymentOrder.all?idOrder=4
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /paymentOrder]
}
```
***



## • paymentOrder.create
Создать оплату заказа
```js
POST /paymentOrder.create
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
idOrder* | int | ID заказа
price* | int | Сумма оплаты
promoCodeID | int | ID промокода
promoCodeID | int | Дополнительная скидка в %

### Примеры запросов
```js
/paymentOrder.create?idOrder=4&price=15000
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /paymentOrder]
}
```
***



## • paymentOrder.del
Удалить оплату заказа
```js
POST /paymentOrder.del
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id* | int | ID оплаты заказа

### Примеры запросов
```js
/paymentOrder.del?id=7
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /paymentOrder]
}
```
***