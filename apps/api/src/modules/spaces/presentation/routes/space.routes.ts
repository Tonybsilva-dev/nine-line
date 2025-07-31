import { Router } from 'express';
import {
  validateCreateSpace,
  validateUpdateSpace,
  validateFindSpaceById,
  validateDeleteSpace,
  validateFindAllSpaces,
} from '../validators';
import { createSpaceController } from '../controllers/create-space.controller';
import { deleteSpaceController } from '../controllers/delete-space.controller';
import { findAllSpacesController } from '../controllers/find-all-spaces.controller';
import { findSpaceByIdController } from '../controllers/find-space-by-id.controller';
import { updateSpaceController } from '../controllers/update-space.controller';

export const spaceRoutes = Router();

spaceRoutes.post('/', validateCreateSpace, createSpaceController);
spaceRoutes.get('/', validateFindAllSpaces, findAllSpacesController);
spaceRoutes.get('/:id', validateFindSpaceById, findSpaceByIdController);
spaceRoutes.put(
  '/:id',
  validateFindSpaceById,
  validateUpdateSpace,
  updateSpaceController,
);
spaceRoutes.delete('/:id', validateDeleteSpace, deleteSpaceController);
