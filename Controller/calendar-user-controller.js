const response = require('./../response')
const db = require("../db");
exports.add = async (req, res) => {
    try {
        const { name} = req.body;
        const result = await db.query(
            'INSERT INTO moneydb.calendarusers (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}
exports.get = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM moneydb.calendarusers');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = await db.query(
            'UPDATE moneydb.calendarusers SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM moneydb.calendarusers WHERE id = $1', [id]);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}
