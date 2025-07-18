const { pool } = require('../config/database');

class Inquiry {
  static async create(inquiryData) {
    const { buyer_id, fruit_id, message, quantity } = inquiryData;
    
    const [result] = await pool.execute(
      'INSERT INTO inquiries (buyer_id, fruit_id, message, quantity) VALUES (?, ?, ?, ?)',
      [buyer_id, fruit_id, message, quantity]
    );
    
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT i.*, u.name as buyer_name, u.email as buyer_email,
             f.name as fruit_name, f.farmer_name
      FROM inquiries i
      JOIN users u ON i.buyer_id = u.id
      JOIN fruits f ON i.fruit_id = f.id
      ORDER BY i.created_at DESC
    `);
    return rows;
  }

  static async findByFarmerId(farmerId) {
    const [rows] = await pool.execute(`
      SELECT i.*, u.name as buyer_name, u.email as buyer_email,
             f.name as fruit_name
      FROM inquiries i
      JOIN users u ON i.buyer_id = u.id
      JOIN fruits f ON i.fruit_id = f.id
      WHERE f.farmer_id = ?
      ORDER BY i.created_at DESC
    `, [farmerId]);
    return rows;
  }

  static async findByBuyerId(buyerId) {
    const [rows] = await pool.execute(`
      SELECT i.*, f.name as fruit_name, f.farmer_name, f.price
      FROM inquiries i
      JOIN fruits f ON i.fruit_id = f.id
      WHERE i.buyer_id = ?
      ORDER BY i.created_at DESC
    `, [buyerId]);
    return rows;
  }

  static async updateStatus(id, status) {
    const [result] = await pool.execute(
      'UPDATE inquiries SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Inquiry;