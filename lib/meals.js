import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';
import sql from 'better-sqlite3';
const db = sql('meals.db');
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error('Loading meal failed');
  return db.prepare('SELECT* FROM meals').all();
}
export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  // console.log(meal.image);
  const extension = meal.image.name.split('.').pop();
  const filename = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed');
    }
  });
  meal.image = `/images/${filename}`;
  db.prepare(
    `INSERT INTO meals (title,summary,instructions,creator,creator_email,image,slug)
     VALUES (
       @title,
       @summary,
       @instructions,
       @creator,
       @creator_email,
       @image,
       @slug
      )`
  ).run(meal);
}
