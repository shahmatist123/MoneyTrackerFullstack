const db = require('./../db')
exports.add = async (req, res) => {
    try {
        const { name, is_positive } = req.body;
        const result = await db.query(
            'INSERT INTO moneydb.categories (name, is_positive) VALUES ($1, $2) RETURNING *',
            [name, is_positive]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}
exports.get = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM moneydb.categories');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, is_positive } = req.body;
        const result = await db.query(
            'UPDATE moneydb.categories SET name = $1, is_positive = $2 WHERE id = $3 RETURNING *',
            [name, is_positive, id]
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
        await db.query('DELETE FROM moneydb.categories WHERE id = $1', [id]);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}