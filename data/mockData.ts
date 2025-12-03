export enum SoftwareCategory {
  Programming = "Programming",
  Engineering = "Engineering",
  Design = "Design",
  Science = "Science",
  Office = "Office"
}

export interface SoftwareVersion {
  version: string;
  releaseDate: string;
  size: string;
  downloadUrl: string;
  isStable: boolean;
}

export interface Software {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  category: SoftwareCategory;
  tags: string[];
  rating: number;
  downloads: number;
  developer: string;
  versions: SoftwareVersion[];
}

export const mockSoftwareList: Software[] = [
  {
    id: "vscode",
    name: "Visual Studio Code",
    icon: "https://picsum.photos/id/1/200/200",
    shortDescription: "محبوب‌ترین ویرایشگر کد برای تمام زبان‌های برنامه‌نویسی.",
    fullDescription: "ویژوال استودیو کد (Visual Studio Code) یک ویرایشگر کد منبع باز و رایگان است که توسط مایکروسافت توسعه یافته است. این نرم‌افزار از دیباگ کردن، کنترل نسخه Git، هایلایت کردن سینتکس، تکمیل خودکار کد هوشمند، اسنیپت‌ها و بازسازی کد پشتیبانی می‌کند.",
    category: SoftwareCategory.Programming,
    tags: ["IDE", "Microsoft", "Code", "Web"],
    rating: 4.9,
    downloads: 12500,
    developer: "Microsoft",
    versions: [
      { version: "1.85.1", releaseDate: "1402/10/15", size: "90 MB", downloadUrl: "#", isStable: true },
      { version: "1.84.0", releaseDate: "1402/09/10", size: "88 MB", downloadUrl: "#", isStable: true },
      { version: "1.86.0-insider", releaseDate: "1402/10/20", size: "92 MB", downloadUrl: "#", isStable: false },
    ]
  },
  {
    id: "autocad",
    name: "AutoCAD 2024",
    icon: "https://picsum.photos/id/20/200/200",
    shortDescription: "نرم‌افزار قدرتمند نقشه‌کشی و طراحی دو بعدی و سه بعدی.",
    fullDescription: "اتوکد (AutoCAD) نرم‌افزاری برای ترسیم نقشه‌های مهندسی و صنعتی است. این نرم‌افزار امکان استفاده از محیط‌های دو بعدی و سه بعدی را فراهم می‌کند و ابزاری ضروری برای دانشجویان عمران و معماری است.",
    category: SoftwareCategory.Engineering,
    tags: ["CAD", "Civil", "Architecture", "3D"],
    rating: 4.7,
    downloads: 8400,
    developer: "Autodesk",
    versions: [
      { version: "2024.1", releaseDate: "1402/05/20", size: "2.5 GB", downloadUrl: "#", isStable: true },
      { version: "2023", releaseDate: "1401/12/15", size: "2.3 GB", downloadUrl: "#", isStable: true },
    ]
  },
  {
    id: "matlab",
    name: "MATLAB R2023b",
    icon: "https://picsum.photos/id/60/200/200",
    shortDescription: "محیط محاسبات عددی و زبان برنامه‌نویسی پیشرفته.",
    fullDescription: "متلب (MATLAB) یک محیط نرم‌افزاری برای انجام محاسبات عددی و یک زبان برنامه‌نویسی نسل چهارم است. واژه متلب هم به معنی محیط محاسبات رقمی و هم به معنی زبان برنامه‌نویسی مربوطه است که از ترکیب دو واژه MATrix و LABoratory ایجاد شده‌است.",
    category: SoftwareCategory.Engineering,
    tags: ["Math", "Simulation", "Engineering"],
    rating: 4.5,
    downloads: 5600,
    developer: "MathWorks",
    versions: [
      { version: "R2023b", releaseDate: "1402/07/10", size: "12 GB", downloadUrl: "#", isStable: true },
      { version: "R2023a", releaseDate: "1402/01/20", size: "11 GB", downloadUrl: "#", isStable: true },
    ]
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    icon: "https://picsum.photos/id/96/200/200",
    shortDescription: "قوی‌ترین نرم‌افزار ویرایش عکس و طراحی گرافیک.",
    fullDescription: "ادوبی فتوشاپ یک پردازشگر گرافیکی است که توسط شرکت ادوبی گسترش یافته و برای ایجاد، ترکیب، ویرایش، بازسازی و یا دگرگونی تصاویر و نگاره‌ها بکار می‌رود.",
    category: SoftwareCategory.Design,
    tags: ["Graphic", "Adobe", "Photo", "Art"],
    rating: 4.8,
    downloads: 15000,
    developer: "Adobe",
    versions: [
      { version: "2024 (v25.0)", releaseDate: "1402/08/01", size: "4.1 GB", downloadUrl: "#", isStable: true },
      { version: "2023 (v24.7)", releaseDate: "1402/04/15", size: "3.8 GB", downloadUrl: "#", isStable: true },
    ]
  },
  {
    id: "spss",
    name: "IBM SPSS Statistics",
    icon: "https://picsum.photos/id/160/200/200",
    shortDescription: "نرم‌افزار تحلیل‌های آماری پیشرفته برای پروژه‌های تحقیقاتی.",
    fullDescription: "نرم‌افزار SPSS یکی از قدیمی‌ترین برنامه‌های کاربردی در زمینه تجزیه و تحلیل‌های آماری است. کلمه SPSS مخفف Statistical Package for the Social Sciences (بسته آماری برای علوم اجتماعی) است.",
    category: SoftwareCategory.Science,
    tags: ["Statistics", "Research", "Data Analysis"],
    rating: 4.3,
    downloads: 3200,
    developer: "IBM",
    versions: [
      { version: "27.0.1", releaseDate: "1401/10/10", size: "800 MB", downloadUrl: "#", isStable: true },
      { version: "26.0", releaseDate: "1400/05/20", size: "750 MB", downloadUrl: "#", isStable: true },
    ]
  },
  {
    id: "office",
    name: "Microsoft Office 2021",
    icon: "https://picsum.photos/id/180/200/200",
    shortDescription: "مجموعه کامل ابزارهای اداری شامل Word, Excel, PowerPoint.",
    fullDescription: "مایکروسافت آفیس یک مجموعه اداری در برگیرنده نرم‌افزارهای یکپارچه با هم، سرورها و سرویس‌ها است که برای سیستم‌عامل‌های مایکروسافت ویندوز و مک‌اواس اکس ساخته شده است.",
    category: SoftwareCategory.Office,
    tags: ["Word", "Excel", "Document", "Presentation"],
    rating: 4.9,
    downloads: 25000,
    developer: "Microsoft",
    versions: [
      { version: "LTSC 2021", releaseDate: "1400/07/13", size: "4.5 GB", downloadUrl: "#", isStable: true },
      { version: "2019", releaseDate: "1398/08/10", size: "4.0 GB", downloadUrl: "#", isStable: true },
    ]
  }
];