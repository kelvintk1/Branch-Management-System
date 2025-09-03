const express = require('express');
const Branch = require('../models/branchModel');
const BranchController = require('../controllers/branchController');

const router = express.Router();
const branchController = new BranchController(Branch);

router.post('/', (req, res) => branchController.createBranch(req, res));
router.get('/', (req, res) => branchController.getAllBranches(req, res));
router.get('/:id', (req, res) => branchController.getBranchById(req, res));
router.put('/:id', (req, res) => branchController.updateBranch(req, res));
router.delete('/:id', (req, res) => branchController.deleteBranch(req, res));

module.exports = router;
