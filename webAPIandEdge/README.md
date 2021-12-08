## WebAPI

ใช้ web API เป็น device motion รับค่า acceleration x,y,z เมื่ิอรับค่าครบ 5 วินาที จะส่งค่า acceleration x,y,z ไปเก็บไว้ที่ firebase realtime database 

![API](https://user-images.githubusercontent.com/61156321/145181054-b98b98de-7563-4b57-b8e9-bfb4c767022f.jpg)


## edgeImpulse

ดึงค่าล่าสุดจาก firebase realtime database จากนั้นให้ edge impulse มาpredictว่าอยู่ในสถานะ stay หรือ move และสร้าง API สำหรับดึงเวลาทั้งหมดที่ใช้ในสถานะต่างๆ และ API สำหรับตรวจสอบสถานะปัจจุบัน


# API สำหรับตรวจสอบสถานะปัจจุบัน

<img width="1007" alt="Screen Shot 2564-12-08 at 16 17 07" src="https://user-images.githubusercontent.com/61156321/145181998-d6edcb2d-b6fa-4d64-9740-247d4c6c5afb.png">

# API สำหรับดึงเวลาทั้งหมด

<img width="1008" alt="Screen Shot 2564-12-08 at 16 17 51" src="https://user-images.githubusercontent.com/61156321/145182134-7a9984a7-0008-4345-9bd3-4a2249d2c0e1.png">


## WebAPI

I use devicemotion in webAPI for recieve acceleration x,y,z and every 5 second Web application will send acceleration x,y,z to firebase realtime database.

![API](https://user-images.githubusercontent.com/61156321/145181054-b98b98de-7563-4b57-b8e9-bfb4c767022f.jpg)


## edgeImpulse

EdgeImpulse will query lastest acceleration x,y,z from firebase realtime database for predict status(stay,move) and create API for query time in status stay and move

and API for query lastest status

# API for quert lastest status

<img width="1007" alt="Screen Shot 2564-12-08 at 16 17 07" src="https://user-images.githubusercontent.com/61156321/145181998-d6edcb2d-b6fa-4d64-9740-247d4c6c5afb.png">

# API for query time

<img width="1008" alt="Screen Shot 2564-12-08 at 16 17 51" src="https://user-images.githubusercontent.com/61156321/145182134-7a9984a7-0008-4345-9bd3-4a2249d2c0e1.png">
