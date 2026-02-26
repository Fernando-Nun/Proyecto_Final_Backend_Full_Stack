function validarRecluso(nombre, delito, estado) {
 if (!nombre || typeof nombre !== 'string') {
    return {ok: false, error: 'Nombre inválido'}
 }   

 if (!delito || typeof delito !== 'string') {
    return {ok: false, error: 'Delito inválido'}
 }

 if (!estado) {
   estado = 'Activo';
 }
 
 if (typeof estado !== 'string' || !["Activo", "Liberado"].includes(estado)) {
    return {ok: false, error: 'Estado inválido'}
 }
 return { ok: true, data: { nombre, delito, estado } };
}

module.exports = { validarRecluso }