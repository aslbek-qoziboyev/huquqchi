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

---

## 7. Mobil Ilova Arxitekturasi (Android)

Platformaning mobil versiyasi zamonaviy **Capacitor + Native Android (Gradle)** integratsiyasi asosida ishlab chiqilgan bo‘lib, `/android` papkasida to‘liq Android Studio loyihasiga ega.

### Mobil Imkoniyatlar:
- **App ID:** `uz.meninghuquqim.app`
- **Native Android loyihasi:** `/android` papkasida Gradle loyihasi (Target SDK 34, Min SDK 24).
- **Apparat Back Button:** Android hardware orqaga qaytish tugmasi Vue Router bilan to‘liq integratsiyalashgan (bosh sahifada ilovadan chiqish, ichki sahifalarda oldingi sahifaga qaytish).
- **Status Bar:** Mobil qurilma holat paneli ilova mavzusiga mos ravishda avtomatik boshqariladi (`@capacitor/status-bar`).
- **Push Bildirishnomalar:** Qonunchilik yangiliklari va ariza holati o‘zgargani haqida xabar berish servisi (`@capacitor/push-notifications`).
- **Tarmoq nazorati:** Internet aloqasi holatini avtomatik kuzatish (`@capacitor/network`).

### Mobil Ilovani Ishga Tushirish va Sinxronlash:
```bash
# Web kodni build qilib, Android loyihasiga sinxronlash:
npm run android:sync

# Android Studio'da ochish:
npm run android:open

# Android APK / AAB build qilish (Gradle orqali):
cd android
./gradlew assembleDebug
```
Natijada `android/app/build/outputs/apk/debug/app-debug.apk` fayli yaratiladi.
