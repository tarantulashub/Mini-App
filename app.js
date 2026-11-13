// Lógica central: Telegram → usuario → visita → saludo → botones.
const tg = window.Telegram && window.Telegram.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const azar = (lista) => lista[Math.floor(Math.random() * lista.length)];

function franjaDelDia() {
  const h = new Date().getHours();
  if (h < 12) return CONFIG.franjas.manana;
  if (h < 19) return CONFIG.franjas.tarde;
  return CONFIG.franjas.noche;
}

// ---- Modo claro / oscuro ----
const raiz = document.documentElement;
const botonTema = document.getElementById("tema");
function aplicarTema(t) {
  raiz.setAttribute("data-tema", t);
  botonTema.textContent = t === "oscuro" ? "☀️" : "🌙";
  try { localStorage.setItem("tema", t); } catch (_) {}
}
let temaInicial = null;
try { temaInicial = localStorage.getItem("tema"); } catch (_) {}
aplicarTema(temaInicial || (tg && tg.colorScheme === "dark" ? "oscuro" : "claro"));
botonTema.addEventListener("click", () =>
  aplicarTema(raiz.getAttribute("data-tema") === "oscuro" ? "claro" : "oscuro"));

// ---- Logo ----
const logo = document.getElementById("logo");
logo.src = CONFIG.logo;
logo.onerror = () => { logo.style.display = "none"; };

// ---- Botones ----
const contenedor = document.getElementById("botones");
CONFIG.botones.forEach((b) => {
  const el = document.createElement("button");
  el.textContent = b.texto;
  el.addEventListener("click", () => {
    if (b.tipo === "enlace" && tg) tg.openLink(b.destino, { try_instant_view: true });
    else window.location.href = b.destino;
  });
  contenedor.appendChild(el);
});

// ---- Saludo ----
async function iniciar() {
  const user = (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) || { id: 0, first_name: CONFIG.nombreSinDatos };
  const nombre = user.first_name || user.username || CONFIG.nombreSinDatos;
  const visitas = user.id ? await registrarVisita(user) : 1;
  const recurrente = visitas > 1;

  const plantilla = azar(recurrente ? CONFIG.saludoRecurrente : CONFIG.saludoNuevo);
  document.getElementById("saludo").textContent =
    plantilla.replace("{nombre}", nombre).replace("{franja}", franjaDelDia());
  document.getElementById("pregunta").textContent =
    azar(recurrente ? CONFIG.preguntaRecurrente : CONFIG.preguntaNueva);
}
iniciar();
