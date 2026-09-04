export interface LegalCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const LEGAL_CATEGORIES: LegalCategory[] = [
  {
    id: 'mehnat',
    name: 'Mehnat huquqi',
    icon: 'Briefcase',
    description: 'Ishga kirish, mehnat shartnomalari, ish vaqti, ta’tillar va ishdan bo‘shatish masalalari.'
  },
  {
    id: 'istemolchi',
    name: 'Iste’molchilar huquqi',
    icon: 'ShoppingCart',
    description: 'Sifatli mahsulot va xizmatlar olish, qaytarish, nosoz tovarlar va kafolat huquqlari.'
  },
  {
    id: 'fuqarolik',
    name: 'Fuqarolik huquqi',
    icon: 'Scale',
    description: 'Bitimlar, shartnomalar, zarar yetkazish, qarz majburiyatlari va mulkiy munosabatlar.'
  },
  {
    id: 'oila',
    name: 'Oila huquqi',
    icon: 'Heart',
    description: 'Nikoh shartnomasi, ajrashish, aliment, vasiylik va farzandlikka olish masalalari.'
  },
  {
    id: 'mamuriy',
    name: 'Ma’muriy huquq',
    icon: 'Shield',
    description: 'Davlat organlari bilan munosabatlar, jarimalar va ma’muriy huquqbuzarliklar.'
  },
  {
    id: 'uy-joy',
    name: 'Uy-joy huquqi',
    icon: 'Home',
    description: 'Mulkni ijaraga berish, sotib olish, propiska, kommunal xizmatlar va uy-joy nizolari.'
  },
  {
    id: 'talim',
    name: 'Ta’lim huquqi',
    icon: 'GraduationCap',
    description: 'Bog‘chalar, maktablar, oliy o‘quv yurtlaridagi huquqlar va kontrakt masalalari.'
  },
  {
    id: 'soliq',
    name: 'Soliq masalalari',
    icon: 'Coins',
    description: 'Jismoniy va yuridik shaxslar soliqlari, soliq imtiyozlari va deklaratsiyalar.'
  },
  {
    id: 'tadbirkorlik',
    name: 'Tadbirkorlik',
    icon: 'Award',
    description: 'Tadbirkorlikni ro‘yxatdan o‘tkazish, litsenziyalar, tekshirishlar va biznes huquqlari.'
  },
  {
    id: 'yol-harakati',
    name: 'Yo‘l harakati',
    icon: 'Car',
    description: 'Qoidabuzarliklar, jarimalar, YTH, sug‘urta va haydovchilik guvohnomalari.'
  },
  {
    id: 'internet',
    name: 'Internet va raqamli huquqlar',
    icon: 'Globe',
    description: 'Shaxsiy ma’lumotlar himoyasi, kiberjinoyat, mualliflik huquqi va e-tijorat.'
  },
  {
    id: 'mulk',
    name: 'Mulk huquqi',
    icon: 'Key',
    description: 'Mulkka egalik, meros, xususiylashtirish va taqsimlash munosabatlari.'
  }
];
