import { DocumentTemplate } from '../types/documents';

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'istemolchi-shikoyat',
    title: 'Iste’molchi shikoyat arizasi',
    description: 'Nosoz tovar, pulni qaytarmaslik yoki sifatsiz xizmat yuzasidan sotuvchiga yoziladigan rasmiy talabnoma.',
    category: 'istemolchi',
    fields: [
      { id: 'fullName', label: 'To‘liq ism-sharifingiz', type: 'text', placeholder: 'F.I.Sh.', required: true, value: '' },
      { id: 'address', label: 'Yashash manzilingiz', type: 'text', placeholder: 'Toshkent sh., Chilonzor tumani...', required: true, value: '' },
      { id: 'phoneNumber', label: 'Telefon raqamingiz', type: 'tel', placeholder: '+998 (90) 123-45-67', required: true, value: '' },
      { id: 'sellerName', label: 'Sotuvchi do‘kon/tashkilot nomi', type: 'text', placeholder: 'Sotuvchi MChJ', required: true, value: '' },
      { id: 'purchaseDate', label: 'Xarid qilingan sana', type: 'date', required: true, value: '' },
      { id: 'productName', label: 'Tovar yoki xizmat nomi', type: 'text', placeholder: 'Smartfon Samsung...', required: true, value: '' },
      { id: 'productPrice', label: 'Xarid summasi (so‘m)', type: 'text', placeholder: '4 000 000', required: true, value: '' },
      { id: 'defectDescription', label: 'Nuqson va muammoning qisqa tavsifi', type: 'textarea', placeholder: 'Ekranida nuqson bor, almashtirishmadi...', required: true, value: '' }
    ],
    previewTemplate: `
**TALABNOMA VA SHIKOYAT ARIZASI**

**Kimga:** {{sellerName}} rahbariyatiga
**Kimdan:** {{fullName}}
**Yashash manzili:** {{address}}
**Telefon:** {{phoneNumber}}

**ARIZA MAZMUNI:**

Men, {{fullName}}, {{purchaseDate}} kuni sizning do‘koningizdan {{productPrice}} so‘mga {{productName}} sotib oldim.

Biroq, foydalanish jarayonida unda jiddiy nuqsonlar aniqlandi: "{{defectDescription}}".

O‘zbekiston Respublikasining “Iste’molchilarning huquqlarini himoya qilish to‘g‘risida”gi Qonunining 13-moddasiga muvofiq, iste’molchi tovarda nuqsonlar aniqlanganda pulini qaytarib olishni yoki soziga almashtirishni talab qilishga haqli. Shuningdek, 18-moddaga binoan maqbul sifatli tovarni 14 kun ichida almashtirish imkoniyati mavjud.

**SHU SABABLI SIZDAN:**

1. Ushbu arizani ko‘rib chiqib, nuqsonli deb topilgan {{productName}} uchun to‘langan {{productPrice}} so‘m pulni qaytarishingizni yoki soziga almashtirishingizni so‘rayman.

Sana: ___________________
Imzo: ___________________
`
  },
  {
    id: 'mehnat-tatil-ariza',
    title: 'Mehnat ta’tili olish bo‘yicha ariza',
    description: 'Xodim tomonidan yillik asosiy pullik mehnat ta’tilini olish uchun yoziladigan ariza.',
    category: 'mehnat',
    fields: [
      { id: 'fullName', label: 'To‘liq ism-sharifingiz', type: 'text', placeholder: 'Soliyev B.R.', required: true, value: '' },
      { id: 'position', label: 'Lavozimingiz', type: 'text', placeholder: 'Yetakchi mutaxassis', required: true, value: '' },
      { id: 'companyName', label: 'Tashkilot nomi', type: 'text', placeholder: '"O‘zbekneftgaz" AJ', required: true, value: '' },
      { id: 'directorName', label: 'Rahbar ismi va lavozimi', type: 'text', placeholder: 'Bosh direktor Alimov S.A.', required: true, value: '' },
      { id: 'startDate', label: 'Ta’til boshlanish sanasi', type: 'date', required: true, value: '' },
      { id: 'daysCount', label: 'Ta’til kunlari soni', type: 'text', placeholder: '24', required: true, value: '24' }
    ],
    previewTemplate: `
**ARIZA**

**Kimga:** {{directorName}}
**Kimdan:** {{position}} — {{fullName}}
**Tashkilot:** {{companyName}}

Menga O‘zbekiston Respublikasi Mehnat Kodeksi 222-moddasiga asosan, {{startDate}} sanasidan boshlab jami {{daysCount}} kalendar kun muddatga navbatdagi yillik asosiy pullik mehnat ta’tilini berishingizni so‘rayman.

Sana: ___________________
Imzo: ___________________
`
  }
];
