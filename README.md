# Mening Huquqim — Raqamli Huquqiy Yordam Platformasi

**Mening Huquqim** — O‘zbekiston fuqarolariga o‘z huquqlarini tushunish, tegishli qonun va moddalarni topish, huquqiy muammolarni AI yordamida tahlil qilish va talabnoma, shikoyat, ariza kabi rasmiy yuridik hujjatlarni avtomatik shakllantirishda ko‘maklashuvchi zamonaviy raqamli platforma.

---

## 1. Asosiy Imkoniyatlar

- **AI Huquqiy Maslahatchi:** Fuqaro muammosini oddiy so‘zlar bilan yozadi. Sun’iy intellekt tizimi qonuniy asos, huquqlar tahlili va bosqichma-bosqich harakatlar rejasini taqdim etadi.
- **Rasmiy Qonunchilik Bazasi (Lex.uz):** Kodekslar va qonunlar bo‘yicha tezkor qidiruv, 12 ta huquqiy mavzu filtrlari, moddalar matnidan nusxa olish va saqlab qo‘yish (bookmarks).
- **Yuridik Hujjatlar Generatori:** Tayyor andazalar (Iste’molchi shikoyat arizasi, Mehnat ta’tili arizasi va boshqalar), real-vaqt rejimida jonli ko‘rib chiqish (live preview), DOCX va PDF eksporti.
- **Foydalanuvchi Shaxsiy Kabineti:** So‘nggi savollar tarixi, saqlangan qonunlar, shakllantirilgan arizalar, sozlamalar va qorong‘i mavzu (Dark Mode).
- **Moslashuvchan Mobil Interfeys:** Mobil brauzerlarda qulay pastki menyu (Mobile Bottom Navigation) orqali to‘liq ilova darajasidagi tajriba.

---

## 2. Texnologiyalar Steki

- **Asosiy freymvork:** [Vue.js 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Dasturlash tili:** [TypeScript](https://www.typescriptlang.org/)
- **Boshqaruv va qadash:** [Vite 5](https://vitejs.dev/)
- **Holat boshqaruvi (State Management):** [Pinia](https://pinia.vuejs.org/)
- **Marshrutlash (Routing):** [Vue Router 4](https://router.vuejs.org/)
- **Dizayn va uslublar:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Belgilar (Icons):** [Lucide Vue Next](https://lucide.dev/)

---

## 3. Loyiha Arxitekturasi

```
src/
├── assets/             # Statik assetlar va tasvirlar
├── components/         # Qayta ishlatiluvchi UI komponentlar
│   ├── common/         # Spinner, EmptyState, Badge va b.
│   └── layout/         # AppNavbar, AppFooter, MobileBottomNav
├── constants/          # Qonunlar bazasi, toifalar, hujjat shablonlari
├── router/             # Vue Router konfiguratsiyasi va Auth guardlar
├── services/           # Backend integratsiyasi uchun servis qatlami (API Abstraction)
│   ├── assistant.ts    # AI yordamchi tahlil servisi
│   ├── auth.ts         # Autentifikatsiya va seanslar
│   ├── documents.ts    # Hujjat generatsiyasi servisi
│   └── laws.ts         # Qonunlar qidiruvi va filtrlash
├── stores/             # Pinia do‘konlari (auth, assistant, laws, documents)
├── types/              # TypeScript interfeyslari va turlari
└── views/              # Asosiy sahifalar
    ├── auth/           # Login, Register, ForgotPassword, ResetPassword, Verify
    ├── AssistantView   # AI Huquqiy Yordamchi chat
    ├── DashboardView   # Foydalanuvchi shaxsiy kabineti
    ├── DocumentCreate  # Hujjat to‘ldirish va jonli preview
    ├── DocumentsView   # Shablonlar va saqlangan hujjatlar
    ├── LandingView     # Bosh sahifa (Hero, Imkoniyatlar, Mavzular, FAQ)
    ├── LawDetailsView  # Qonun moddalari va manbalar
    ├── LawsView        # Qonunlar qidiruvi
    └── ProfileView     # Foydalanuvchi profili va sozlamalar
```

---

## 4. O‘rnatish va Ishga Tushirish

### Talablar
- Node.js: `>= 18.0.0`
- npm: `>= 9.0.0`

### 1. Bog‘liqliklarni o‘rnatish:
```bash
npm install
```

### 2. Development serverini ishga tushirish:
```bash
npm run dev
```
Dastur odatda `http://localhost:5173` manzilida ishga tushadi.

### 3. Production uchun build qilish:
```bash
npm run build
```

### 4. Build qilingan ilovani tekshirish:
```bash
npm run preview
```

---

## 5. Muhit O‘zgaruvchilari (Environment Variables)

`.env.example` faylidan `.env` nusxasini yarating:
```bash
cp .env.example .env
```

Kalitlar:
- `VITE_APP_TITLE`: Ilova sarlavhasi
- `VITE_API_BASE_URL`: Kelgusi REST / GraphQL API manzili
- `VITE_LEX_UZ_INTEGRATION_URL`: Rasmiy huquqiy axborot portali integratsiyasi

---

## 6. Xavfsizlik Tamoyillari

- Foydalanuvchi ma’lumotlari XSS xavfidan xoli shaklda render qilinadi.
- Maxfiy kalitlar va parollar frontend kodida saqlanmaydi.
- Autentifikatsiya va sessiyalar himoyalangan tokenlar orqali boshqariladi.
- Huquqiy eslatmalar har bir bo‘limda ko‘rsatilib, advokat yoki sud o‘rnini bosmasligi ochiq bildirilgan.

---

## 7. Kelgusi Rejalar: Mobil Ilova Arxitekturasi (Phase 2)

Foydalanuvchi tomonidan tasdiqlangandan so‘ng boshlanadigan Phase 2 quyidagilarni o‘z ichiga oladi:
- **Mobile Stack:** Capacitor yoki React Native / Flutter yordamida iOS va Android ilovalari.
- **Oflayn Rejim:** Qonunlar moddalari va arizalar shablonlarini oflayn keshda saqlash (SQLite / IndexedDB).
- **Push Bildirishnomalar:** Huquqiy o‘zgarishlar va murojaat javoblari haqida tezkor xabarnomalar.
- **Biometriya:** Touch ID / Face ID orqali xavfsiz tizimga kirish.
