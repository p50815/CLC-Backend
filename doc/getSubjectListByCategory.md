# [GET] getSubjectListByCategory 取得開課清單

## API URL
> http://{domain}:{port}/apis/SubjectData/SubjectList/getSubjectListByCategory

## 傳入JSON
```json
{
    "category": "C1"
}
```
欄位名稱 | 型態 | 說明
-- | - | -
category | string | 帶入欲查詢的課程類別代碼，由 getCategories 取得

## 回傳JSON
```json
{  
   "status":0,
   "courses":[  
      {  
         "status":"課程已開始報名",
         "id":"C112_2",
         "content":"2019年第01次開 - C1 一、二課",
         "date":"2018/10/26",
         "time":"下午 14:30~17:30",
         "regTime":"2018/10/22~2018/11/30"
      },
      {  
         "status":"課程已開始報名",
         "id":"C134_2",
         "content":"2019年第01次開 - C1 三、四課",
         "date":"2018/10/27",
         "time":"下午 14:30~17:30",
         "regTime":"2018/10/22~2018/11/30"
      }
   ]
}
```

欄位名稱 | 型態 | 說明
-- | - | -
status | int | 處理結果狀態碼，0 為請求成功
courses | array | 存放所有課程資訊的陣列
status | string | 課程狀態 ['課程已開始報名', '課程已結束', '課程尚未開始']
id | string | 課程識別代碼
content | string | 課程名稱
date | string | 上課日期
time | string | 上課時間
regTime | string | 報名日期
