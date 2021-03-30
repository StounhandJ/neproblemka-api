- [**promocode**](#-promocode) – *Получить промокод*
- [**promocode.all**](#-promocodeall) – *Получить промокоды*
- [**promocode.create**](#-promocodecreate) – *Создать промокод*
- [**promocode.update**](#-promocodeupdate) – *Обновить промокод*
- [**promocode.del**](#-promocodedel) – *Удалить промокод*

# Описание методов: 

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
    "code":"bigDiscount",
    "discount":35,
    "typeOfCode":1,
    "limitUsing":15,
    "info":35%
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
typeOfCode | int[0,1] | Тип промокода
limitUsing | int | Количество использований
offset | int | Смещение возврата 
limit | int | Сколько вернуть

*В разработке*

### Примеры запросов
```js
/promocode.all?typeOfCode=1&limit=10
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