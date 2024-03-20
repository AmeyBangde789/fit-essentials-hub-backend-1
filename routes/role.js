import express from 'express';
import { createRole, deleteRole, getAllRoles, updateById, updateRole, getById } from '../controllers/role.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create', verifyAdmin, createRole);

router.put('/update/:id', verifyAdmin, updateRole);

router.get('/getAll', getAllRoles);

router.get('/getOne/:id', getById);

router.put('/updateUser/:id', updateById)

router.delete('/deleteRole/:id', deleteRole)



export default router;

