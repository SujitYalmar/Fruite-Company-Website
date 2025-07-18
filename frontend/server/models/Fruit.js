const { pool } = require('../config/database');

class Fruit {
  static async create(fruitData) {
    const {
      name, type, quantity, price, location, farmer_id,
      farmer_name, image, description, harvest_date
    } = fruitData;
    
    const [result] = await pool.execute(
      `INSERT INTO fruits (name, type, quantity, price, location, farmer_id, 
       farmer_name, image, description, harvest_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, type, quantity, price, location, farmer_id, farmer_name, image, description, harvest_date]
    );
    
    return result.insertId;
  }

  static async getAll(filters = {}) {
    let query = 'SELECT * FROM fruits WHERE 1=1';
    const params = [];

    if (filters.type) {
      query += ' AND type = ?';
      params.push(filters.type);
    }

    if (filters.location) {
      query += ' AND location LIKE ?';
      params.push(`%${filters.location}%`);
    }

    if (filters.minPrice) {
      query += ' AND price >= ?';
      params.push(filters.minPrice);
    }

    if (filters.maxPrice) {
      query += ' AND price <= ?';
      params.push(filters.maxPrice);
    }

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM fruits WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByFarmerId(farmerId) {
    const [rows] = await pool.execute(
      'SELECT * FROM fruits WHERE farmer_id = ? ORDER BY created_at DESC',
      [farmerId]
    );
    return rows;
  }

  static async update(id, fruitData) {
    const {
      name, type, quantity, price, location,
      image, description, harvest_date, status
    } = fruitData;
    
    const [result] = await pool.execute(
      `UPDATE fruits SET name = ?, type = ?, quantity = ?, price = ?, 
       location = ?, image = ?, description = ?, harvest_date = ?, status = ?
       WHERE id = ?`,
      [name, type, quantity, price, location, image, description, harvest_date, status, id]
    );
    
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM fruits WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getStats(farmerId = null) {
    let query = `
      SELECT 
        COUNT(*) as total_listings,
        COUNT(CASE WHEN status = 'available' THEN 1 END) as active_listings,
        SUM(price * quantity) as potential_revenue,
        AVG(price) as avg_price
      FROM fruits
    `;
    
    const params = [];
    if (farmerId) {
      query += ' WHERE farmer_id = ?';
      params.push(farmerId);
    }

    const [rows] = await pool.execute(query, params);
    return rows[0];
  }
}

module.exports = Fruit;