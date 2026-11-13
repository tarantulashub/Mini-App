// Todo lo de Supabase vive aquí. Devuelve cuántas veces ha entrado el usuario.
async function registrarVisita(user) {
  try {
    const r = await fetch(CONFIG.supabaseUrl + "/rest/v1/rpc/registrar_visita", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: CONFIG.supabaseKey
      },
      body: JSON.stringify({
        p_id: user.id,
        p_username: user.username || null,
        p_nombre: user.first_name || null
      })
    });
    if (!r.ok) throw new Error("Supabase " + r.status);
    return await r.json(); // 1 = nuevo, más de 1 = recurrente
  } catch (e) {
    // Si falla, se usa un contador local para que la página siga funcionando
    try {
      const n = (parseInt(localStorage.getItem("visitas")) || 0) + 1;
      localStorage.setItem("visitas", n);
      return n;
    } catch (_) { return 1; }
  }
}
