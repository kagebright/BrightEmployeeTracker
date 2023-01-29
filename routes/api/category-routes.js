const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product
        }
      ],
    });
    res.status(200).json(categoryData);
  }catch (err) {
  console.error(err);
  res.status(500).json({message: 'Error retrieving categories'});
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product
        }
      ]
    });
    res.status(200).json(categotyData);
  } catch (err) {
  console.error(err);
  res.status(500).json({message: 'Error retrieving categories'});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Error creating a new category'});
  }
  });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const [updated] = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (updated) {
      const updatedCategory = await Category.findByPk(req.params.id);
      res.json(updatedCategory);
    } else {
      res.status(404).json({message: 'Category not found'})
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Error updating category'})
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (deleted) {
      res.json({message: 'Category deleted'});
    } else {
      res.status(404).json({message: 'Category not found'})
    }
  } catch (err) {
    console.error(err);
    res.status(500).json
  }
});

module.exports = router;
