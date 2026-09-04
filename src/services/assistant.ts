import { Message } from '../types/assistant';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const AssistantService = {
  async generateResponse(userMessage: string): Promise<Message> {
    await delay(1500); // Simulate realistic AI response compilation (RAG search + Generation)
    
    const text = userMessage.toLowerCase();
    
    // Keyword analysis matching requirements
    if (text.includes('telefon') || text.includes('sotuvchi') || text.includes('nosoz') || text.includes('pulimni') || text.includes('do‘kon') || text.includes('shikoyat') || text.includes('qaytar')) {
      return {
        id: 'msg-' + Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: `Iste’molchi huquqlari bo‘yicha tahlil natijalari tayyorlandi.`,
        createdAt: new Date(),
        structuredContent: {
          muammo: "Sotuvchining sifatsiz (nosoz) telefon uchun pulni qaytarib berishdan yoki uni soziga almashtirib berishdan bosh tortayotganligi.",
          huquqlar: [
            "Tovarda nuqsonlar aniqlanganda uni ayni shunday toza tovarga almashtirish yoki xarid narxini qaytarib olish (Qonunning 13-moddasi).",
            "Tovarni sotib olingan kundan boshlab 14 kun ichida maqbul sifatli bo‘lsa ham almashtirish (agar ishlatilmagan va hujjati bo‘lsa, Qonun 18-modda)."
          ],
          huquqiyAsos: {
            qonunNomi: "Iste’molchilarning huquqlarini himoya qilish to‘g‘risida”gi Qonun",
            modda: "13 va 18-moddalar",
            tekshirishZarur: false
          },
          nimaQilishKarak: [
            "Sotuvchiga yozma ravishda da’vo arizasi (talabnoma) tayyorlash va topshirish. Arizani 2 nusxada yozib, bir nusxasiga qabul qilgani haqida imzo qo‘ydirib oling.",
            "Sotuvchi arizani ko‘rib chiqishi uchun qonun bo‘yicha 3 kun muddat bering.",
            "Agar muammo hal qilinmasa, Iste’molchilar huquqlarini himoya qilish agentligiga yoxud fuqarolik sudiga murojaat qiling."
          ],
          hujjatYaratishCTA: {
            templateId: 'istemolchi-shikoyat',
            buttonText: 'Iste’molchi shikoyat arizasini yaratish'
          }
        },
        sources: [
          { id: 'src-1', title: 'Iste’molchilar huquqlari to‘g‘risidagi qonun', article: '13-modda. Tovarda nuqsonlar aniqlanganda iste’molchining huquqlari' },
          { id: 'src-2', title: 'Iste’molchilar huquqlari to‘g‘risidagi qonun', article: '18-modda. Maqbul sifatli tovarni almashtirib berish tartibi' }
        ]
      };
    } else if (text.includes('ta’til') || text.includes('tatil') || text.includes('ishdan') || text.includes('kompensatsiya') || text.includes('shartnoma') || text.includes('mehnat') || text.includes('ish beruvchi') || text.includes('xodim')) {
      return {
        id: 'msg-' + Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: `Mehnat huquqi bo‘yicha tahlil natijalari tayyorlandi.`,
        createdAt: new Date(),
        structuredContent: {
          muammo: "Xodimning yillik asosiy mehnat ta’tilini olishga bo‘lgan huquqi yoki tegishli kompensatsiyalar masalasi.",
          huquqlar: [
            "Har yili davomiyligi kamida 24 kalendar kun bo‘lgan asosiy pullik mehnat ta’tiliga ega bo‘lish (Mehnat kodeksining 222-moddasi).",
            "Mehnat shartnomasi bekor qilinganda barcha foydalanilmagan ta’tillar uchun pulli kompensatsiya olish (Mehnat kodeksining 151-moddasi)."
          ],
          huquqiyAsos: {
            qonunNomi: "O‘zbekiston Respublikasining Mehnat Kodeksi",
            modda: "222 va 151-moddalar",
            tekshirishZarur: false
          },
          nimaQilishKarak: [
            "Ish beruvchi (rahbariyat) nomiga navbatdagi mehnat ta’tilini berish to‘g‘risida rasmiy yozma ariza topshiring.",
            "Arizani rejalashtirilgan ta’tildan kamida 15 kun oldin topshirish tavsiya etiladi (agar ta’tillar jadvali bo‘lmasa).",
            "Ta’til pullari ta’til boshlanishidan kamida 3 kun oldin to‘lanishi shart ekanligini nazorat qiling."
          ],
          hujjatYaratishCTA: {
            templateId: 'mehnat-tatil-ariza',
            buttonText: 'Mehnat ta’tili arizasini yaratish'
          }
        },
        sources: [
          { id: 'src-3', title: 'Mehnat kodeksi', article: '222-modda. Yillik asosiy mehnat ta’tilining davomiyligi' },
          { id: 'src-4', title: 'Mehnat kodeksi', article: '151-modda. Foydalanilmagan yillik mehnat ta’tillari uchun kompensatsiya' }
        ]
      };
    }

    // Default response when no specific match is found (with the required warnings)
    return {
      id: 'msg-' + Math.random().toString(36).substring(2, 9),
      role: 'assistant',
      content: `Kiritilgan muammo bo‘yicha aniq huquqiy yechimni taqdim etish uchun qo‘shimcha ma’lumotlar kerak bo‘lishi mumkin.`,
      createdAt: new Date(),
      structuredContent: {
        muammo: "Taqdim etilgan savol bo‘yicha tizimda aniq qonunchilik moddalari topilmadi.",
        huquqlar: [
          "O‘zbekiston Respublikasi Konstitutsiyasiga muvofiq, har bir shaxs o‘z huquq va erkinliklarini sud orqali himoya qilish, davlat organlariga murojaat qilish huquqiga ega."
        ],
        huquqiyAsos: {
          qonunNomi: "Aniq huquqiy asosni tasdiqlash kerak",
          modda: "Noma’lum",
          tekshirishZarur: true
        },
        nimaQilishKarak: [
          "Savolingizni aniqroq (qaysi sohada, qanday muammo ekanligini) yozishga harakat qiling.",
          "Kerakli hujjatlarni tayyorlash uchun 'Hujjatlar' bo‘limidan tegishli shablonni qidirib ko‘ring.",
          "Platforma advokat yoki sud o‘rnini bosmasligini inobatga olgan holda, zarur bo‘lsa professional huquqshunos yoki litsenziyalangan advokatga murojaat qiling."
        ]
      }
    };
  }
};
