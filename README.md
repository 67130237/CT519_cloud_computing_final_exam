# Final Exam Web App (CT519 - Cloud Computing)

> ระบบจัดการและแสดงผลงานวิจัยของนักศึกษา พร้อมฟีเจอร์จัดการรายการอ้างอิง และแสดง PDF อย่างเรียบง่าย ใช้เทคโนโลยี Web + Docker + Cloud

---

## 🔍 Overview

เว็บแอปพลิเคชันนี้สร้างขึ้นเพื่อประกอบการสอบ Final วิชา CT519 Cloud Computing  
ออกแบบให้ Minimal ใช้งานง่าย รันได้ทั้งในเครื่องและบน Cloud

**📍 Production URL:**  
🔗 [https://FinalExam.iammark.online](https://FinalExam.iammark.online)

---

## ✨ Features

- 🏠 Landing Page แสดงชื่อ, รหัสนักศึกษา, GitHub Repo
- 👤 About Page พร้อมรูปภาพและข้อมูลส่วนตัว
- 📘 Research Page แสดงแนวทางวิจัย + อ้างอิง
- 📂 จัดการอ้างอิง: เพิ่ม / ลบ / แก้ไข ชื่อบทความ IEEE
- 📄 รองรับ PDF Upload พร้อมตั้งชื่ออัตโนมัติ (`ref{id}.pdf`)
- 🔎 Preview PDF ในแท็บใหม่ (ไม่ดาวน์โหลด)
- ➕ Toggle Form แสดง/ซ่อนฟอร์มแบบ Minimal
- 📦 Docker + MySQL พร้อมไฟล์ `init.sql` ตั้งต้น

---

## 🚀 Deployment Architecture

### Deployment Flow: From Local Dev to Production

```
[Local Dev + Dockerfile + Docker Compose] 
                 |
                 v 
        ┌───────────────────────────────────────────────┐
        │ GitHub Repo                                   │
        │ https://github.com/67130237/CT519_cloud_computing_final_exam │
        └───────────────────────────────────────────────┘ 
                 |
                 v
        ┌─────────────────────┐
        │   AWS EC2 Instance  │  ← (Ubuntu + Docker + Docker Compose)
        └─────────────────────┘
                 |
                 v
        Elastic IP (e.g. 13.xx.xx.xx)  
                 |
                 v
        ┌────────────────┐
        │   Cloudflare   │  ← (DNS Mapping + SSL passthrough)
        └────────────────┘
                 |
                 v
🌐 **Final URL** → https://FinalExam.iammark.online

---

## ⚙️ Tech Stack

- Frontend: HTML + JS + CSS (Minimal)
- Backend: Node.js + Express
- Database: MySQL
- Deployment: Docker Compose
- Cloud Infra: AWS EC2 + Elastic IP + Cloudflare DNS

---

### ✅ Clone Repo

```bash
git clone https://github.com/67130237/CT519_cloud_computing_final_exam.git
cd CT519_cloud_computing_final_exam
