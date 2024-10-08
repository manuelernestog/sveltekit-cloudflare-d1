import fs from "fs";

const productData = [
  { product_id: 1, name: "Apple", price: 250 },
  { product_id: 2, name: "Banana", price: 100 },
  { product_id: 3, name: "Cherry", price: 375 },
];

const generateInsertSQL = (tableName, data) => {
  const columns = Object.keys(data[0]).join(", ");
  const values = data
    .map(
      (row) =>
        `(${Object.values(row)
          .map((value) => (typeof value === "string" ? `'${value}'` : value))
          .join(", ")})`
    )
    .join(", ");
  const sql = `INSERT INTO "${tableName}" (${columns}) VALUES ${values}; \n`;
  return sql;
};

let sqlString = generateInsertSQL("products", productData);

fs.writeFileSync("seeds.sql", sqlString, "utf-8");
console.log("Generated SQL file saved as seeds.sql");
