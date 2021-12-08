## CN466_final

งานชิ้นนี้เป็นส่วนหนึ่งของวิชา CN466 

โดยใช้ Web Applicaition เพื่อรับค่า acceleration x,y,z เพื่อนำไปตรวจสอบว่าสถานะตอนนี้ผู้ใช้กำลังอยู่ในสถานะ stay หรือ move จากนั้นไฟที่อยู่ที่ cucumber board จะเปลี่ยนสีตามสถานะ

(stay:green , move:red)

และสามารถใช้ linebot ในการตรวจสอบสถานะล่าสุดของผู้ใช้งาน Web Application และ เวลาทั้งหมดที่อยู่ในสถานะ stay และ move

# Arduino

ใช้ Cucumberเปลี่ยนสีตาม actionต่างๆ ที่ได้มาจากการpredict ของ edge_impulse

[link อธิบาย arduino](https://github.com/Rathapol-Putharaksa/CN466_final/tree/main/arduino)
  
# WebAPI

ใช้ motion device สำหรับส่ง accelerometer นำไปให้ edge_impulse โดยจะส่งค่าทุกๆ 5 วินาที

[link อธิบาย WebAPI EdgeImpulse](https://github.com/Rathapol-Putharaksa/CN466_final/tree/main/webAPIandEdge)


# edge_impulse 

ใช้ train accelerometer x,y,z สำหรับตรวจว่าอยู่ในสถานะอยู่นิ่ง หรือ ขยับ

[link อธิบาย WebAPI EdgeImpulse](https://github.com/Rathapol-Putharaksa/CN466_final/tree/main/webAPIandEdge)

# linebot 

ใช้ตรวจสอบ สถานะปัจจุบัน และตรวจสอบเวลาทั้งหมดที่ขยับและหยุดนิ่ง

[link สำหรับอธิบาย linebot LIFF](https://github.com/Rathapol-Putharaksa/CN466_final/tree/main/lineBot)

# LIFF

ใช้ liff message เพื่อสามารถใช้line bot ได้สะดวกขึ้น

[link สำหรับอธิบาย linebot LIFF](https://github.com/Rathapol-Putharaksa/CN466_final/tree/main/lineBot)

# database

ใช้ firebase realtime database เพื่อที่จะได้ข้อมูล ณ เวลานั้นทันที

![acel](https://user-images.githubusercontent.com/61156321/145177510-b44cd11a-1e17-453a-b3d9-f9dabeeca547.png)



---


## CN466_final

this is my final project in CN466

I use Web Application for recieve acceleration x,y,z for check user status is stay or move then led in cucumber board will change by status

(stay:green , move:red)

and you can use linebot for check lastest status and time in status.


# Arduino

I use Cucumber board for change LED for value from prediction by edge_impluse

[link for explain arduino](https://github.com/Rathapol-Putharaksa/CN466_final/tree/main/arduino)
  
# WebAPI

I use device motion for recieve acceleration x,y,z 


[link for explain WebAPI EdgeImpulse](https://github.com/Rathapol-Putharaksa/CN466_final/tree/main/webAPIandEdge)


# edge_impulse 

I use edge impulse for predict status(stay,move) from acceleration x,y,z.


[link for explain WebAPI EdgeImpulse](https://github.com/Rathapol-Putharaksa/CN466_final/tree/main/webAPIandEdge)

# linebot 

I use linebot for check lastest status and time for status.


[link for explain linebot LIFF](https://github.com/Rathapol-Putharaksa/CN466_final/tree/main/lineBot)

# LIFF

I use LIFF for send message to linebot.


[link for explain linebot LIFF](https://github.com/Rathapol-Putharaksa/CN466_final/tree/main/lineBot)

# database

ใช้ firebase realtime database เพื่อที่จะได้ข้อมูล ณ เวลานั้นทันที

![acel](https://user-images.githubusercontent.com/61156321/145177510-b44cd11a-1e17-453a-b3d9-f9dabeeca547.png)

