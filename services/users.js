const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM user`
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

async function create(user) {
  try {
    const result = await db.query(
      `INSERT INTO user(nama_user, rfid_id) VALUES("${user.nama_user}", "${user.rfid_id}")`
    );
    console.log("User Created");
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
}

module.exports = {
  getMultiple,
  create,
};
