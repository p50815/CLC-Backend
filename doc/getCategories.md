# [GET] getCategories 取得課程種類清單

## API URL
> http://{domain}:{port}/apis/SubjectData/SubjectList/getCategories

## 傳入JSON
> 無

## 回傳JSON
```json
{
    "status": 0,
    "categories": [
        {
            "value": "C1", 
            "title": "C1 課程"
        },
        {
            "value": "C2", 
            "title": "C2 課程"
        }
    ]
}
```

欄位名稱 | 型態 | 說明
- | - | -
status | int | 處理結果狀態碼，0 為請求成功
categories | array | 存放所有課程類別的陣列
value | string | 課程類別ID (CategoryID)
title | string | 課程類別名稱 (CategoryName)