import type {
  CategoryId,
  CreamId,
  FinishId,
  KidsThemeId,
  OccasionId,
} from "@/lib/catalog";

export type Locale = "en" | "zh";

export type Messages = {
  metaDescription: string;
  nav: {
    collection: string;
    order: string;
    atelier: string;
    visit: string;
    book: string;
    language: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    blurb: string;
    atelier: string;
    book: string;
    hoursNote: string;
    copyright: string;
  };
  home: {
    kicker: string;
    heroTitle: string;
    heroLead: string;
    heroAlt: string;
    ctaBook: string;
    ctaCollection: string;
    houseKicker: string;
    houseTitle: string;
    houseP1: string;
    houseP2: string;
    collectionKicker: string;
    collectionTitle: string;
    allCakes: string;
    processKicker: string;
    processTitle: string;
    notesKicker: string;
    closeTitle: string;
    closeLead: string;
    closeCta: string;
    hoursBar: string;
    learnMore: string;
  };
  process: { title: string; body: string }[];
  testimonials: { quote: string; by: string }[];
  collection: {
    kicker: string;
    title: string;
    lead: string;
    empty: string;
    all: string;
    back: string;
    layers: string;
    season: string;
    leadTime: string;
    leadDays: string;
    size: string;
    serves: string;
    sameCake: string;
    talk: string;
    others: string;
    close: string;
  };
  order: {
    kicker: string;
    title: string;
    lead: string;
    steps: string[];
    forWhom: string;
    forWhomLead: string;
    howMany: string;
    howManyLead: string;
    sizeSingle: string;
    sizeTiered: string;
    design: string;
    designLead: string;
    taste: string;
    tasteLead: string;
    creamLabel: string;
    finish: string;
    finishLead: string;
    yourDay: string;
    earliest: string;
    name: string;
    phone: string;
    email: string;
    date: string;
    delivery: string;
    pickup: string;
    courier: string;
    inscription: string;
    inscriptionPh: string;
    notes: string;
    notesPh: string;
    back: string;
    next: string;
    send: string;
    summary: string;
    unset: string;
    estimate: string;
    receivedKicker: string;
    receivedTitle: string;
    receivedLead: string;
    rowOccasion: string;
    rowSize: string;
    rowDesign: string;
    rowCream: string;
    rowTaste: string;
    rowFinish: string;
    rowDate: string;
    inscriptionLine: string;
    another: string;
    backToCollection: string;
    errOccasion: string;
    errSize: string;
    errDesign: string;
    errCream: string;
    errTaste: string;
    errFinish: string;
    errName: string;
    errPhone: string;
    errDate: string;
    errLead: string;
    errIncomplete: string;
  };
  occasions: Record<OccasionId, { label: string; hint: string }>;
  categories: Record<CategoryId, string>;
  themes: Record<KidsThemeId, string>;
  sizes: Record<string, { servings: string }>;
  creams: Record<CreamId, string>;
  tastes: Record<string, string>;
  tasteNotes: Record<string, string>;
  finishes: Record<FinishId, { label: string; hint: string }>;
  atelier: {
    kicker: string;
    title: string;
    heroAlt: string;
    role: string;
    chef: string;
    story: string[];
    values: { title: string; body: string }[];
    visitLead: string;
    visitCta: string;
    faqKicker: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
  };
  visit: {
    kicker: string;
    title: string;
    lead: string;
    address: string;
    hours: string;
    note: string;
    addressLabel: string;
    hoursLabel: string;
    contactLabel: string;
    cakeAlt: string;
    formTitle: string;
    formLead: string;
    name: string;
    phone: string;
    message: string;
    messagePh: string;
    send: string;
    error: string;
    doneKicker: string;
    doneTitle: string;
    doneLead: string;
    again: string;
  };
  chat: {
    open: string;
    close: string;
    title: string;
    agent: string;
    status: string;
    greeting: string;
    placeholder: string;
    send: string;
    typing: string;
    fallback: string;
    facebookCta: string;
    facebookHint: string;
    chips: { id: string; label: string }[];
    replies: Record<string, string>;
  };
  notFound: {
    title: string;
    lead: string;
    collection: string;
    home: string;
  };
};

const en: Messages = {
  metaDescription:
    "Candy Cakes is a private cake shop in Hamilton. Custom cakes for birthdays, weddings and the days worth keeping.",
  nav: {
    collection: "Cakes",
    order: "Order",
    atelier: "About",
    visit: "Visit",
    book: "Order a cake",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  footer: {
    blurb:
      "A private cake atelier in Hamilton. A few cakes a day, made only for yours.",
    atelier: "Atelier",
    book: "Booking",
    hoursNote: "By appointment",
    copyright: "By appointment only",
  },
  home: {
    kicker: "Custom cakes · Hamilton",
    heroTitle: "Cakes made\nfor your day.",
    heroLead:
      "Birthday, wedding, cartoon or fruit — we make it here in Fairfield, then you pick it up.",
    heroAlt: "Custom cakes at Candy Cakes in Hamilton",
    ctaBook: "Order a cake",
    ctaCollection: "See cakes",
    houseKicker: "Candy Cakes",
    houseTitle: "Handmade in Fairfield",
    houseP1:
      "The kitchen sits on Heaphy Terrace, Fairfield. Come in for pickup, or sit down and talk about the cake.",
    houseP2:
      "Just now: yuzu and chestnut. Wedding dates run into November. Nothing waits in a case. We start the day you book.",
    collectionKicker: "Shop",
    collectionTitle: "Cakes",
    allCakes: "All cakes",
    processKicker: "How to order",
    processTitle: "From the first message to pickup",
    notesKicker: "Notes",
    closeTitle: "Need something extra?",
    closeLead:
      "Choose a cake, a size and a date. We confirm on Facebook within a working day.",
    closeCta: "Start an order",
    hoursBar:
      "Tue 2–6pm · Wed–Fri 11am–6pm · Sat–Sun 9am–6pm · Closed Mon · Pickup in Fairfield",
    learnMore: "Learn more",
  },
  process: [
    {
      title: "Talk",
      body: "We listen first. How many, how sweet, wine or none, words on the cake. Twenty minutes, online or in the kitchen.",
    },
    {
      title: "Sketch",
      body: "Flavour, size and flowers are set. You receive a quote and a collection date. We buy nothing until you confirm.",
    },
    {
      title: "Bake",
      body: "Made the morning of, or the night before. No case stock, and never twice overnight.",
    },
    {
      title: "Hand over",
      body: "Collect at Candy Cakes in Fairfield, or we deliver in Hamilton. Cream cakes in summer travel with ice.",
    },
  ],
  testimonials: [
    {
      quote:
        "On the wedding day the camellias were quieter than I had imagined. Guests asked if they were real. They were.",
      by: "Lin & Zhou · wedding",
    },
    {
      quote:
        "Nocturne is bitter, which suited thirty. No candles. No one made a speech.",
      by: "Nian · birthday",
    },
    {
      quote:
        "When she tasted the lychee the table went still. That was all I wanted.",
      by: "Ms. Chen · anniversary",
    },
  ],
  collection: {
    kicker: "Cakes",
    title: "Cakes",
    lead: "These are cakes we have made. Pick a look, then tell us the date and how many people. Every one is made to order.",
    empty: "Nothing in this series just now.",
    all: "All",
    back: "Cakes",
    layers: "Layers",
    season: "Season",
    leadTime: "Lead time",
    leadDays: "{n} days",
    size: "Size",
    serves: "Serves",
    sameCake: "Order this look",
    talk: "Visit the shop",
    others: "More cakes",
    close: "Close",
  },
  order: {
    kicker: "Order",
    title: "Order",
    lead: "Choose occasion, size, design, flavor and finish. Sending this is a request — we confirm on Facebook within a working day.",
    steps: ["Occasion", "Size", "Design", "Flavor", "Finish", "Your day"],
    forWhom: "Who is it for",
    forWhomLead:
      "The occasion sets how many days we need. Weddings and sugar flowers take a week.",
    howMany: "How many to feed",
    howManyLead:
      "Size follows the table. Leftovers keep overnight.",
    sizeSingle: "Single tier",
    sizeTiered: "Double & triple tier",
    design: "Which look",
    designLead:
      "Choose a cake we have made. We will follow that look, then adjust size and words for you.",
    taste: "Flavor",
    tasteLead: "First pick a cream, then the flavor inside.",
    creamLabel: "Cream",
    finish: "How it should look",
    finishLead:
      "Sugar flowers need time to dry. Velvet spray is the default, and the quietest.",
    yourDay: "Your day",
    earliest: "The earliest collection is {date}. Leave a way to reach you.",
    name: "Name",
    phone: "Phone",
    email: "Email (optional)",
    date: "Collection or delivery date",
    delivery: "Handover",
    pickup: "Collect at Candy Cakes, Fairfield",
    courier: "Delivery in Hamilton",
    inscription: "Words on the cake (optional)",
    inscriptionPh: "24 characters at most",
    notes: "Allergies, dislikes, anything else (optional)",
    notesPh: "Nuts, lactose, children at the table, alcohol in the flavour…",
    back: "Back",
    next: "Next",
    send: "Send the request",
    summary: "This cake",
    unset: "Not yet",
    estimate: "Lead time",
    receivedKicker: "Request received",
    receivedTitle: "{name}, we have it",
    receivedLead:
      "This is not a confirmed slot. The chef will call or write within a working day to check allergies and delivery.",
    rowOccasion: "Occasion",
    rowSize: "Size",
    rowDesign: "Design",
    rowCream: "Cream",
    rowTaste: "Flavor",
    rowFinish: "Finish",
    rowDate: "Date",
    inscriptionLine: "Inscription: {text}",
    another: "Order another",
    backToCollection: "Back to cakes",
    errOccasion: "Please choose an occasion",
    errSize: "Please choose a size",
    errDesign: "Please choose a design",
    errCream: "Please choose a cream",
    errTaste: "Please choose a flavor",
    errFinish: "Please choose a finish",
    errName: "Please leave a name",
    errPhone: "Please leave a valid phone number",
    errDate: "Please choose a date",
    errLead: "We need {n} days. Earliest: {date}",
    errIncomplete: "Earlier steps are still open",
  },
  occasions: {
    wedding: {
      label: "Wedding",
      hint: "Tiers and sugar flowers. Longer to prepare.",
    },
    birthday: {
      label: "Birthday",
      hint: "A name on top, or nothing at all.",
    },
    anniversary: {
      label: "Anniversary",
      hint: "A day for two. It can be small.",
    },
    seasonal: {
      label: "Seasonal",
      hint: "We follow the fruit. Off-season flavours are not made.",
    },
    other: {
      label: "Other",
      hint: "A housewarming, a first month, a serious tea.",
    },
  },
  categories: {
    kids: "Kids",
    baby: "First birthday",
    pipe: "Piped buttercream",
    fresh: "Fresh flowers",
    fruit: "Fresh fruit",
    boss: "Luck & business",
    old: "For elders",
    cre: "Creative",
    wed: "Wedding & anniversary",
    cup: "Cupcakes",
  },
  themes: {
    cartoon: "Other cartoon IPs",
    videogame: "Video games",
    princess: "Princess",
    sports: "Sports",
    cars: "Cars",
    ocean: "Ocean",
    frozen: "Frozen",
    animals: "Animals",
    superhero: "Superheroes",
    pawpatrol: "Paw Patrol",
    lolsurprise: "LOL Surprise dolls",
    other: "Other",
  },
  sizes: {
    "5": { servings: "feeds about 2 people" },
    "6": { servings: "feeds about 3-6 people" },
    "8": { servings: "feeds about 8-15 people" },
    "10": { servings: "feeds about 15-25 people" },
    "12": { servings: "feeds about 20-30 people" },
    "5+8": { servings: "feeds about 10-18 people" },
    "6+6": { servings: "feeds about 10-15 people" },
    "6+8": { servings: "feeds about 12-20 people" },
    "6+10": { servings: "feeds about 18-26 people" },
    "8+10": { servings: "feeds about 10-18 people" },
    "8+12": { servings: "feeds about 30-45 people" },
    "10+12": { servings: "feeds about 45-65 people" },
    "5+8+12": { servings: "feeds about 45-65 people" },
    "6+8+10": { servings: "feeds about 40-60 people" },
    "8+10+12": { servings: "feeds about 60-80 people" },
  },
  creams: {
    "cheese-mousse": "Cheese mousse cream",
    "fresh-cream": "Fresh cream",
    "butter-cream": "Butter cream",
  },
  tastes: {
    "classic-plain": "Classic plain",
    "tiramisu": "Tiramisu",
    "vanilla": "Vanilla",
    "lemon": "Lemon",
    "rainbow-cake": "Rainbow cake",
    "redvelvet": "Redvelvet",
    "chocolate": "Chocolate",
    "taro": "Taro",
    "season-fruit": "Season fruit",
    "chocolate-cookies-cream": "Chocolate Cookies & cream",
    "salt-caramel": "Salt caramel",
    "matcha": "Matcha",
    "mocha-coffee": "Mocha Coffee",
    "sesame": "Sesame",
    "strawberry": "Strawberry",
    "mango": "Mango",
    "mixed-season-fruit": "Mixed season fruit",
    "durian": "Durian",
    "pandan-coconut-durian": "Pandan Coconut Durian",
    "taro-coconut-cream": "Taro with Coconut Cream",
    "matcha-red-beans": "Matcha and red beans",
    "matcha-fresh-fruit": "Matcha with fresh fruit",
  },
  tasteNotes: {
    "sweet-or-salty": "sweet or salty",
    "almonds-option": "with almonds or no almonds",
  },
  finishes: {
    velvet: {
      label: "Velvet spray",
      hint: "Matte and clean. The flavour comes first.",
    },
    buttercream: {
      label: "Buttercream flowers",
      hint: "Piped one bloom at a time, and edible.",
    },
    fruit: {
      label: "Seasonal fruit",
      hint: "Only fruit that has not travelled far.",
    },
    "sugar-flower": {
      label: "Sugar flowers",
      hint: "Camellia, peony. Each one has to dry.",
    },
    naked: {
      label: "Naked",
      hint: "The layers show. A few leaves, nothing more.",
    },
  },
  atelier: {
    kicker: "About",
    title: "The shop",
    heroAlt: "Cakes in the Candy Cakes window",
    role: "Candy Cakes",
    chef: "Fairfield, Hamilton",
    story: [
      "We make custom cakes in Fairfield: birthdays, weddings, cartoon figures, fruit and floral. Asian baking, local fruit, Japanese flour when it matters.",
      "Fillings are made here. Tell us allergies. Wheat, eggs, dairy, nuts and soy are in the kitchen.",
      "Pickup at Shop 4 / 97Z Heaphy Terrace. Message us on Facebook to lock a date.",
    ],
    values: [
      {
        title: "Handmade",
        body: "Cream, fruit and figures are finished the day you collect. Nothing sits in a case overnight.",
      },
      {
        title: "Notice",
        body: "Most cakes need two days. Cartoon figures three. Weddings and sugar flowers a week.",
      },
      {
        title: "Pickup",
        body: "Come in during open hours. Hamilton delivery is available on the order form.",
      },
    ],
    visitLead: "The shop is small. For a custom cake, order online or message Facebook first.",
    visitCta: "Visit us",
    faqKicker: "FAQ",
    faqTitle: "Sizes and ordering",
    faq: [
      {
        q: "What size for how many people?",
        a: "Single tiers run 5 to 12 inch, feeding about 2 to 30 people. Double and triple tiers feed about 10 to 80. The size table on each cake page lists them all.",
      },
      {
        q: "Can I order a custom cake?",
        a: "Yes. Open Order, or send a photo on Facebook. We confirm flavour, size and the date within a working day.",
      },
      {
        q: "Do you deliver?",
        a: "Pickup in Fairfield is default. Hamilton delivery can be chosen on the order form.",
      },
      {
        q: "What flavours do you make?",
        a: "Cheese mousse cream, fresh cream and butter cream, with over twenty fillings from classic plain and matcha to durian and taro. The order form lists them all by cream.",
      },
    ],
  },
  visit: {
    kicker: "Visit",
    title: "Come in",
    lead: "Pickup is at the Fairfield shop. Come in during open hours, or message us on Facebook to talk about a custom cake.",
    address: "Candy Cakes, Shop 4 / 97Z Heaphy Terrace, Fairfield, Hamilton 3214",
    hours: "Tue 2–6pm · Wed–Fri 11am–6pm · Sat–Sun 9am–6pm",
    note: "Closed Mondays. Pickup at the Fairfield shop.",
    addressLabel: "Address",
    hoursLabel: "Hours",
    contactLabel: "Contact",
    cakeAlt: "Yuzu cake in the atelier",
    formTitle: "Book a conversation",
    formLead: "About twenty minutes. Bring a reference, or bring nothing.",
    name: "Name",
    phone: "Phone",
    message: "What to talk about (optional)",
    messagePh: "A wedding date, a headcount, or just a look around.",
    send: "Send",
    error: "Please leave a name and a valid phone number.",
    doneKicker: "Received",
    doneTitle: "{name}, we will write back",
    doneLead:
      "Within a working day we confirm by Facebook. If you are only collecting a cake, choose pickup on the commission page.",
    again: "Leave another note",
  },
  chat: {
    open: "Facebook chat",
    close: "Close chat",
    title: "Facebook",
    agent: "Candy Cakes",
    status: "Typically replies in a few hours",
    greeting:
      "Hello — this is Candy Cakes on Facebook. Hours, pickup, flavours, or a custom cake: write here, or tap Message on Facebook to talk to us on Messenger.",
    placeholder: "Write a message…",
    send: "Send",
    typing: "Candy Cakes is typing",
    fallback:
      "We have your note. A person will write back within a working day. For a cake, use Commission; for a visit, book on the Visit page.",
    facebookCta: "Message on Facebook",
    facebookHint: "Opens Facebook Messenger with Candy Cakes Hamilton",
    chips: [
      { id: "hours", label: "Hours" },
      { id: "order", label: "Order a cake" },
      { id: "visit", label: "Visit" },
      { id: "flavors", label: "Flavours" },
    ],
    replies: {
      hours:
        "Monday closed. Tuesday 2–6pm. Wednesday to Friday 11am–6pm. Saturday and Sunday 9am–6pm.",
      order:
        "Open Commission, choose occasion, size, flavour and finish. Sending it is a request; we confirm within a working day. Weddings and sugar flowers need fourteen days.",
      visit:
        "Pickup is at Candy Cakes, Shop 4 / 97Z Heaphy Terrace, Fairfield, Hamilton 3214. Message us on Facebook if you need directions.",
      flavors:
        "Kids, first birthday, piped, flowers, fruit, luck, elders, creative, wedding and cupcakes. Open Cakes to see them all.",
    },
  },
  notFound: {
    title: "No cake on this page",
    lead: "The link may have expired. See the collection, or book one.",
    collection: "Collection",
    home: "Home",
  },
};

const zh: Messages = {
  metaDescription:
    "Candy Cakes 是 Hamilton 一间私人定制蛋糕店。每一块蛋糕从风味、尺寸到花艺，只为你的日子。",
  nav: {
    collection: "作品",
    order: "订制",
    atelier: "工坊",
    visit: "到店",
    book: "预约订制",
    language: "语言",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
  },
  footer: {
    blurb: "Hamilton 一间私人定制蛋糕工坊。每天只做有限的几块，只为你的日子。",
    atelier: "工坊",
    book: "预约",
    hoursNote: "仅预约",
    copyright: "仅预约",
  },
  home: {
    kicker: "Atelier · Hamilton",
    heroTitle: "一块蛋糕，\n只为你的日子。",
    heroLead:
      "Candy Cakes 不做流水线。从风味、尺寸到花艺，每一块都只为一个人、一场聚会、一个值得被记住的夜晚。",
    heroAlt: "Candy Cakes 的三层山茶婚礼蛋糕",
    ctaBook: "预约订制",
    ctaCollection: "看作品",
    houseKicker: "Candy Cakes",
    houseTitle: "每天不超过八块",
    houseP1: "工坊在 Fairfield 的 Heaphy Terrace。可以来取蛋糕，也可以坐下慢慢谈。",
    houseP2:
      "眼下在做青柚与秋栗。婚礼档期约至十一月。没有柜上的存货，你订下的那一天，我们才开始。",
    collectionKicker: "Collection",
    collectionTitle: "此刻的六种",
    allCakes: "全部作品",
    from: "起",
    processKicker: "Process",
    processTitle: "从对谈到上桌",
    notesKicker: "Notes",
    closeTitle: "把日子交给我们",
    closeLead: "填写场合、尺寸与风味。主理人会在一个工作日内回你，核对档期。",
    closeCta: "开始订制",
  },
  process: [
    {
      title: "对谈",
      body: "先听日子。几个人、哪种甜、能不能吃酒、要不要写字。线上或到店，二十分钟。",
    },
    {
      title: "图纸",
      body: "风味、尺寸、花艺定下来，我们会把估价和取件日写给你。确认后才开始备料。",
    },
    {
      title: "烘焙",
      body: "取件当天或前一夜现做。不做柜上的存货，也不隔夜两次。",
    },
    {
      title: "交付",
      body: "Fairfield 店自取，或 Hamilton 市区专人送出。夏天的奶油蛋糕，我们会带冰袋。",
    },
  ],
  testimonials: [
    {
      quote:
        "婚礼那天，山茶的糖花比我预想的更安静。宾客问是不是真的能吃，我说是。",
      by: "林与周 · 婚礼",
    },
    {
      quote: "夜织的可可是苦的，刚好配上三十岁。没有蜡烛，也没有人起哄。",
      by: "阿年 · 生日",
    },
    {
      quote: "她咬第一口荔枝的时候，整桌都不说话了。我想要的就是这个。",
      by: "陈小姐 · 纪念日",
    },
  ],
  collection: {
    kicker: "Collection",
    title: "作品",
    lead: "这些是店里做过的蛋糕。选定样子，再告诉我日期和人数。每一块都按单现做。",
    empty: "这一季还没有。",
    all: "全部",
    back: "作品",
    layers: "层次",
    season: "时令",
    leadTime: "准备",
    leadDays: "{n} 天",
    size: "尺寸",
    serves: "人数",
    sameCake: "订这一款",
    talk: "到店对谈",
    others: "其它款式",
    close: "关闭",
  },
  order: {
    kicker: "Commission",
    title: "订制",
    lead: "选场合、尺寸、款式、口味与外观。送出后不是自动下单——主理人会在一个工作日内与你核对档期和过敏。",
    steps: ["场合", "尺寸", "款式", "口味", "外观", "你的日子"],
    forWhom: "这一块，为谁",
    forWhomLead: "场合决定尺寸与准备天数。婚礼和糖花需要十四日。",
    howMany: "几个人吃",
    howManyLead: "尺寸按人数来。吃不完也可以，蛋糕隔夜仍好。",
    sizeSingle: "单层",
    sizeTiered: "双层/三层",
    design: "款式",
    designLead: "从做过的蛋糕里选一款。我们按这个样子做，再改尺寸和字。",
    taste: "口味",
    tasteLead: "先选奶油种类，再选里面的口味。",
    creamLabel: "奶油种类",
    finish: "表面怎么做",
    finishLead: "糖花需要更长的晾干时间。丝绒喷砂是默认，也最干净。",
    yourDay: "你的日子",
    earliest: "这块蛋糕最早可在 {date} 取。写下联系方式，我们会回确认。",
    name: "称呼",
    phone: "电话",
    email: "邮箱（选填）",
    date: "希望取件 / 送达日",
    delivery: "交付",
    pickup: "Fairfield 店自取",
    courier: "Hamilton 市区配送",
    inscription: "蛋糕上的字（选填）",
    inscriptionPh: "最多二十四字",
    notes: "过敏、忌口、其它（选填）",
    notesPh: "坚果、乳糖、是否有儿童、是否需要酒类风味…",
    back: "上一步",
    next: "下一步",
    send: "送出预约",
    summary: "这一块",
    unset: "未选",
    estimate: "准备",
    receivedKicker: "预约已收下",
    receivedTitle: "{name}，我们记下了",
    receivedLead:
      "这不是自动确认档期。主理人会在一个工作日内打电话或写信给你，核对过敏和送件。",
    rowOccasion: "场合",
    rowSize: "尺寸",
    rowDesign: "款式",
    rowCream: "奶油种类",
    rowTaste: "口味",
    rowFinish: "外观",
    rowDate: "取件",
    inscriptionLine: "写字：{text}",
    another: "再订一块",
    backToCollection: "回作品集",
    errOccasion: "请选择场合",
    errSize: "请选择尺寸",
    errDesign: "请选择款式",
    errCream: "请选择奶油种类",
    errTaste: "请选择口味",
    errFinish: "请选择外观",
    errName: "请留下姓名",
    errPhone: "请留下有效电话",
    errDate: "请选择取件日",
    errLead: "需提前 {n} 天，最早 {date}",
    errIncomplete: "前面的选择还不完整",
  },
  occasions: {
    wedding: { label: "婚礼", hint: "多层、糖花，需要更长的准备。" },
    birthday: { label: "生日", hint: "写上名字，或什么都不写。" },
    anniversary: { label: "纪念日", hint: "两个人的日子，尺寸可以很小。" },
    seasonal: { label: "节令", hint: "跟水果走，不问档期以外的味道。" },
    other: { label: "其他", hint: "入宅、满月、一次认真的下午茶。" },
  },
  categories: {
    kids: "小孩款",
    baby: "周岁宝宝款",
    pipe: "裱花款",
    fresh: "鲜花款",
    fruit: "水果款",
    boss: "财运商务款",
    old: "老人款",
    cre: "创意款",
    wed: "婚礼纪念款",
    cup: "杯子蛋糕",
  },
  themes: {
    cartoon: "其他卡通IP",
    videogame: "游戏",
    princess: "公主",
    sports: "运动",
    cars: "汽车/赛车",
    ocean: "海洋",
    frozen: "冰雪奇缘",
    animals: "小动物",
    superhero: "超级英雄",
    pawpatrol: "汪汪队",
    lolsurprise: "LOL Surprise娃娃",
    other: "其他",
  },
  sizes: {
    "5": { servings: "约供2人" },
    "6": { servings: "约供3-6人" },
    "8": { servings: "约供8-15人" },
    "10": { servings: "约供15-25人" },
    "12": { servings: "约供20-30人" },
    "5+8": { servings: "约供10-18人" },
    "6+6": { servings: "约供10-15人" },
    "6+8": { servings: "约供12-20人" },
    "6+10": { servings: "约供18-26人" },
    "8+10": { servings: "约供10-18人" },
    "8+12": { servings: "约供30-45人" },
    "10+12": { servings: "约供45-65人" },
    "5+8+12": { servings: "约供45-65人" },
    "6+8+10": { servings: "约供40-60人" },
    "8+10+12": { servings: "约供60-80人" },
  },
  creams: {
    "cheese-mousse": "芝士慕斯奶油",
    "fresh-cream": "鲜奶油",
    "butter-cream": "黄油奶油",
  },
  tastes: {
    "classic-plain": "经典原味",
    "tiramisu": "提拉米苏",
    "vanilla": "香草",
    "lemon": "柠檬",
    "rainbow-cake": "彩虹",
    "redvelvet": "红丝绒",
    "chocolate": "巧克力",
    "taro": "芋头",
    "season-fruit": "时令水果",
    "chocolate-cookies-cream": "巧克力曲奇奶油",
    "salt-caramel": "海盐焦糖",
    "matcha": "抹茶",
    "mocha-coffee": "摩卡咖啡",
    "sesame": "芝麻",
    "strawberry": "草莓",
    "mango": "芒果",
    "mixed-season-fruit": "混合时令水果",
    "durian": "榴莲",
    "pandan-coconut-durian": "班兰椰子榴莲",
    "taro-coconut-cream": "芋头椰子奶油",
    "matcha-red-beans": "抹茶红豆",
    "matcha-fresh-fruit": "抹茶鲜果",
  },
  tasteNotes: {
    "sweet-or-salty": "甜或咸",
    "almonds-option": "可加杏仁或不加",
  },
  finishes: {
    velvet: { label: "丝绒喷砂", hint: "哑光、干净，把风味留在第一口。" },
    buttercream: { label: "奶油花艺", hint: "可食用的花，现场一支一支挤。" },
    fruit: { label: "时令鲜果", hint: "只用不需长途的水果。" },
    "sugar-flower": { label: "糖花", hint: "山茶、芍药。每朵都要晾干。" },
    naked: { label: "裸蛋糕", hint: "能看见层次，点缀少量花叶。" },
  },
  atelier: {
    kicker: "Atelier",
    title: "工坊",
    heroAlt: "Candy Cakes 窗边的蛋糕",
    role: "主理人",
    chef: "林栖",
    story: [
      "在东京学过一年糖艺，在巴黎的厨房里做过巧克力。在 Hamilton，只做一个决定：每天只做有限的几块蛋糕。",
      "不加盟，不零售柜，不提前做好放冷藏。你订下的那一天，我们才开始称粉、温黄油、煮果冻。",
      "工坊在 Fairfield 的 Heaphy Terrace。来取蛋糕，坐下，再谈蛋糕。",
    ],
    values: [
      { title: "时令", body: "水果跟季节走。过季的草莓，我们宁可不做莓时。" },
      { title: "限量", body: "一天不超过八块。糖花婚礼另算，一周两场。" },
      { title: "对谈", body: "每块蛋糕都先见人。过敏、酒、小孩、长辈，都要问清楚。" },
    ],
    visitLead: "想看糖艺或试味道，请先预约到店。我们不接待未经约定的访客，厨房很小。",
    visitCta: "预约到店",
    faqKicker: "FAQ",
    faqTitle: "尺寸与订制",
    faq: [
      {
        q: "多少人吃选什么尺寸？",
        a: "单层 5–12 寸，约供 2–30 人；双层/三层约供 10–80 人。每个款式页都有尺寸表。",
      },
      {
        q: "可以订制蛋糕吗？",
        a: "可以。打开订制，或把参考图发到脸书。我们会在一个工作日内确认口味、尺寸和日期。",
      },
      {
        q: "送货吗？",
        a: "默认 Fairfield 店自取。订制页可选 Hamilton 市区配送。",
      },
      {
        q: "有哪些口味？",
        a: "芝士慕斯奶油、鲜奶油、黄油奶油三大类，经典原味、抹茶、榴莲、芋头等二十多种。订制页按奶油种类列出全部。",
      },
    ],
  },
  visit: {
    kicker: "Visit",
    title: "到店",
    lead: "可到 Fairfield 店取蛋糕。营业时间内欢迎进店，订制细节也可以走脸书客服。",
    address: "Candy Cakes，Shop 4 / 97Z Heaphy Terrace，Fairfield，Hamilton 3214",
    hours: "周二 14:00–18:00 · 周三至周五 11:00–18:00 · 周六周日 09:00–18:00",
    note: "周一休息。可到 Fairfield 店取蛋糕。",
    addressLabel: "地址",
    hoursLabel: "时间",
    contactLabel: "联络",
    cakeAlt: "工坊里的青柚蛋糕",
    formTitle: "预约对谈",
    formLead: "大约二十分钟。可以带参考图，也可以什么都不带。",
    name: "称呼",
    phone: "电话",
    message: "想谈什么（选填）",
    messagePh: "婚礼日期、人数，或只是想来看看。",
    send: "送出预约",
    error: "请留下姓名和有效电话。",
    doneKicker: "已收下",
    doneTitle: "{name}，我们会回你",
    doneLead:
      "一个工作日内我们会在脸书回复。若只是取蛋糕，订制页里选「Fairfield 店自取」即可。",
    again: "再留一条",
  },
  chat: {
    open: "脸书客服",
    close: "关闭客服",
    title: "脸书",
    agent: "Candy Cakes",
    status: "通常数小时内回复",
    greeting:
      "你好，这里是 Candy Cakes 的脸书客服。营业时间、取蛋糕、口味或订制，可以直接写；点「打开脸书客服」会跳到我们的 Messenger。",
    placeholder: "输入消息…",
    send: "发送",
    typing: "Candy Cakes 正在输入",
    fallback:
      "我们记下了。一个工作日内会有人回复。订蛋糕请走订制页，到店请走预约对谈。",
    facebookCta: "打开脸书客服",
    facebookHint: "将跳转到 Candy Cakes 的 Facebook Messenger",
    chips: [
      { id: "hours", label: "营业时间" },
      { id: "order", label: "订蛋糕" },
      { id: "visit", label: "到店" },
      { id: "flavors", label: "口味" },
    ],
    replies: {
      hours:
        "周一休息。周二 14:00–18:00。周三至周五 11:00–18:00。周六、周日 09:00–18:00。",
      order:
        "打开订制，选场合、尺寸、风味和外观。送出后是预约，我们会在一个工作日内确认。婚礼和糖花需十四天。",
      visit:
        "取蛋糕在 Candy Cakes，Shop 4 / 97Z Heaphy Terrace，Fairfield，Hamilton 3214。需要路线请走脸书客服。",
      flavors:
        "小孩款、周岁、裱花、鲜花、水果、财运、老人、创意、婚礼和杯子蛋糕。打开作品页看全部。",
    },
  },
  notFound: {
    title: "这一页没有蛋糕",
    lead: "也许是一条过期的链接。回作品集看看，或直接预约一块。",
    collection: "作品",
    home: "回首页",
  },
};

export const messages: Record<Locale, Messages> = { en, zh };
