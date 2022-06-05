const { getConnection } = require('../../config/database')

const getAllPricesHandler = async (req, res) => {
  try {
    const connection = await getConnection();
    const prices = await connection.query('SELECT id, name, offer_id FROM prices')
    res.json(prices)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getPriceHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const price = await connection.query('SELECT id, name, description, price_value, offer_id FROM prices WHERE id = ?', 
    id)
    console.log('pro', price)
    res.json(price)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
//CAMBIAR PRICES
const getPriceByOfferIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id', id)
    const connection = await getConnection();
    const price = await connection.query(`
    SELECT id, name, description, price_value, offer_id FROM prices WHERE offer_id = ?`, id);
    console.log('passsaaaa')
    if(price.length === 0){
      res.json({ response: 'ho hay prices' })
    }
    console.log('pro', price)
    res.json(price)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const createPriceHandler = async (req, res) => {
  try {
    const { name, description, price_value, offer_id } = req.body;
    if (!name || !price_value || !offer_id) {
      return res.status(422).json({ response: 'Missing values in the body' });
    }

    const price = { name, description, price_value, offer_id }
    const connection = await getConnection();
    const newPrice = await connection.query('INSERT INTO prices SET ?', price)

    return res.status(201).json(newPrice);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deletePriceHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const price = await connection.query('DELETE FROM prices WHERE id = ?', id)
    res.json(price)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllPricesHandler,
  createPriceHandler,
  getPriceHandler,
  deletePriceHandler,
  getPriceByOfferIdHandler
};
  