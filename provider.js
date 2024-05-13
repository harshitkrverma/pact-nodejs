import express from 'express';

const app = express();
app.get('/provider', (req, res) => {
    res.json({ valid: true });
});
app.listen(8081, () => {
    console.log('Provider service running on http://localhost:8081')
}); 