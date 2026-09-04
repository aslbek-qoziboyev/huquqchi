import { Law } from '../types/laws';

export const LAWS_DATA: Law[] = [
  {
    id: 'mehnat-kodeksi',
    title: 'O‘zbekiston Respublikasining Mehnat Kodeksi',
    shortTitle: 'Mehnat kodeksi',
    type: 'Kodeks',
    adoptedDate: '2022-10-28',
    status: 'Amalda',
    category: 'mehnat',
    sourceUrl: 'https://lex.uz/docs/6257288',
    articles: [
      {
        id: 'mk-art-151',
        number: '151',
        title: 'Foydalanilmagan yillik mehnat ta’tillari uchun kompensatsiya',
        content: 'Mehnat shartnomasi bekor qilinganda xodimga barcha foydalanilmagan yillik mehnat ta’tillari uchun pulli kompensatsiya to‘lanadi.'
      },
      {
        id: 'mk-art-161',
        number: '161',
        title: 'Mehnatga haq to‘lash muddatlari',
        content: 'Mehnatga haq to‘lash muddatlari jamoa shartnomasida yoki ichki mehnat tartibi qoidalarida belgilangan muddatlarda, har yarim oyda bir martadan kam bo‘lmagan miqdorda amalga oshiriladi.'
      },
      {
        id: 'mk-art-222',
        number: '222',
        title: 'Mehnat ta’tili davomiyligi',
        content: 'Xodimlarga har yili davomiyligi kamida yigirma to‘rt kalendar kun bo‘lgan yillik asosiy mehnat ta’tili beriladi.'
      },
      {
        id: 'mk-art-402',
        number: '402',
        title: 'Ayollar va oilaviy majburiyatlarni bajarish bilan mashg‘ul shaxslar uchun imtiyozlar',
        content: 'Homilador ayollar va uch yoshga to‘lmagan bolasi bor ayollar bilan tuzilgan mehnat shartnomasini ish beruvchining tashabbusi bilan bekor qilishga yo‘l qo‘yilmaydi, korxonaning butunlay tugatilish hollari bundan mustasno.'
      }
    ]
  },
  {
    id: 'istemolchi-qonun',
    title: 'O‘zbekiston Respublikasining “Iste’molchilarning huquqlarini himoya qilish to‘g‘risida”gi Qonuni',
    shortTitle: 'Iste’molchilar huquqlari to‘g‘risidagi qonun',
    type: 'Qonun',
    adoptedDate: '1996-04-26',
    status: 'Amalda',
    category: 'istemolchi',
    sourceUrl: 'https://lex.uz/docs/1620',
    articles: [
      {
        id: 'ih-art-4',
        number: '4',
        title: 'Iste’molchilarning asosiy huquqlari',
        content: 'Iste’molchilar tovar (ish, xizmat)lar, shuningdek ishlab chiqaruvchi (ijrochi, sotuvchi) to‘g‘risida to‘g‘ri va to‘liq ma’lumot olish, tovarning nosozligi tufayli yetkazilgan moddiy va ma’naviy zararni qoplash huquqiga egadir.'
      },
      {
        id: 'ih-art-13',
        number: '13',
        title: 'Tovarda nuqsonlar aniqlanganda iste’molchining huquqlari',
        content: 'Nuqsonli tovar sotilganda iste’molchi o‘z xohishiga ko‘ra quyidagilarni talab qilishga haqli: tovarni ayni shunday markadagi tovarga almashtirib berish; xarid narxini mutanosib ravishda kamaytirish; tovarning nuqsonlarini bepul bartaraf etish yoki xarajatlarni qoplash; shartnomani bekor qilib, ko‘rilgan zararni qoplash.'
      },
      {
        id: 'ih-art-18',
        number: '18',
        title: 'Maqbul sifatli tovarni almashtirib berish tartibi',
        content: 'Iste’molchi maqbul sifatli nooziq-ovqat tovarini sotib olgan kunidan e’tiboran o‘n to‘rt kun ichida ayni shunday tovarga almashtirib olishga, bunday tovar sotuvda bo‘lmasa, pulini qaytarib olishga haqli.'
      }
    ]
  }
];
