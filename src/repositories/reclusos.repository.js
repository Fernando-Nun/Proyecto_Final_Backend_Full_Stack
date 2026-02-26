const { pool } = require('../db');

class ReclusosRepository {

    async getAll() {
        const result = await pool.query('SELECT * FROM reclusos');
        return result.rows;
    }

    async getAllActive() {
    const result = await pool.query(
      'SELECT * FROM reclusos WHERE estado = $1', ['Activo']
    );
    return result.rows;
  }

  async getById(id) {
    const result = await pool.query(
      'SELECT * FROM reclusos WHERE id = $1;', [id]
    );
    return result.rows[0];
  }

  async create(nombre, delito, estado) {
    const result = await pool.query(
      'INSERT INTO reclusos (nombre, delito, estado) VALUES ($1,$2, $3) RETURNING id, nombre, delito, estado;',[nombre, delito, estado] 
    );
    return result.rows[0];
  }

  async update(id, data) {
    const result = await pool.query(
      'UPDATE reclusos SET nombre = coalesce($1, nombre), delito = coalesce($2, delito), estado = coalesce($3, estado) WHERE id = $4 RETURNING id, nombre, delito, estado', [data.nombre ?? null, data.delito ?? null, data.estado ?? null, id]
    );
    return result.rows[0] || null;
  }

  async delete(id) {
    const result = await pool.query(
      'DELETE FROM reclusos WHERE id = $1 RETURNING id', [id]
    );
    return result.rows[0] || null;
  }
}

module.exports = { ReclusosRepository }