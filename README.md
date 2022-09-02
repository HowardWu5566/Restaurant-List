# 餐廳清單

此專案提供使用者收藏喜案的餐廳，減少思考用餐地點的時間

## 功能列表
* 使用者可以在首頁概覽所有餐廳的：

  * 照片
  * 名稱
  * 分類
  * 評分

* 使用者可以多種方式搜尋餐廳：

  * 地區
  * 餐廳名稱或類別
  * 評分

* 使用者可以點選個別餐廳查看詳細資訊，包含：

  * 類別
  * 地址
  * 電話
  * 描述
  * 圖片

* 使用者點選地址旁的小圖標 <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/location-arrow.svg" width="15" height="15"> 可連結到 Google Map

* 使用者可自行新增、編輯餐廳詳細資訊，也可刪除餐廳

## 畫面預覽
![image](https://user-images.githubusercontent.com/110580842/188071083-d98224cf-4b69-4e1f-9745-3c67fbf3d0b8.png)
![image](https://user-images.githubusercontent.com/110580842/188071746-eb9e1ef5-2aee-4281-a6b8-39ecbf86d16f.png)
![image](https://user-images.githubusercontent.com/110580842/188071640-2caba0fe-dabc-4fa2-9192-252bfae52d5d.png)


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
4. 設定暫時環境變數以連接MongoDB資料庫，請在終端機輸入：
```
export MONGODB_URI_RESTAURANTLIST="mongodb+srv://您的帳號:您的密碼@cluster0.zv7iixt.mongodb.net/todo-list?retryWrites=true&w=majority"
```
5. （非必要）匯入種子資料，請在終端機輸入：
```
npm run seed
```
&#8195;匯入後請在終端機按 Ctrl+C 再繼續下面的步驟

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
