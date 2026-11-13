// ÚNICO archivo que editas para textos, claves y botones.
const CONFIG = {
  // Supabase (Project Settings → API). Usa SOLO la clave "anon public".
  supabaseUrl: "PEGA_AQUI_TU_PROJECT_URL",
  supabaseKey: "PEGA_AQUI_TU_ANON_KEY",

  logo: "img/logo.png",

  // {nombre} y {franja} se reemplazan solos
  saludoNuevo: ["Bienvenido, {nombre} 😊", "Hola, {nombre}, bienvenido 😊"],
  saludoRecurrente: [
    "{franja}, {nombre}, qué gusto verte aquí 😊",
    "{franja}, {nombre}, qué bueno verte de nuevo 👋",
    "{franja}, {nombre}, ya estás de vuelta 😄"
  ],
  preguntaNueva: ["¿Qué deseas hacer hoy?"],
  preguntaRecurrente: ["¿Qué tienes en mente?", "¿Qué vas a hacer hoy?", "¿En qué te ayudo hoy?"],

  franjas: { manana: "Buenos días", tarde: "Buenas tardes", noche: "Buenas noches" },
  nombreSinDatos: "amigo",

  // tipo "pagina": abre una página de tu mini app. tipo "enlace": abre un enlace (telegra.ph).
  botones: [
    { texto: "Ver producto",    tipo: "pagina", destino: "productos.html" },
    { texto: "Soporte",         tipo: "pagina", destino: "soporte.html" },
    { texto: "Más información", tipo: "enlace", destino: "https://telegra.ph/PEGA-TU-PAGINA" }
  ]
};
