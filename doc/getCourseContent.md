# [GET] getCourseContent 取得課程詳細內容

## API URL
> http://{domain}:{port}/apis/SubjectData/SubjectEdit/getCourseContent

## 傳入JSON
```json
data = {
    "type": 0,
    "categoryId": "C1",
    "sid": 2
}
```

欄位名稱 | 型態 | 說明
- | - | -
type | bit | 取得資料的用途，0 為新增，會回傳上一次開課的資訊；1 為修改，會回傳欲修改的開課資訊
categoryId | string | 課程類別代碼，用途為`新增`才需帶入
sid | int | 課程流水號，用途為`修改`才需帶入

## 回傳JSON
```json

{  
   "status":0,
   "course":{  
      "category":"C1",
      "type":"修改",
      "year":"2019",
      "count":"01",
      "regCondition":"2018年1月~2018年12月來的新朋友，或是還沒上過的會友。",
      "classes":[  
         {  
            "categoryId":"C112",
            "title":"C1 一、二課",
            "isOpen":true,
            "date":"2018/10/26",
            "amOrPm":"下午",
            "time":"14:30~17:30"
         },
         {  
            "categoryId":"C134",
            "title":"C1 三、四課",
            "isOpen":true,
            "date":"2018/10/27",
            "amOrPm":"下午",
            "time":"14:30~17:30"
         }
      ],
      "location":"江子翠行道會主會堂",
      "regStartTime":"2018/10/22",
      "regEndTime":"2018/11/30",
      "memo":"備註"
   }
}
```

欄位名稱 | 型態 | 說明
- | - | -
status | int | 處理結果狀態碼，0 為請求成功
course | Object | 
category | string | 課程類別名稱
type | string | 取得資料的用途
year | string | 開課年份
count | string | 當年開課次數
regCondition | string | 報名條件
classes | array | 課堂列表
categoryId | string | 課堂代碼
title | string | 課堂名稱
isOpen | bool | 是否開啟該課堂
date | string | 上課日期
amOrPm | string | 上課時段 ['上午', '下午']
time | string | 上課時間
location | string | 上課地點
regStartTime | string | 報名開始日期
regEndTime | string | 報名結束日期
memo | string | 備註