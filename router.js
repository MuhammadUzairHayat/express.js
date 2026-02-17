import { Router } from 'express';
import { searchController, usernameController } from './controller.js';

const router = Router()

// ======================
//  Query String (must be before dynamic route)
// ======================
router.get("/search", searchController);

// ======================
//  Dynamic Routing
// ======================
router.get("/:username", usernameController);

// ======================
//  Post method
// ======================

export default router;