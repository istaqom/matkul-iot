const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const { addListener } = require("nodemon");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM attendance`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// async function check(attendance) {
//   try {
//     `SELECT`
//   } catch (error) {
    
//   }
// }

async function create(attendance) {
  try {
    const id_user = await db.query(
      `SELECT * FROM user WHERE rfid_id = '${attendance.rfid}'`
    );
    console.log(id_user);
    const insert_data = await db.query(
      `INSERT INTO absensi(id_user) VALUES("${id_user[0]["id"]}")`
    );
    console.log("Created");

    const inserted_data = await db.query(
      `SELECT user.nama_user, absensi.tanggal FROM absensi JOIN user ON user.id = absensi.id_user WHERE absensi.id = '${insert_data.insertId}'`
    );

    console.log(inserted_data[0]);

    let tanggal = new Date(inserted_data[0].tanggal);
    let hours = tanggal.getHours();
    let minutes = tanggal.getMinutes();

    // Pad the hours and minutes with leading zeros if they are less than 10
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let timeString = hours + ":" + minutes; // "00:24"

    const result = {
      nama_user: inserted_data[0].nama_user,
      waktu: timeString,
    };

    console.log(result);

    return result;
  } catch (err) {
    console.log("error");
    console.log(err);
    return;
  }
}

module.exports = {
  getMultiple,
  create,
};
