const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "database",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/api/get", (req, res) => {
//   const sqlEkle = "SELECT * FROM kütüphane.kitap;";
//   db.query(sqlEkle, (err, result) => {
//     res.send({ result });
//   });
// });

// app.get("/api/g", (req, res) => {
//   const id = req.query.id;

//   const sqlEkle = "SELECT * FROM kütüphane.kitap WHERE id LIKE ?;";
//   db.query(sqlEkle, id, (err, result) => {
//     res.send({result});
//   });
// });

app.get("/api/gelsin", (req, res) => {
  const { id } = req.query;

  let sqlEkle = "SELECT * FROM kütüphane.kitap";

  // id varsa sorguya id parametresini ekle

  if (id) {
    sqlEkle += " WHERE id LIKE ?";
  }

  db.query(sqlEkle, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send({ result });
      console.log(result);
    }
  });
});

app.post("/api/ekle", (req, res) => {
  const KitapName = req.body.KitapName;
  const KitapYazarı = req.body.KitapYazarı;
  const KitapAçıklama = req.body.KitapAçıklama;

  const sqlEkle =
    "INSERT INTO kütüphane.kitap(KitapName, KitapYazarı, KitapAçıklama) VALUES (?,?,?)";
  db.query(sqlEkle, [KitapName, KitapYazarı, KitapAçıklama], (err, result) => {
    console.log(result);
  });
});

app.put("/api", (req, res) => {
  const id = req.body.id;
  const KitapAçıklama = req.body.KitapAçıklama;

  const sqlSorgu = "UPDATE kütüphane.kitap SET  KitapAçıklama = ? WHERE id = ?";

  db.query(sqlSorgu, [KitapAçıklama, id], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete", (req, res) => {
  const id = req.body.id;

  const sqlsil = "DELETE FROM kütüphane.kitap WHERE id = ?";
  db.query(sqlsil, id, (err, result) => {
    console.log(result);
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
