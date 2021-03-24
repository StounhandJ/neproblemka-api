# Перечень методов

1. Документация к cheque [cheque.md](https://github.com/StounhandJ/neproblemka-api/blob/master/documentation/cheque.md)
2. Документация к client [client.md](https://github.com/StounhandJ/neproblemka-api/blob/master/documentation/client.md)
3. Документация к order [order.md](https://github.com/StounhandJ/neproblemka-api/blob/master/documentation/order.md)
4. Документация к payment [payment.md](https://github.com/StounhandJ/neproblemka-api/blob/master/documentation/payment.md)
5. Документация к promocode [promocode.md](https://github.com/StounhandJ/neproblemka-api/blob/master/documentation/promocode.md)

# Дополнительные методы:

## • Download file
Получить чек оплаты
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
