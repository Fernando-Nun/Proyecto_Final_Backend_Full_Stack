const { ReclusosRepository } = require('../repositories/reclusos.repository');
const { validarRecluso } = require('../domain/reclusos.rules');

const repo = new ReclusosRepository();

async function getAll(req, res) {
  const reclusos = await repo.getAll();
  console.log(reclusos)
  return res.json(reclusos)
}

async function getAllVisible(req, res) {
  const reclusos = await repo.getAllActive()
  return res.json(reclusos)
}

async function getById(req, res) {
  const id = Number(req.params.id)
  const recluso = await repo.getById(id)

  if (!recluso) {
    return res.status(404).json({error: 'Recluso no encontrado'})
  }

  return res.json(recluso)
}

async function create(req, res) {
  const { nombre, delito, estado } = req.body;
  const data = validarRecluso(nombre, delito, estado);

  if (data.error) {
    return res.status(400).json(data.error);
  }

  const nuevo = await repo.create(data.data.nombre, data.data.delito, data.data.estado)
  return res.status(201).json(nuevo)
}

async function update(req, res) {
  const id = Number(req.params.id);
  const { nombre, delito, estado } = req.body;

  const payload = {
    nombre: nombre !== undefined ? nombre : undefined,
    delito: delito !== undefined ? delito : undefined,
    estado: estado !== undefined ? estado : undefined
  }

  if (payload.estado !== undefined && !["Activo", "Liberado"].includes(payload.estado)) {
    return res.status(400).json({error:'estado inválido'})
  }

  if (payload.nombre !== undefined && typeof payload.nombre !== 'string') {
    return res.status(400).json({error:'nombre inválido'})
  }

  if (payload.delito !== undefined && typeof payload.delito !== 'string') {
    return res.status(400).json({error:'delito inválido'})
  }
  
  const actualizado = await repo.update(id, payload)

  if (!actualizado) {
    return res.status(404).json({error: 'No encontrado'})
  }

  return res.json(actualizado)
}

async function remove(req, res) {
  const id = Number(req.params.id);

  const ok = await repo.delete(id)

  if (!ok) {
    return res.status(404).json({error: 'No encontrado'})
  }

  return res.status(204).send()
}


module.exports = { getAll, getAllVisible, getById, create, update, remove }