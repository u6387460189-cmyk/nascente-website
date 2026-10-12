/**
 * All site copy, in English and European Portuguese.
 * Source of truth for the English text: materials/NascenteWeb-brief.docx.
 * To change any wording on the site, edit it here.
 */

export type Lang = "en" | "pt";

export const CONTACT = {
  email: "info@nascenteproject.com",
  phone: "+41 76 685 59 91",
  phoneHref: "tel:+41766855991",
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

export type SessionId = (typeof SESSIONS)[number]["id"];

const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  pt: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
};

/** "July 5 – 9" / "5 – 9 de julho", spanning months when needed. */
export function sessionRange(lang: Lang, start: string, end: string): string {
  const [, sm, sd] = start.split("-").map(Number);
  const [, em, ed] = end.split("-").map(Number);
  const m = MONTHS[lang];
  if (lang === "en") {
    return sm === em ? `${m[sm - 1]} ${sd} – ${ed}` : `${m[sm - 1]} ${sd} – ${m[em - 1]} ${ed}`;
  }
  return sm === em ? `${sd} – ${ed} de ${m[sm - 1]}` : `${sd} de ${m[sm - 1]} – ${ed} de ${m[em - 1]}`;
}

export const PEOPLE = [
  { name: "Klara" },
  { name: "Viktor" },
  { name: "Vitek" },
  { name: "Vasek" },
  { name: "Viky" },
] as { name: string; photo?: string; line?: Record<Lang, string> }[];

const en = {
  meta: {
    title: "Nascente Project · A private summer day-camp in Comporta",
    description:
      "Nascente is a private summer day-camp in Comporta, Portugal. Entirely outdoor, tactile learning among the dunes and pine forests. Sessions July 5 – September 3, 2027.",
  },
  nav: {
    menu: "Menu",
    close: "Close",
    inquire: "Inquire",
    links: [
      ["nascente", "Nascente"],
      ["philosophy", "Philosophy"],
      ["day", "A sample day"],
      ["dates", "Dates"],
      ["ages", "Age groups"],
      ["people", "The people"],
      ["inquire", "Inquire"],
      ["contact", "Contact"],
    ] as [string, string][],
  },
  hero: {
    place: "Comporta · Portugal",
    title: "Where it all begins.",
    sub: "A private summer day-camp in Comporta, Portugal.",
    dates: "5 July – 3 September 2027",
    cta: "Inquire a place",
    scroll: "Scroll",
  },
  nascente: {
    label: "Nascente",
    entry: "nas·cen·te",
    entryNote: "noun, Portuguese — a spring; the source of a river",
    title: "A word for spring.",
    body: [
      "Nascente, a word for spring: the quiet, pristine point where water first emerges from the earth.",
      "Water possesses a natural, unforced duality — the capacity to yield with absolute grace, and the enduring power to shape the landscape around it. Our purpose is not to mold, direct, or force that current, but to protect its origin and give the children freedom to find and appreciate their own flow.",
    ],
  },
  philosophy: {
    label: "Our philosophy",
    title: "The simple, wild magic of childhood.",
    body: "We believe true luxury is space, time, and the freedom to explore. Set among the dunes and pine forests, Nascente protects the simple, wild magic of childhood through entirely outdoor, tactile learning. We provide a meticulously prepared environment where children are not passively entertained, but captivated by beautiful narratives — giving them the quiet space to let the natural world become a part of their own story.",
  },
  day: {
    label: "A sample day",
    title: "How a day flows.",
    intro:
      "Every day at Nascente follows a deliberate, gentle rhythm to anchor the nervous system, while leaving wide, open space for spontaneous discovery.",
    items: [
      { time: "9:30", part: "From arrival", name: "The Slow Start", text: "A communal grounding circle to transition from the rush of the outside world into the quiet of nature." },
      { time: "10–12", part: "Morning", name: "The Coastal Atelier", text: "Immersive, tactile work. Botanical design, structural building, and navigating the natural environment." },
      { time: "12–13", part: "Midday", name: "The Communal Table", text: "A shared, nourishing lunch and quiet rest with a book in the shade of the pines." },
      { time: "13–15", part: "Afternoon", name: "The Narrative", text: "Amazing adventures driven by the overarching story of the summer." },
      { time: "15:30", part: "Closing", name: "The Anchor", text: "Our closing circle. A moment to recap the day and settle before returning home." },
    ],
  },
  dates: {
    label: "Summer camp · 2027",
    title: "Nine sessions, Monday to Friday.",
    groups: [
      { name: "July", ids: ["I", "II", "III", "IV"] },
      { name: "August – September", ids: ["V", "VI", "VII", "VIII", "IX"] },
    ],
    session: "Session",
    pick: "Inquire for this week",
  },
  ages: {
    label: "Age groups",
    title: "Three streams.",
    intro: "Every child joins the stream that fits their age, then flows on to the next as they grow.",
    ageWord: "ages",
    items: [
      { name: "Nascent", ages: "3–4", text: "Gentle, sensory days close to their mentor." },
      { name: "Brook", ages: "5–6", text: "Curious little explorers, building and discovering." },
      { name: "River", ages: "7–8", text: "Bigger adventures, teamwork and making." },
    ],
  },
  people: {
    label: "The people",
    title: "Meet us.",
    body: "Our vision for Nascente is rooted in our own childhood, balancing the capable autonomy of our early Montessori education with the absolute magic of our grandmother's storytelling. The moment her stories ended, we would run straight into the woods, turning the forest into a living, breathing extension of our imagination. We built Nascente to pass on that exact same gift — a secure, magical environment where children are trusted with their independence, captivated by beautiful narratives, and given the wild freedom to let nature become part of their own story.",
  },
  inquire: {
    label: "Inquire",
    title: "Three steps.",
    steps: [
      { title: "Fill the short form.", text: "Tell us about your child." },
      { title: "Get to know each other.", text: "We offer a private conversation to see whether Nascente is right for your family, and to answer any questions you might have." },
      { title: "Welcome.", text: "We confirm your place and begin preparing the summer." },
    ],
    note: "We take twenty-four children a week and review each application personally.",
  },
  form: {
    parent: "Parent or guardian name",
    email: "Contact email",
    child: "Child's name",
    birthYear: "Year of birth",
    sessions: "Requested session(s)",
    sessionsHint: "Choose one or more weeks.",
    introducedBy: "Introduced by",
    optional: "optional",
    note: "A brief note",
    notePlaceholder: "Anything you would like us to know — siblings, allergies, questions.",
    consentBefore: "I have read the ",
    consentLink: "privacy notice",
    consentAfter: " and agree to Nascente storing these details to respond to my inquiry.",
    submit: "Send inquiry",
    sending: "Sending…",
    successTitle: "Thank you.",
    successText: "We have received your inquiry and will be in touch personally, very soon.",
    another: "Send another inquiry",
    errorSessions: "Please choose at least one session.",
    error: "We couldn't send your inquiry. Please try again, or write to us directly at",
  },
  contact: {
    label: "Contact",
    title: "It all begins with a conversation.",
  },
  footer: {
    privacy: "Privacy",
    rights: "Nascente Project · Comporta",
  },
  privacy: {
    title: "Privacy notice",
    close: "Close",
    body: [
      "Nascente Project (“we”) is responsible for the personal data you share through this website. You can reach us at info@nascenteproject.com.",
      "What we collect. When you send an inquiry we receive what you enter in the form: your name and email, your child's name and year of birth, the sessions you are interested in, who introduced you, and your note.",
      "Why. Only to respond to your inquiry, arrange a conversation, and — if you choose to join — manage your child's place. The legal basis is your consent and the steps you ask us to take before an agreement.",
      "Where it is kept. Inquiries are stored in a secure database hosted in the European Union (Supabase) and delivered to our inbox by email (Resend). We never sell or share your data for marketing.",
      "How long. We keep inquiries for up to 24 months, unless your child joins Nascente, in which case we keep what is needed for the summer and our legal obligations.",
      "Your rights. You can ask to see, correct or delete your data, or withdraw your consent, at any time by writing to info@nascenteproject.com. You may also lodge a complaint with the Portuguese data protection authority (CNPD).",
      "This website uses no tracking cookies and no analytics. Fonts are served from our own domain.",
    ],
  },
};

export type Copy = typeof en;

const pt: Copy = {
  meta: {
    title: "Nascente Project · Campo de férias de verão privado em Comporta",
    description:
      "A Nascente é um campo de férias de verão privado em Comporta, Portugal. Aprendizagem tátil, inteiramente ao ar livre, entre dunas e pinhais. Sessões de 5 de julho a 3 de setembro de 2027.",
  },
  nav: {
    menu: "Menu",
    close: "Fechar",
    inquire: "Pedir vaga",
    links: [
      ["nascente", "Nascente"],
      ["philosophy", "Filosofia"],
      ["day", "Um dia na Nascente"],
      ["dates", "Datas"],
      ["ages", "Idades"],
      ["people", "As pessoas"],
      ["inquire", "Pedir vaga"],
      ["contact", "Contacto"],
    ],
  },
  hero: {
    place: "Comporta · Portugal",
    title: "Onde tudo começa.",
    sub: "Um campo de férias de verão privado em Comporta, Portugal.",
    dates: "5 de julho – 3 de setembro de 2027",
    cta: "Pedir uma vaga",
    scroll: "Descer",
  },
  nascente: {
    label: "Nascente",
    entry: "nas·cen·te",
    entryNote: "nome feminino — fonte; o lugar onde um rio nasce",
    title: "Onde a água nasce.",
    body: [
      "Nascente: o ponto calmo e intocado onde a água brota da terra pela primeira vez.",
      "A água tem uma dualidade natural e espontânea — a capacidade de ceder com absoluta graça e o poder duradouro de moldar a paisagem à sua volta. O nosso propósito não é moldar, dirigir ou forçar essa corrente, mas proteger a sua origem e dar às crianças a liberdade de encontrarem e apreciarem o seu próprio fluxo.",
    ],
  },
  philosophy: {
    label: "A nossa filosofia",
    title: "A magia simples e selvagem da infância.",
    body: "Acreditamos que o verdadeiro luxo é espaço, tempo e liberdade para explorar. Entre dunas e pinhais, a Nascente protege a magia simples e selvagem da infância através de uma aprendizagem tátil, inteiramente ao ar livre. Criamos um ambiente meticulosamente preparado, onde as crianças não são entretidas de forma passiva, mas cativadas por narrativas bonitas — dando-lhes o espaço tranquilo para que o mundo natural se torne parte da sua própria história.",
  },
  day: {
    label: "Um dia na Nascente",
    title: "Como flui um dia.",
    intro:
      "Cada dia na Nascente segue um ritmo deliberado e suave, que ancora o sistema nervoso e deixa espaço amplo e aberto para a descoberta espontânea.",
    items: [
      { time: "9:30", part: "Chegada", name: "O Começo Lento", text: "Um círculo em comunidade para fazer a transição da pressa do mundo lá fora para a quietude da natureza." },
      { time: "10–12", part: "Manhã", name: "O Ateliê Costeiro", text: "Trabalho imersivo e tátil. Design botânico, construção e orientação no ambiente natural." },
      { time: "12–13", part: "Meio-dia", name: "A Mesa Comum", text: "Um almoço partilhado e nutritivo, e um descanso tranquilo com um livro à sombra dos pinheiros." },
      { time: "13–15", part: "Tarde", name: "A Narrativa", text: "Aventuras extraordinárias, guiadas pela grande história do verão." },
      { time: "15:30", part: "Encerramento", name: "A Âncora", text: "O nosso círculo de encerramento. Um momento para recordar o dia e serenar antes de regressar a casa." },
    ],
  },
  dates: {
    label: "Campo de verão · 2027",
    title: "Nove sessões, de segunda a sexta.",
    groups: [
      { name: "Julho", ids: ["I", "II", "III", "IV"] },
      { name: "Agosto – Setembro", ids: ["V", "VI", "VII", "VIII", "IX"] },
    ],
    session: "Sessão",
    pick: "Pedir vaga para esta semana",
  },
  ages: {
    label: "Idades",
    title: "Três correntes.",
    intro: "Cada criança junta-se à corrente que corresponde à sua idade e segue para a próxima à medida que cresce.",
    ageWord: "anos",
    items: [
      { name: "Nascent", ages: "3–4", text: "Dias suaves e sensoriais, perto do seu mentor." },
      { name: "Brook", ages: "5–6", text: "Pequenos exploradores curiosos, a construir e a descobrir." },
      { name: "River", ages: "7–8", text: "Aventuras maiores, trabalho em equipa e criação." },
    ],
  },
  people: {
    label: "As pessoas",
    title: "Conheça-nos.",
    body: "A nossa visão para a Nascente tem raízes na nossa própria infância, equilibrando a autonomia confiante da nossa educação Montessori com a magia absoluta das histórias da nossa avó. Assim que as suas histórias terminavam, corríamos diretamente para o bosque, transformando a floresta numa extensão viva da nossa imaginação. Criámos a Nascente para transmitir esse mesmo presente — um ambiente seguro e mágico, onde se confia às crianças a sua independência, onde são cativadas por narrativas bonitas e têm a liberdade selvagem de deixar a natureza tornar-se parte da sua própria história.",
  },
  inquire: {
    label: "Pedir vaga",
    title: "Três passos.",
    steps: [
      { title: "Preencha o breve formulário.", text: "Fale-nos sobre a sua criança." },
      { title: "Conhecemo-nos.", text: "Oferecemos uma conversa privada para perceber se a Nascente é a escolha certa para a sua família e responder a todas as suas perguntas." },
      { title: "Bem-vindos.", text: "Confirmamos a vaga e começamos a preparar o verão." },
    ],
    note: "Recebemos vinte e quatro crianças por semana e analisamos cada pedido pessoalmente.",
  },
  form: {
    parent: "Nome do pai, mãe ou encarregado de educação",
    email: "Email de contacto",
    child: "Nome da criança",
    birthYear: "Ano de nascimento",
    sessions: "Sessão(ões) pretendida(s)",
    sessionsHint: "Escolha uma ou mais semanas.",
    introducedBy: "Recomendado por",
    optional: "opcional",
    note: "Uma breve nota",
    notePlaceholder: "Algo que gostaria que soubéssemos — irmãos, alergias, perguntas.",
    consentBefore: "Li o ",
    consentLink: "aviso de privacidade",
    consentAfter: " e aceito que a Nascente guarde estes dados para responder ao meu pedido.",
    submit: "Enviar pedido",
    sending: "A enviar…",
    successTitle: "Obrigado.",
    successText: "Recebemos o seu pedido e entraremos em contacto pessoalmente, muito em breve.",
    another: "Enviar outro pedido",
    errorSessions: "Escolha pelo menos uma sessão.",
    error: "Não foi possível enviar o seu pedido. Tente novamente ou escreva-nos diretamente para",
  },
  contact: {
    label: "Contacto",
    title: "Tudo começa com uma conversa.",
  },
  footer: {
    privacy: "Privacidade",
    rights: "Nascente Project · Comporta",
  },
  privacy: {
    title: "Aviso de privacidade",
    close: "Fechar",
    body: [
      "A Nascente Project (“nós”) é responsável pelos dados pessoais que partilha através deste site. Pode contactar-nos através de info@nascenteproject.com.",
      "O que recolhemos. Quando envia um pedido, recebemos o que escreve no formulário: o seu nome e email, o nome e ano de nascimento da criança, as sessões que lhe interessam, quem o recomendou e a sua nota.",
      "Para quê. Apenas para responder ao seu pedido, combinar uma conversa e — se decidir juntar-se a nós — gerir a vaga da criança. A base legal é o seu consentimento e as diligências que nos pede antes de um acordo.",
      "Onde são guardados. Os pedidos ficam guardados numa base de dados segura alojada na União Europeia (Supabase) e são entregues na nossa caixa de correio por email (Resend). Nunca vendemos nem partilhamos os seus dados para marketing.",
      "Durante quanto tempo. Guardamos os pedidos até 24 meses, salvo se a criança se juntar à Nascente; nesse caso, guardamos o necessário para o verão e para as nossas obrigações legais.",
      "Os seus direitos. Pode pedir para consultar, corrigir ou apagar os seus dados, ou retirar o seu consentimento, a qualquer momento, escrevendo para info@nascenteproject.com. Pode também apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD).",
      "Este site não utiliza cookies de rastreio nem ferramentas de análise. As fontes são servidas a partir do nosso próprio domínio.",
    ],
  },
};

export const COPY: Record<Lang, Copy> = { en, pt };
