/**
 * All site copy, in English and European Portuguese.
 * Source of truth for the English text: materials/NascenteWeb-brief.docx.
 * To change any wording on the site, edit it here.
 */

export type Lang = "en" | "pt";

export const CONTACT = {
  email: "inquiries@nascenteproject.com",
  phone: "+420 776 316 388",
  phoneHref: "tel:+420776316388",
  /** WhatsApp chat link; the greeting is pre-filled in the visitor's language. */
  whatsapp: (greeting: string) => `https://wa.me/420776316388?text=${encodeURIComponent(greeting)}`,
  place: "Comporta, Portugal",
};

/** The nine 2027 sessions. Ids are what the form submits and what's stored. */
export const SESSIONS = [
  { id: "I", start: "2027-07-05", end: "2027-07-09" },
  { id: "II", start: "2027-07-12", end: "2027-07-16" },
  { id: "III", start: "2027-07-19", end: "2027-07-23" },
  { id: "IV", start: "2027-07-26", end: "2027-07-30" },
  { id: "V", start: "2027-08-02", end: "2027-08-06" },
  { id: "VI", start: "2027-08-09", end: "2027-08-13" },
  { id: "VII", start: "2027-08-16", end: "2027-08-20" },
  { id: "VIII", start: "2027-08-23", end: "2027-08-27" },
  { id: "IX", start: "2027-08-30", end: "2027-09-03" },
] as const;

export type SessionId = (typeof SESSIONS)[number]["id"] | "PRIVATE";

const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  pt: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
};

/** "July 5 to 9" / "5 a 9 de julho". `short` abbreviates months for tight spaces. */
export function sessionRange(lang: Lang, start: string, end: string, short = false): string {
  const [, sm, sd] = start.split("-").map(Number);
  const [, em, ed] = end.split("-").map(Number);
  const m = (i: number) => {
    const name = MONTHS[lang][i - 1];
    return short ? name.slice(0, 3) : name;
  };
  if (lang === "en") {
    return sm === em ? `${m(sm)} ${sd} to ${ed}` : `${m(sm)} ${sd} to ${m(em)} ${ed}`;
  }
  const de = short ? "" : "de ";
  return sm === em ? `${sd} a ${ed} ${de}${m(sm)}` : `${sd} ${de}${m(sm)} a ${ed} ${de}${m(em)}`;
}

export const PEOPLE: { name: string; photo?: string; line: Record<Lang, string> }[] = [
  {
    name: "Klara",
    line: {
      en: "Weaving five years of Alpine outdoor program leadership into the sensory and artistic vision of Nascente.",
      pt: "Traz cinco anos a liderar programas ao ar livre nos Alpes para a visão sensorial e artística da Nascente.",
    },
  },
  {
    name: "Viktor",
    line: {
      en: "Anchoring the wild magic with precision logistics, seamless operational design, and structural safety.",
      pt: "Ancora a magia selvagem com logística precisa, um desenho operacional impecável e segurança estrutural.",
    },
  },
  {
    name: "Vitek",
    line: {
      en: "Grounding daily wilderness adventures in psychological resilience and mindful environmental exploration.",
      pt: "Assenta as aventuras diárias na natureza na resiliência psicológica e numa exploração consciente do meio natural.",
    },
  },
  {
    name: "Vasek",
    line: {
      en: "Translating complex natural landscapes into intuitive, hands-on architectural and building experiences for early ages.",
      pt: "Traduz paisagens naturais complexas em experiências intuitivas e práticas de arquitetura e construção para os mais pequenos.",
    },
  },
  {
    name: "Viky",
    line: {
      en: "Guiding the youngest streams with a deep foundation in early childhood independence and empathetic mentorship.",
      pt: "Guia as correntes mais novas com uma base sólida na independência da primeira infância e numa mentoria empática.",
    },
  },
];

const en = {
  meta: {
    title: "Nascente Project · A private day-camp in Comporta",
    description:
      "Nascente is a private, screen-free summer day-camp spent entirely outdoors among the dunes and pine forests of Comporta, Portugal. July 5 to September 3, 2027. Limited to 24 children a week.",
  },
  nav: {
    menu: "Menu",
    close: "Close",
    inquire: "Inquire",
    links: [
      ["nascente", "Nascente"],
      ["philosophy", "Philosophy"],
      ["ages", "Three streams"],
      ["day", "A day at Nascente"],
      ["private", "Private immersions"],
      ["people", "Meet us"],
      ["inquire", "Request an invitation"],
      ["contact", "Contact"],
    ] as [string, string][],
  },
  hero: {
    place: "Comporta, Portugal",
    title: "Where it all begins.",
    sub: "A private day-camp in Comporta, Portugal.",
    limit: "Weekly invitations are strictly limited to 24 children.",
    dates: "July 5 to September 3, 2027",
    cta: "Request an invitation",
    mailSubject: "Invitation request",
  },
  nascente: {
    label: "Nascente",
    title: "A word for spring:",
    lead: "the quiet, pristine point where water first emerges from the earth.",
    body: "Water possesses a natural, unforced duality: the capacity to yield with absolute grace, and the enduring power to shape the landscape around it. Our purpose is not to mold, direct, or force that current, but to protect its origin, keep its banks safe, and give children the freedom to find and appreciate their own flow.",
  },
  philosophy: {
    title: "The simple, wild magic of childhood.",
    lead: "Nascente is a private, screen-free summer camp, spent entirely outdoors among the dunes and pine forests of Comporta.",
    body: [
      "We believe true luxury is space, time, and the freedom to explore, laugh, and play. Here, children are not entertained but captivated: by beautiful stories, by the sand beneath their feet, by immersive adventures.",
      "Resilience, confidence, and independence grow the way everything does in nature: slowly, through trying, failing, and trying again. Children move with boundless energy, and their laughter fills the pines with pure, unfettered joy.",
    ],
  },
  ages: {
    label: "Age groups",
    title: "Three streams.",
    intro: "Every child joins the stream that fits their age, then flows on to the next as they grow.",
    items: [
      { name: "Spring", ages: "Ages 3 and 4", text: "Gentle, sensory days close to their mentor." },
      { name: "Brook", ages: "Ages 5 and 6", text: "Curious little explorers, building and discovering." },
      { name: "River", ages: "Ages 7 and 8", text: "Bigger adventures, teamwork and making." },
    ],
  },
  day: {
    label: "A day at Nascente",
    title: "How a day glides.",
    intro:
      "Every day follows a steady rhythm and a few steadfast boundaries, with one mentor for every four children, always within reach, because children are only truly free when they feel safe. Within it, there is wide, open space for spontaneous discovery, surprise, and fun.",
    items: [
      { time: "09:30", name: "The Collection", text: "Your child is collected from your villa gate by their mentor. A gentle, screen-free transition from home to the wild." },
      { time: "10:00", name: "The Morning", text: "Art, exploration, and play. Time to create, wander, and move among the dunes and pines." },
      { time: "12:30", name: "The Experience Table", text: "A shared, nourishing farm-to-table lunch in the shade of the pines, followed by a quiet siesta with a book to rest and recharge." },
      { time: "13:30", name: "The Story", text: "The afternoon belongs to the story of the summer. Children step into its adventure and become part of it." },
      { time: "16:00", name: "The Return", text: "A closing circle to settle the day and share its discoveries, then home to you, ready for family time." },
    ],
  },
  private: {
    label: "Beyond the season",
    title: "Private wilderness immersions.",
    intro:
      "For families seeking a solitary connection to the source, we curate bespoke itineraries outside of our weekly season. Whether it is a single day of guided tracking or a dedicated week-long mentorship for siblings, we design the rhythm entirely around your family's flow.",
    items: [
      { name: "The Shadow Mentor", text: "A dedicated 1:1 mentor assigned exclusively to your child." },
      { name: "The Custom Path", text: "Curated expeditions focused on specific interests, from marine biology to wild artisanry." },
      { name: "The Privacy", text: "Peace of mind for families requiring total discretion." },
    ],
    cta: "Request a private immersion",
  },
  people: {
    label: "The people",
    title: "Meet us.",
    lead: "Nascente began in our own childhood.",
    body: [
      "We grew up between two gifts: the quiet independence of our early Montessori years, and our grandmother's storytelling. The moment her stories ended, we would run straight into the woods and play them out, until the forest felt like a living part of the tale.",
      "We built Nascente to pass that gift on: a safe, magical place where children are trusted with their independence, and where nature and magic become part of their own story.",
    ],
    more: "Read our story",
  },
  inquire: {
    label: "Inquire",
    title: "Three steps to the source.",
    steps: [
      { title: "The registry.", text: "Complete the short profile below to introduce your child." },
      { title: "Get to know each other.", text: "A private conversation to see whether Nascente is right for your family, and to answer any questions you might have." },
      { title: "The invitation.", text: "Upon acceptance, we confirm your placement." },
    ],
    note: "We accept only twenty-four children a week and review each application personally.",
  },
  form: {
    heading: "Request an invitation",
    parent: "Parent or guardian",
    email: "Email",
    child: "Child's name",
    birthYear: "Year of birth",
    sessions: "Requested service",
    sessionsHint: "Choose one or more weeks, or a private immersion.",
    session: "Session",
    private: "Private immersion",
    privateNote: "Dates arranged with you",
    introducedBy: "Introduced by",
    optional: "optional",
    note: "A note",
    notePlaceholder: "Anything you would like us to know.",
    consentBefore: "I have read the ",
    consentLink: "privacy notice",
    consentAfter: " and agree to Nascente keeping these details to respond to my request.",
    submit: "Request an invitation",
    sending: "Sending",
    successTitle: "Thank you.",
    successText: "We have received your request and will be in touch personally, very soon.",
    another: "Send another request",
    errorSessions: "Please choose at least one week or a private immersion.",
    error: "We couldn't send your request. Please try again, or write to us at",
  },
  contact: {
    label: "Contact",
    title: "It all begins with a conversation.",
    whatsapp: "Message us on WhatsApp",
    greeting: "Hello, I would like to ask about Nascente.",
  },
  footer: {
    privacy: "Privacy",
    rights: "Nascente Project, Comporta",
  },
  privacy: {
    title: "Privacy",
    close: "Close",
    body: [
      "Discretion is part of how we work. Whatever you share with us is held with the same care we give your children.",
      "What we ask for. Only what we need to respond to you: your name and email, your child's name and year of birth, the service you are interested in, and anything you choose to tell us.",
      "How it is used. Solely to answer your request, arrange a private conversation and, should your child join us, prepare their summer. Never for marketing, and never for anything else.",
      "Who sees it. Your details are accessible only to the Nascente founders. They are stored securely and encrypted, handled by a small number of trusted providers bound by strict confidentiality, and never sold, rented, or shared.",
      "How long. No longer than needed: up to 24 months, or for as long as your child is with us and the law requires.",
      "Your control. At any time you may ask us to show, correct, or permanently delete everything we hold about your family, or withdraw your consent. Write to inquiries@nascenteproject.com and we will act without delay. You may also contact the Portuguese data protection authority (CNPD).",
      "No tracking. This website uses no cookies, no analytics, and no advertising or third-party trackers. We do not follow or profile your visit.",
    ],
  },
};

export type Copy = typeof en;

const pt: Copy = {
  meta: {
    title: "Nascente Project · Campo de férias privado em Comporta",
    description:
      "A Nascente é um campo de férias de verão privado e sem ecrãs, passado inteiramente ao ar livre entre as dunas e os pinhais de Comporta. De 5 de julho a 3 de setembro de 2027. Limitado a 24 crianças por semana.",
  },
  nav: {
    menu: "Menu",
    close: "Fechar",
    inquire: "Pedir convite",
    links: [
      ["nascente", "Nascente"],
      ["philosophy", "Filosofia"],
      ["ages", "Três correntes"],
      ["day", "Um dia na Nascente"],
      ["private", "Imersões privadas"],
      ["people", "Conheça-nos"],
      ["inquire", "Pedir um convite"],
      ["contact", "Contacto"],
    ],
  },
  hero: {
    place: "Comporta, Portugal",
    title: "Onde tudo começa.",
    sub: "Um campo de férias privado em Comporta, Portugal.",
    limit: "Os convites semanais estão estritamente limitados a 24 crianças.",
    dates: "De 5 de julho a 3 de setembro de 2027",
    cta: "Pedir um convite",
    mailSubject: "Pedido de convite",
  },
  nascente: {
    label: "Nascente",
    title: "Uma palavra para fonte:",
    lead: "o ponto calmo e intocado onde a água brota da terra pela primeira vez.",
    body: "A água tem uma dualidade natural e espontânea: a capacidade de ceder com absoluta graça e o poder duradouro de moldar a paisagem à sua volta. O nosso propósito não é moldar, dirigir ou forçar essa corrente, mas proteger a sua origem, manter as suas margens seguras e dar às crianças a liberdade de encontrarem e apreciarem o seu próprio fluxo.",
  },
  philosophy: {
    title: "A magia simples e selvagem da infância.",
    lead: "A Nascente é um campo de férias de verão privado e sem ecrãs, passado inteiramente ao ar livre entre as dunas e os pinhais de Comporta.",
    body: [
      "Acreditamos que o verdadeiro luxo é espaço, tempo e liberdade para explorar, rir e brincar. Aqui, as crianças não são entretidas, mas cativadas: por histórias bonitas, pela areia debaixo dos pés, por aventuras imersivas.",
      "A resiliência, a confiança e a independência crescem como tudo na natureza: devagar, a tentar, a falhar e a tentar de novo. As crianças movem-se com uma energia sem limites, e o seu riso enche os pinhais de uma alegria pura e livre.",
    ],
  },
  ages: {
    label: "Idades",
    title: "Três correntes.",
    intro: "Cada criança junta-se à corrente que corresponde à sua idade e segue para a próxima à medida que cresce.",
    items: [
      { name: "Spring", ages: "3 e 4 anos", text: "Dias suaves e sensoriais, perto do seu mentor." },
      { name: "Brook", ages: "5 e 6 anos", text: "Pequenos exploradores curiosos, a construir e a descobrir." },
      { name: "River", ages: "7 e 8 anos", text: "Aventuras maiores, trabalho em equipa e criação." },
    ],
  },
  day: {
    label: "Um dia na Nascente",
    title: "Como desliza um dia.",
    intro:
      "Cada dia segue um ritmo constante e alguns limites firmes, com um mentor para cada quatro crianças, sempre por perto, porque as crianças só são verdadeiramente livres quando se sentem seguras. Dentro desse ritmo, há espaço amplo e aberto para a descoberta espontânea, a surpresa e a diversão.",
    items: [
      { time: "09:30", name: "A Recolha", text: "O mentor vai buscar a criança ao portão da vossa villa. Uma transição suave e sem ecrãs, de casa para a natureza." },
      { time: "10:00", name: "A Manhã", text: "Arte, exploração e brincadeira. Tempo para criar, deambular e mover-se entre as dunas e os pinheiros." },
      { time: "12:30", name: "A Mesa da Experiência", text: "Um almoço partilhado e nutritivo, do campo para a mesa, à sombra dos pinheiros, seguido de uma sesta tranquila com um livro para descansar e recuperar energias." },
      { time: "13:30", name: "A História", text: "A tarde pertence à história do verão. As crianças entram na sua aventura e tornam-se parte dela." },
      { time: "16:00", name: "O Regresso", text: "Um círculo de encerramento para assentar o dia e partilhar as suas descobertas, e depois de volta a casa, prontas para o tempo em família." },
    ],
  },
  private: {
    label: "Para além da temporada",
    title: "Imersões privadas na natureza.",
    intro:
      "Para famílias que procuram uma ligação íntima à origem, criamos itinerários à medida fora da nossa temporada semanal. Seja um único dia de rastreio guiado ou uma semana inteira de mentoria dedicada para irmãos, desenhamos o ritmo inteiramente em torno do fluxo da sua família.",
    items: [
      { name: "O Mentor Sombra", text: "Um mentor dedicado, atribuído exclusivamente à sua criança." },
      { name: "O Caminho à Medida", text: "Expedições pensadas em torno de interesses específicos, da biologia marinha ao artesanato na natureza." },
      { name: "A Privacidade", text: "Tranquilidade para famílias que exigem total discrição." },
    ],
    cta: "Pedir uma imersão privada",
  },
  people: {
    label: "As pessoas",
    title: "Conheça-nos.",
    lead: "A Nascente começou na nossa própria infância.",
    body: [
      "Crescemos entre dois presentes: a independência tranquila dos nossos primeiros anos Montessori e as histórias da nossa avó. Assim que as suas histórias terminavam, corríamos diretamente para o bosque e vivíamo-las, até a floresta parecer uma parte viva do conto.",
      "Criámos a Nascente para passar esse presente adiante: um lugar seguro e mágico, onde se confia às crianças a sua independência e onde a natureza e a magia se tornam parte da sua própria história.",
    ],
    more: "Ler a nossa história",
  },
  inquire: {
    label: "Pedir convite",
    title: "Três passos até à origem.",
    steps: [
      { title: "O registo.", text: "Preencha o breve perfil abaixo para nos apresentar a sua criança." },
      { title: "Conhecemo-nos.", text: "Uma conversa privada para perceber se a Nascente é a escolha certa para a sua família e responder a todas as suas perguntas." },
      { title: "O convite.", text: "Após aceitação, confirmamos a vaga." },
    ],
    note: "Aceitamos apenas vinte e quatro crianças por semana e analisamos cada pedido pessoalmente.",
  },
  form: {
    heading: "Pedir um convite",
    parent: "Pai, mãe ou encarregado de educação",
    email: "Email",
    child: "Nome da criança",
    birthYear: "Ano de nascimento",
    sessions: "Serviço pretendido",
    sessionsHint: "Escolha uma ou mais semanas, ou uma imersão privada.",
    session: "Sessão",
    private: "Imersão privada",
    privateNote: "Datas combinadas consigo",
    introducedBy: "Recomendado por",
    optional: "opcional",
    note: "Uma nota",
    notePlaceholder: "Algo que gostaria que soubéssemos.",
    consentBefore: "Li o ",
    consentLink: "aviso de privacidade",
    consentAfter: " e aceito que a Nascente guarde estes dados para responder ao meu pedido.",
    submit: "Pedir um convite",
    sending: "A enviar",
    successTitle: "Obrigado.",
    successText: "Recebemos o seu pedido e entraremos em contacto pessoalmente, muito em breve.",
    another: "Enviar outro pedido",
    errorSessions: "Escolha pelo menos uma semana ou uma imersão privada.",
    error: "Não foi possível enviar o seu pedido. Tente novamente ou escreva-nos para",
  },
  contact: {
    label: "Contacto",
    title: "Tudo começa com uma conversa.",
    whatsapp: "Fale connosco no WhatsApp",
    greeting: "Olá, gostaria de saber mais sobre a Nascente.",
  },
  footer: {
    privacy: "Privacidade",
    rights: "Nascente Project, Comporta",
  },
  privacy: {
    title: "Privacidade",
    close: "Fechar",
    body: [
      "A discrição faz parte da forma como trabalhamos. Tudo o que partilha connosco é guardado com o mesmo cuidado que dedicamos às suas crianças.",
      "O que pedimos. Apenas o necessário para lhe responder: o seu nome e email, o nome e ano de nascimento da criança, o serviço que lhe interessa e o que mais quiser contar-nos.",
      "Como é usado. Exclusivamente para responder ao seu pedido, combinar uma conversa privada e, se a criança se juntar a nós, preparar o seu verão. Nunca para marketing, nem para qualquer outro fim.",
      "Quem tem acesso. Os seus dados são acessíveis apenas aos fundadores da Nascente. São guardados de forma segura e encriptada, tratados por um número reduzido de prestadores de confiança sujeitos a estrita confidencialidade, e nunca são vendidos, alugados ou partilhados.",
      "Durante quanto tempo. Não mais do que o necessário: até 24 meses, ou enquanto a criança estiver connosco e a lei o exigir.",
      "O seu controlo. A qualquer momento pode pedir-nos para ver, corrigir ou apagar definitivamente tudo o que guardamos sobre a sua família, ou retirar o seu consentimento. Escreva para inquiries@nascenteproject.com e trataremos do assunto sem demora. Pode também contactar a Comissão Nacional de Proteção de Dados (CNPD).",
      "Sem rastreio. Este site não utiliza cookies, ferramentas de análise nem rastreadores publicitários ou de terceiros. Não seguimos nem traçamos o perfil da sua visita.",
    ],
  },
};

export const COPY: Record<Lang, Copy> = { en, pt };
