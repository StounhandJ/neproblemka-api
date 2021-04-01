- [**order**](#-order) – *Получить заказ*
- [**order.all**](#-orderall) – *Получить заказы*
- [**order.create**](#-ordercreate) – *Создать заказ*
- [**order.update**](#-orderupdate) – *Обновить заказ*
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
    "idClient": {
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
stateOfOrder* | int | ID состояния
docTelegID | string | ID документа в телеграме | null
document | document | Документ | null

*document отправлять как файл*

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