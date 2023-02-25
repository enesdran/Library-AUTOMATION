import React, { useState } from "react";

import "./App.css";
import Axios from "axios";
import { Navbar, NavbarBrand } from "reactstrap";

function App() {
  const [KitapName, setKitapName] = useState("");
  const [KitapYazarı, setKitapYazarı] = useState("");
  const [KitapAçıklama, setKitapAçıklama] = useState("");
  const [id, setID] = useState("");

  const [list, setlist] = useState([]);

  const isbuton = id === "";
  const silbuton = id === "";

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/api/get").then((response) => { // Bütün Verileri Ekrana yazdırmak için Kullanılır.
  //     setmovilist(response.data.result);
  //   });
  // }, []);

  const submitara = () => {
    setID("");
    if (id) {
      // id varsa sartlı arama yap
      Axios.get(`http://localhost:3001/api/gelsin?id=${id}`).then(
        (response) => {
          setlist(response.data.result);
        }
      );
    } else {
      // id yoksa tum kayitlari getir
      Axios.get("http://localhost:3001/api/gelsin").then((response) => {
        setlist(response.data.result);
      });
    }
  };

  const submitekle = () => {
    setKitapName("");
    setKitapYazarı("");
    setKitapAçıklama("");
    Axios.post("http://localhost:3001/api/ekle", {
      KitapName: KitapName,
      KitapYazarı: KitapYazarı,
      KitapAçıklama: KitapAçıklama,
    }).then(() => {
      alert("subccesful");
    });
  };

  const submitgün = () => {
    setID('');
    setKitapAçıklama("");
    Axios.put("http://localhost:3001/api", {
      id: id,
      KitapAçıklama: KitapAçıklama,
    })
      .then(() => {
        alert("Güncelleme işlemi başarılı");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitSil = () => {
    setID("");
    Axios.delete("http://localhost:3001/api/delete", {
      data: {
        id: id,
      },
    })
      .then(() => {
        alert("Silme işlemi başarılı");
      })
      .catch((error) => {
        console.log(error);
        alert("Silme işlemi başarısız oldu");
      });
  };

  return (
    <div className="App">
      <Navbar className="my-2" color="dark" dark>
        <NavbarBrand href="/">
          <h3>Kütüphane Sistemi</h3>
        </NavbarBrand>
      </Navbar>

      <div className="from">
        <label>Kitap Name:</label>
        <input
          className="input1"
          type="text"
          name="KitapName"
          value={KitapName}
          autoFocus
          onChange={(e) => {
            setKitapName(e.target.value);
          }}
        ></input>
        <label >Kitap Yazarı:</label>
        <input
          className="input2"
          type="text"
          name="KitapYazarı"
          value={KitapYazarı}
          autoFocus
          onChange={(e) => {
            setKitapYazarı(e.target.value);
          }}
        ></input>
        <label>Sayfa Açıklaması:</label>
        <input
          className="input3"
          type="text"
          name="KitapAçıklama"
          value={KitapAçıklama}
          autoFocus
          onChange={(e) => {
            setKitapAçıklama(e.target.value);
          }}
        ></input>

        <button className="ekle" onClick={submitekle}>
          Ekle
        </button>
        <thead>
          <button className="sil" onClick={submitSil} disabled={silbuton}>
            Sil
          </button>
          <input
            className="idekleme"
            type="text"
            placeholder="id"
            maxLength="3"
            name="id"
            value={id}
            onChange={(e) => setID(e.target.value)}
            autoFocus
          />
          <button className="güncelle" onClick={submitgün} disabled={isbuton}>
            Güncelle
          </button>
        </thead>

        <button className="arama" onClick={submitara}>
          Bütün Veriler Getir / Arama
        </button>

        <table className="tabloveri" size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Kitap Name</th>
              <th>Kitap Yazarı </th>
              <th>Kitap Açıklama</th>
            </tr>
          </thead>

          {list.map((val) => {
            return (
              <tbody key={val.id}>
                <tr>
                  <th scope="row">{val.id}</th>
                  <td>{val.KitapName}</td>
                  <td>{val.KitapYazarı}</td>
                  <td className="yazı">{val.KitapAçıklama}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
