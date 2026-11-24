
import * as SQLite from 'expo-sqlite';

let dbInstance = null;

async function abrirConexao() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('frota.db');
  }
  return dbInstance;
}

export async function iniciarTabela() {
  try {
    const db = await abrirConexao();
    const sql = `
      CREATE TABLE IF NOT EXISTS veiculos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        modelo TEXT NOT NULL,
        ano INTEGER NOT NULL,
        diaria FLOAT NOT NULL
      );
    `;

    return await db.execAsync(sql);

  } catch(error) {
    console.error('Falha ao criar a tabela: ', error);
    throw error;
  }
}

export async function inserir(veiculo) {
  try {
    const db = await abrirConexao();
    const sql = `
      INSERT INTO veiculos (modelo, ano, diaria)
      VALUES (?, ?, ?);
    `;

    return await db.runAsync(sql, [
      veiculo.modelo,
      veiculo.ano,
      veiculo.diaria
    ]);

  } catch(error) {
    console.error('Falha ao inserir veículo: ', error);
    throw error;
  }
}

export async function listar() {
  try {
    const db = await abrirConexao();
    const sql = 'SELECT * FROM veiculos;';
    return await db.getAllAsync(sql);

  } catch(error) {
    console.error('Falha ao buscar veículos: ', error);
    return [];
  }
}

export async function atualizar(veiculo) {
  try {
    const db = await abrirConexao();
    const sql = `
      UPDATE veiculos
      SET modelo = ?, ano = ?, diaria = ?
      WHERE id = ?;
    `;

    return await db.runAsync(sql, [
      veiculo.modelo,
      veiculo.ano,
      veiculo.diaria,
      veiculo.id
    ]);

  } catch(error) {
    console.error('Falha ao atualizar veículo: ', error);
    throw error;
  }
}

export async function excluir(id) {
  try {
    const db = await abrirConexao();
    const sql = 'DELETE FROM veiculos WHERE id = ?;';
    return await db.runAsync(sql, [id]);

  } catch(error) {
    console.error('Falha ao excluir veículo: ', error);
    throw error;
  }
}
