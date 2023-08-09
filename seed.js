require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/item');

(async function() {
  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Spring Collection', sortOrder: 10},
    {name: 'Simplicity Collection', sortOrder: 20},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Simplicity Coasters', image:['https://res.cloudinary.com/dtekuqa73/image/upload/v1691547041/wenandco/simplicity-collection_gjookz.jpg', 'https://res.cloudinary.com/dtekuqa73/image/upload/v1691549860/wenandco/IMG_3971_pntwe4.jpg'], category: categories[1], price: 39.95},
    {name: 'Spring Coasters', image: ['https://res.cloudinary.com/dtekuqa73/image/upload/v1691547080/wenandco/spring-coasters_aqmj3h.png', 'https://res.cloudinary.com/dtekuqa73/image/upload/v1691549703/wenandco/download_gkl2c6.png', 'https://res.cloudinary.com/dtekuqa73/image/upload/v1691549703/wenandco/download_1_m6w2zr.png'], category: categories[0], price: 43.95},
    {name: 'Simplicity Oval Tray', image: ['https://res.cloudinary.com/dtekuqa73/image/upload/v1691547050/wenandco/simplicity-oval-tray_xslxc7.jpg', 'https://res.cloudinary.com/dtekuqa73/image/upload/v1691549912/wenandco/IMG_2450_wm0sod.jpg'], category: categories[1], price: 24.95},
    {name: 'Spring Oval Tray', image: ['https://res.cloudinary.com/dtekuqa73/image/upload/v1691547093/wenandco/pastel-oval-tray_hqkk2p.jpg', 'https://res.cloudinary.com/dtekuqa73/image/upload/v1691547093/wenandco/pastel-oval-tray5_pwfnlc.jpg'], category: categories[0], price: 29.95},
  ]);

  console.log(items)

  process.exit();
})();