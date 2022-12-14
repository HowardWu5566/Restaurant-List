# 餐廳清單

此專案提供使用者收藏喜案的餐廳，減少思考用餐地點的時間

## 功能列表

- 使用者可以註冊帳號並登入，或以 Facebook 登入


- 登入後，使用者可以在首頁概覽所有餐廳的：

  - 照片
  - 名稱
  - 分類
  - 評分

- 使用者可以多種方式搜尋餐廳：

  - 餐廳名稱
  - 類別
  - 評分
  - 地區

- 使用者可以點選個別餐廳查看詳細資訊，包含：

  - 類別
  - 地址
  - 電話
  - 描述
  - 圖片

- 使用者可以下列方式排序餐廳：

  - 店名遞增
  - 店名遞減
  - 類別
  - 地區

- 使用者點選地址旁的小圖標 <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/location-arrow.svg" width="15" height="15"> 可連結到 Google Map

- 使用者可自行新增、編輯餐廳詳細資訊，也可刪除餐廳

## 畫面預覽

![image](https://user-images.githubusercontent.com/110580842/198890435-db02bda5-9010-4abf-a597-826d7c187434.png)
![image](https://user-images.githubusercontent.com/110580842/198890304-a543e7c4-50d7-4709-a32c-71a80d7aa993.png)
![image](https://user-images.githubusercontent.com/110580842/198890379-d1095271-5770-4d0d-a926-ff24117fd6dc.png)

## 安裝

1. Clone 此專案至本機電腦，打開 terminal 至欲存放專案之資料夾，輸入下列代碼

```
git clone https://github.com/HowardWu5566/Restaurant-List.git
```

2. 進入專案資料夾，請在終端機輸入：

```
cd Restaurant-List
```

3. 安裝 npm 套件，請在終端機輸入：

```
npm install
```

4. 依據 .env.example 建立 .env 檔案

5. 匯入種子資料，請在終端機輸入：

```
npm run seed
```

6. 執行專案，請在終端機輸入：

```
npm run dev
```

7. 輸入下列代碼於**網址列**即可使用

```
localhost:3000
```

8. 要停止專案請在終端機按 Ctrl+C

## 開發者

Howard Wu