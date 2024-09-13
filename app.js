const express = require('express');
const app = express();
const port = 3000;
// 设置静态文件目录
app.use(express.static('client'));
// 这是项目的根目录
app.get('/', (req, res) => {
  
  // res.send('Hello 1World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//Connect to my database
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crowdfunding_db'
});

db.connect(err => {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

// 允许跨域请求（CORS）
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//获取所有活跃的筹款者包括他们的类别
app.get('/api/fundraisers/active', (req, res) => {
  const sql = 'SELECT F.*, C.NAME AS CATEGORY_NAME FROM FUNDRAISER F INNER JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID WHERE F.IS_ACTIVE = 1';
  db.query(sql, (err, result) => {
    if (err) res.status(500).send('Server error');
    res.json(result);
  });
});

//获取所有类别
app.get('/api/categories', (req, res) => {
  const sql = 'SELECT * FROM CATEGORY';
  db.query(sql, (err, result) => {
    if (err) res.status(500).send('Server error');
    res.json(result);
  });
});

//根据条件检索活跃的筹款者
app.get('/api/fundraisers/search', (req, res) => {
  // 你可以通过req.query来获取查询参数，例如req.query.city
  const { city, organizer, categoryId } = req.query;
  let sql = 'SELECT F.*, C.NAME AS CATEGORY_NAME FROM FUNDRAISER F INNER JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID WHERE F.IS_ACTIVE = 1';
  
  const conditions = [];
  if (city) conditions.push(`F.CITY = '${city}'`);
  if (organizer) conditions.push(`F.ORGANIZER = '${organizer}'`);
  if (categoryId) conditions.push(`F.CATEGORY_ID = ${categoryId}`);

  if (conditions.length > 0) {
    sql += ' AND ' + conditions.join(' AND ');
  }

  db.query(sql, (err, result) => {
    if (err) res.status(500).send('Server error');
    res.json(result);
  });
});

//获取筹款活动的详细信息（按ID）这就是一个接口
app.get('/api/fundraisers/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT F.*, C.NAME AS CATEGORY_NAME FROM FUNDRAISER F INNER JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID WHERE F.FUNDRAISE_ID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) res.status(500).send('Server error');
    else if (result.length > 0) res.json(result[0]);
    else res.status(404).send('Fundraiser not found');
  });
});
app.use(express.static('client'));