// Бүх хувийн мэдээлэл энд байна. Дэлгэцүүд энэ файлаас уншина.
// Хоосон холбоос (social.url) товч болж харагдахгүй.

export type Story = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  highlight: string;
};

export type Skill = {
  name: string;
  note: string;
};

export type WorkLink = {
  label: string;
  url: string;
};

export type WorkId = "z-money" | "studymate" | "shopmn";

export type Work = {
  id: WorkId;
  title: string;
  subtitle: string;
  description: string;
  imageNote: string;
  tags: string[];
  links: WorkLink[];
};

export const profile = {
  name: "Баттулга Гийхнаран",
  monogram: "Г",
  direction: "Мобайл ба вэб хөгжүүлэгч",
  sentence: "Өдөр тутмын жижиг асуудлыг энгийн аппаар шийддэг.",
  university: "СЭЗИС",
  universityFull: "Санхүү эдийн засгийн их сургууль",
  major: "Мэдээллийн систем",
  year: "3-р курс",
  born: 2005,
  course: "SWM231 · Бүтээлч ажил",
  bio: "Би Баттулга Гийхнаран. 2005 онд төрсөн. Санхүү эдийн засгийн их сургуулийн Мэдээллийн системийн 3-р курст сурдаг. Мобайл, вэб хөгжүүлэлт сонирхдог бөгөөд хичээл дээр үзсэн зүйлээ жижиг апп болгож туршдаг.",
  email: "giikhnaranbattulga7@gmail.com",
  github: "https://github.com/giikhnaranbattulga7-ship-i",
  githubLabel: "giikhnaranbattulga7-ship-i",
  // Утасны дугаар зориуд алга. Нийтлэхэд эвгүй мэдээллээ оруулахгүй.
  // social.url хоосон бол «Холбоо барих» дэлгэцэд товч гарахгүй.
  social: {
    label: "Сошиал",
    url: "",
  },
  stories: [
    {
      id: "cover",
      kicker: "СЭЗИС · SWM231",
      title: "Баттулга Гийхнаран",
      body: "Мобайл ба вэб хөгжүүлэгч",
      highlight: "Өдөр тутмын жижиг асуудлыг энгийн аппаар шийддэг.",
    },
    {
      id: "school",
      kicker: "Суралцаж буй газар",
      title: "Мэдээллийн систем",
      body: "Санхүү эдийн засгийн их сургууль, 3-р курс. 2005 онд төрсөн.",
      highlight: "Хичээл дээр сурсан зүйлээ жижиг апп болгож туршдаг.",
    },
    {
      id: "build",
      kicker: "Юу бүтээдэг вэ",
      title: "Утсан дээр ажилладаг апп",
      body: "Санхүү, суралцах, бүтээгдэхүүний карт. React Native, Expo, TypeScript, Supabase.",
      highlight: "Эхлээд энгийн. Дараа нь үнэхээр ажилладаг болгоно.",
    },
    {
      id: "tour",
      kicker: "Апп-аа ингэж үзээрэй",
      title: "Дөрвөн хэсэг",
      body: "Доод цэс: Танилцуулга, Миний тухай, Бүтээлүүд, Холбоо барих.",
      highlight: "Бүтээлээ шургуулж үз. Утсаа сэгсрэхэд жижиг нууц бий.",
    },
  ] satisfies Story[],
  skills: [
    { name: "React Native", note: "Утасны дэлгэц, компонент" },
    { name: "Expo", note: "Апп ажиллуулах, бүтээх" },
    { name: "TypeScript", note: "Төрөлтэй, алдаа бага код" },
    { name: "Supabase / PostgreSQL", note: "Өгөгдөл, нэвтрэлт, RLS" },
    { name: "Git / GitHub", note: "Хувилбар, репозитор" },
    { name: "Figma", note: "Дэлгэцийн загвар" },
    { name: "Vercel", note: "Вэб дээр гаргах" },
  ] satisfies Skill[],
  works: [
    {
      id: "z-money",
      title: "Z Money",
      subtitle: "Хувийн санхүүгийн апп",
      description:
        "Орлого, зарлагаа бүртгэж, төсвөө хардаг. Expo болон Supabase ашигласан. Нэвтрэлт, RLS, CRUD бий. Гурван таб: Нүүр, Гүйлгээ, Төсөв. Өнгө нь хар, цагаан, ногоон.",
      imageNote: "Бодит дэлгэц",
      tags: ["Expo", "Supabase", "Auth", "RLS"],
      links: [
        { label: "Апп нээх", url: "https://z-money-giikhnaran.vercel.app" },
        {
          label: "Код",
          url: "https://github.com/giikhnaranbattulga7-ship-i/finance-app-supabase",
        },
      ],
    },
    {
      id: "studymate",
      title: "StudyMate AI",
      subtitle: "Суралцах туслах апп",
      description:
        "Хичээлийн төлөвлөгч, AI багшийн жишээ, богино асуулт, ахицын самбар. Expo Router ашигласан суралцах туслах.",
      imageNote: "Бодит дэлгэц",
      tags: ["Expo Router", "Төлөвлөгч", "Асуулт"],
      links: [
        {
          label: "Апп нээх",
          url: "https://studymate-ai-giikhnaran.vercel.app",
        },
      ],
    },
    {
      id: "shopmn",
      title: "ShopMn",
      subtitle: "Анхны Expo төсөл",
      description:
        "React Native дээр бүтээгдэхүүний карт зурж сурсан дасгал апп. Нэр, үнэ, товч гэсэн энгийн картыг бүрэлдэхүүн хэсэг болгож үзсэн.",
      imageNote: "Өөрийн зурсан жишээ",
      tags: ["React Native", "Expo", "Карт"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/giikhnaranbattulga7-ship-i",
        },
      ],
    },
  ] satisfies Work[],
  easterEgg: {
    title: "Нууц илэрлээ",
    body: "2005 онд төрсөн, одоо 3-р курс. Код бичихдээ «хүн үүнийг ойлгох уу» гэж асуудаг. Дараагийн апп бүр өмнөхөөсөө арай энгийн байг.",
  },
};
