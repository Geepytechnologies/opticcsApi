const db = require("../../config/db");

const createACadre = (req, res, next) => {
  const { value } = req.body;
  try {
    const q = `INSERT INTO cadre (cadre_name) VALUES ('${value}');
      `;
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

const updateACadre = (req, res, next) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    const q = `UPDATE cadre SET cadre_name = '${value}' WHERE id = '${id}';
      `;
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

const deleteACadre = (req, res, next) => {
  const { id } = req.params;
  try {
    const q = `DELETE FROM cadre WHERE id = '${id}';
      `;
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { deleteACadre, updateACadre, createACadre };
