### 🧭 TaskSphere – Görev Yönetim Sistemi

TaskSphere, kullanıcıların kişisel projelerini ve bu projelere ait görevlerini yönetmelerini sağlayan bir görev takip platformudur.  
Sade, güvenli ve modüler bir NestJS mimarisi üzerine inşa edilmiştir .

---

### ⚙️ Kullanılan Teknolojiler

| Katman                           | Teknoloji                                        |
| -------------------------------- | ------------------------------------------------ |
| **Backend Framework**            | [NestJS](https://nestjs.com/) (TypeScript)       |
| **ORM / Database**               | [Sequelize](https://sequelize.org/) + PostgreSQL |
| **Authentication**               | JWT (Server-side token validation)               |
| **Documentation**                | Compodoc                                         |
| **Testing**                      | Jest (planlanıyor)                               |
| **Runtime Env**                  | Node.js v18+                                     |
| **Containerization (opsiyonel)** | Docker                                           |

---

### 🧱 Uygulama Katmanları

- **Controller** → HTTP isteklerini karşılar (`/project`, `/task`).
- **Service** → İş kurallarını uygular, veri mantığını yönetir.
- **Repository** → Veritabanı işlemlerini yürütür (Sequelize).
- **Entity (Model)** → DB tablolarını temsil eder.
- **Guard** → Kimlik doğrulama ve yetkilendirme kontrolü yapar.

---

### 🧠 Temel Akış

1. Kullanıcı kayıt olur veya giriş yapar.
2. JWT token server-side olarak yönetilir.
3. Kullanıcı bir proje oluşturabilir (**en fazla 1 proje**).
4. Proje içinde görevler oluşturabilir, tamamlayabilir veya silebilir.
5. Tüm istekler guard katmanlarından geçer (`GuardJwtAuth`, `GuardShouldBeOwnerOfReq`).

---

### ⚖️ İş Kuralları (Domain Rules)

#### 👤 Kullanıcı

- Aynı e-posta ile ikinci kayıt yapılamaz.
- Kullanıcı silindiğinde tüm projeleri ve görevleri de silinir.

#### 🧱 Proje

- Her kullanıcı **en fazla 1 proje** oluşturabilir.
- Kullanıcı zaten bir projeye sahipse `409 Conflict` hatası döner.
- Projeler yalnızca sahibi tarafından güncellenebilir veya silinebilir.
- Proje silinirse, ilgili görevler de otomatik silinir.

#### 🗒️ Görev (Task)

- Her görev bir projeye ait olmalıdır.
- Görev sadece proje sahibi tarafından oluşturulabilir.
- Görev durumları: `pending`, `done`.
- Görev silme / düzenleme yetkisi sadece proje sahibindedir.

#### 🔐 Güvenlik

- Tüm isteklerde `GuardJwtAuth` çalışır.
- Proje/görev değişikliklerinde `GuardShouldBeOwnerOfReq` devrededir.
- Token doğrulama işlemi **sunucu tarafında** yapılır, `localStorage` kullanılmaz.

---

### 🗄️ Veritabanı Yapısı

```
User (1) ─── (1) Project (1) ─── (*) Task
```

| Entity      | Field                                     | Type  |
| ----------- | ----------------------------------------- | ----- |
| **User**    | id, email, password                       | PK    |
| **Project** | id, ownerId (FK→User), title, description | PK+FK |
| **Task**    | id, projectId (FK→Project), title, status | PK+FK |

---

### 🧭 Gelecek Geliştirmeler

- Çoklu proje desteği (1 kullanıcı → N proje)
- Takım üyeliği sistemi (proje paylaşımı)
- Görev yorumları ve dosya ekleri
- WebSocket ile gerçek zamanlı güncellemeler
- Jest testleri & CI/CD pipeline

---

### 🚀 Çalıştırma (Local)

```bash
# Kurulum
npm install

# Ortam değişkenlerini ayarla
cp .env.example .env

# Geliştirme
npm run start:dev


http://localhost:3000/
```
