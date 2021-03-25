- [**Download File**](#-download-file) – *Скачать файл с сервера*
- [**document.update**](#-documentupdate) – *Обновить информацию о файле*
# Описание методов:

## • Download File
Скачать файл
```js
GET /download
```
*Скачать файл по полученному path*  
*```/download/```+```path```*
### Примеры запросов
```
/download/orderDocument/2534/file.txt
```
***



## • document.update
Обновить информацию о документе
```js
POST /document.update
```

### Все доступные параметры
Параметр | Тип | Описание | По умолчанию
-- | -- | -- | --
id* | int | ID документа
docTelegID* | str | ID документа в телеграме

*Сейчас только устанавливает новый telegramID документа*

### Примеры запросов
```js
/document.update?id=31&docTelegID=gsdiohsdgo3s2shdv
```

### Пример ответа
```
{
    "id": 31,
    "path": "orderDocument/6135/file.txt",
    "pathDisk": null,
    "documentTelegramId": gsdiohsdgo3s2shdv
}
```
***