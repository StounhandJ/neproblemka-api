# Список методов:

- [**client**](#-client) – *Получить клиента*
- [**client.all**](#-clientall) – *Получить всех клиентов*
- [**client.create**](#-clientcreate) – *Создать клиента*
- [**client.update**](#-clientupdate) – *Обновить клиента*
- [**client.del**](#-clientdel) – *Создать клиента*
  
- [**order**](#-order) – *Получить заказ*
- [**order.all**](#-orderall) – *Получить заказы*
- [**order.create**](#-ordercreate) – *Создать заказ*
- [**order.update**](#-orderupdate) – *Обновить заказ*
- [**order.del**](#-orderdel) – *Удалить заказ*

- [**promocode**](#-promocode) – *Получить промокод*
- [**promocode.all**](#-promocodeall) – *Получить промокоды*
- [**promocode.create**](#-promocodecreate) – *Создать промокод*
- [**promocode.update**](#-promocodeupdate) – *Обновить промокод*
- [**promocode.del**](#-promocodedel) – *Удалить промокод*

- [**paymentOrder**](#-paymentorder) – *Получить оплату заказа*
- [**paymentOrder.all**](#-paymentorderall) – *Получить оплаты заказов*
- [**paymentOrder.create**](#-paymentordercreate) – *Создать оплату заказа*
- [**paymentOrder.del**](#-paymentorderdel) – *Удалить оплату заказа*

- [**cheque**](#-cheque) – *Получить чек*
- [**cheque.all**](#-chequeall) – *Получить чеки*
- [**cheque.create**](#-chequecreate) – *Создать чек*
- [**cheque.del**](#-chequedel) – *Удалить чек*
# Описание методов: 

## • client
Получить клиента по id
```js
GET /client
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id | int | ID клиента
telegramID | int | ID клиента

*Минимум один параметр должен передаваться для получения*

### Примеры запросов
```js
/client?id=5
```

### Пример ответа
```
{
    "id": 5,
    "mail": "tset@gmail.com",
    "telegramID":524523,
    "phoneNumber":890972341
}
```
***



## • client.all
Получить всех клиентов
```js
GET /client.all
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --

*Дополнительных параметров пока нет*

### Примеры запросов
```js
/client.all
```

### Пример ответа
```
[
  [Возвращаемые поля идентичны /client],
]
```
***


## • client.create
Создать клиента
```js
POST /client.create
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
mail | string | Почта клиента | ""
telegramID | int | ID telegram аккаунта | 0
phoneNumber | int | Телефон | 0

*Минимум один параметр должен передаваться для создания*

### Примеры запросов
```js
/client.create?mail="test@gmail.com"&telegramID=245234
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /client]
}
```
***



## • client.update
Обновить клиента
```js
POST /client.update
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
mail | string | Почта клиента | ""
telegramID | int | ID telegram аккаунта | 0
phoneNumber | int | Телефон | 0

*Минимум один параметр должен передаваться для обновления*

### Примеры запросов
```js
/client.update?phoneNumber=89096947185
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /client]
}
```
***



## • client.del
Удалить клиента по id
```js
POST /client.del
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id* | int | ID клиента


### Примеры запросов
```js
/client.del?id=3
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /client]
}
```
***



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
    "idClient": 45,
    "description":"Что же за заказ",
    "document":523,
    "typeWork":"Проектирование",
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
documentID | int | ID документа | null
typeWorkID* | int | ID типа работы
stateOfOrder* | int | ID состояния

*Все параметры обязательны, кроме documentID*

### Примеры запросов
```js
/order.create?idClient=2&description=testOrder&typeWorkID=3&stateOfOrder=1
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /order]
}
```
***



## • order.update
Обновить заказ
```js
POST /order.update
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id* | int | ID заказа
stateOfOrder* | int | ID состояния


### Примеры запросов
```js
/order.update?id=6&stateOfOrder=4
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
{
    [Возвращаемые поля идентичны /order]
}
```
***



## • promocode
Получить промокод по id
```js
GET /promocode
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id | int | ID промокода
codeName | str | Промокод

*Минимум один параметр должен передаваться для получения*

### Примеры запросов
```js
/promocode?codeName=bigDiscount
```

### Пример ответа
```
{
    "id": 3,
    "name": "Лучший промокод",
    "codeName":"bigDiscount",
    "discount":35,
    "typeOfCode":1,
    "limitUsing":15
}
```
***



## • promocode.all
Получение промокодов
```js
GET /promocode.all
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --

*В разработке*

### Примеры запросов
```js
/promocode.all
```

### Пример ответа
```
[
    [Возвращаемые поля идентичны /promocode]
]
```
***



## • promocode.create
Получение промокодов
```js
POST /promocode.create
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
name* | str | Имя промокода 
codeName* | str | Код промокода
discount* | int | Скидка
typeOfCode* | int | Тип кода
limitUsing* | int | Количество

### Примеры запросов
```js
/promocode.create?name=test&codeName=testcod&discount=35&typeOfCode=1&limitUsing=100
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /promocode]
}
```
***



## • promocode.update
Получение промокодов
```js
POST /promocode.update
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id* | int | ID промокода
name | str | Имя промокода
codeName | str | Код промокода
discount | int | Скидка
typeOfCode | int | Тип кода
limitUsing | int | Количество

### Примеры запросов
```js
/promocode.update?id=23&codeName=testCode2
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /promocode]
}
```
***



## • promocode.del
Получение промокодов
```js
POST /promocode.del
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id* | int | ID промокода

### Примеры запросов
```js
/promocode.del?id=8
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /promocode]
}
```
***



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
    "promoCodeID": 21
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
price* | int | ID промокода
promoCodeID | int | ID промокода

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



## • cheque
Получить чек оплаты
```js
GET /cheque
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id | int | ID чека
secretKey | str | Секретный ключ

*Минимум один параметр должен передаваться для получения*

### Примеры запросов
```js
/cheque?secretKey=gsdiohsdgo3s2shdv
```

### Пример ответа
```
{
    "id": 3,
    "idPaymentOrder": 5,
    "amount": 17000,
    "date": 1243141214,
    "secretKey": gsdiohsdgo3s2shdv
}
```
***



## • cheque.all
Получить чеки для оплаты заказа
```js
GET /cheque.all
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
idPaymentOrder* | int | ID оплаты заказа
active | str | Закончена ли оплата | 0

*Возвращает все активные чеки оплаты, если не указан active*

### Примеры запросов
```js
/cheque.all?idPaymentOrder=12
```

### Пример ответа
```
[
    [Возвращаемые поля идентичны /cheque]
]
```
***



## • cheque.create
Создать чек
```js
POST /cheque.create
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
idPaymentOrder* | int | ID оплаты заказа
amount* | int | Сумма оплаты
secretKey* | str | Секретный ключ


### Примеры запросов
```js
/cheque.create?idPaymentOrder=10&amount=7000&secretKey=sgo13hii14hl
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /cheque]
}
```
***



## • cheque.del
Удалить чек
```js
POST /cheque.del
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id* | int | ID чека


### Примеры запросов
```js
/cheque.del?id=12
```

### Пример ответа
```
{
    [Возвращаемые поля идентичны /cheque]
}
```
***