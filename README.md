# 📝 MyNotes App

MyNotes App adalah aplikasi catatan sederhana berbasis web yang aku buat sebagai latihan sekaligus project CRUD menggunakan React.  
Aplikasi ini berjalan di **localhost** dan menyimpan data menggunakan **localStorage** (belum pakai backend).

Project ini fokus ke:
- CRUD (Create, Read, Update, Delete)
- UI sederhana tapi rapi
- Latihan logic React & state management

---

## 🚀 Tech Stack
Project ini dibuat menggunakan:
- **Vite + React**
- **Tailwind CSS**
- **DaisyUI (theme: cupcake)**
- **React Icons**
- **pnpm** sebagai package manager

---

## ✨ Fitur Utama
- Tambah catatan lewat popup modal
- Lihat catatan dalam mode **Grid** & **List**
- Edit catatan menggunakan popup
- Preview catatan (scrollable)
- Hapus catatan dengan konfirmasi
- Data tersimpan di **localStorage**
- Responsive & clean UI

---

## 💾 Penyimpanan Data
Semua data catatan disimpan di:
localStorage

Key yang digunakan:
notesData


Karena masih berbasis frontend-only, data akan tetap ada selama localStorage belum dihapus.

---
📄 Dokumentasi Tambahan

Dokumentasi proses pengerjaan & penjelasan detail ada di link berikut:
👉https://docs.google.com/document/d/1hFzJGoGMx7Zq1lBaMI8qzI0Mb4flcbLUSvOhoFaeGTw/edit?usp=sharing
---

## 🖥️ Cara Menjalankan Project (Localhost)
Clone repo ini lalu jalankan:

```bash
pnpm install
pnpm run dev

Setelah itu buka:
http://localhost:5173
