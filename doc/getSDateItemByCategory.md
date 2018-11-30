# [GET] getSDateItemByCategory 取得課堂清單

## API URL
> http://{domain}:{port}/apis/SubjectData/SubjectEdit/getSDateItemByCategory

## 傳入JSON
```json
{
    "categoryId": "C1"
}
```
欄位名稱 | 型態 | 說明
-- | - | -
categoryId | string | 帶入欲查詢的課程類別代碼

## 回傳JSON
```json
{  
   "status":0,
   "categories":[  
      {  
         "value":"C112",
         "title":"C1 一、二課"
      },
      {  
         "value":"C134",
         "title":"C1 三、四課"
      }
   ]
}
```

欄位名稱 | 型態 | 說明
-- | - | -
status | int | 處理結果狀態碼，0 為請求成功
categories | array | 存放所有課堂資訊的陣列
value | string | 課堂代碼
title | string | 課堂名稱
