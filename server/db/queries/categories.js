import db from "../client.js";

export async function getAllCategories(){
    const SQL = `
    SELECT *
    FROM categories
    `;
      const { rows : categories } = await db.query(SQL);
    return categories;
}

export async function createCategory(name){
    const SQL = `
    INSERT INTO categories
    (name)
    VALUES
    ($1)
    RETURNING *
    `;
    const {
        rows: [category],
    } = await db.query(SQL, [name]);
    return category;
}