import { describe, it, expect, beforeEach } from 'vitest';
import { CreateSpaceUseCase } from './create-space.use-case';
import { InMemorySpacesRepository } from 'test/repositories/in-memory-spaces-repository';
import { makeSpace } from 'test/factories/make-space';

let spacesRepository: InMemorySpacesRepository;
let createSpaceUseCase: CreateSpaceUseCase;

describe('Create Space Use Case', () => {
  beforeEach(() => {
    spacesRepository = new InMemorySpacesRepository();
    createSpaceUseCase = new CreateSpaceUseCase(spacesRepository);
  });

  it('should create a new space', async () => {
    const spaceData = {
      title: 'Piscina Azul',
      description: 'Espaço com piscina aquecida e churrasqueira',
      photos: ['img1.jpg', 'img2.jpg'],
      rules: 'Não é permitido animais',
      hostId: 'host-123',
    };

    const result = await createSpaceUseCase.execute(spaceData);

    expect(result.space).toBeTruthy();
    expect(result.space.title).toBe(spaceData.title);
    expect(result.space.photos).toContain(spaceData.photos[0]);
  });

  it('should create a new space using factory pattern', async () => {
    const spaceData = makeSpace({
      title: 'Piscina com Factory',
      description: 'Espaço criado usando factory pattern',
      hostId: 'host-factory-123',
    });

    const result = await createSpaceUseCase.execute({
      title: spaceData.title,
      description: spaceData.description,
      photos: spaceData.photos,
      rules: spaceData.rules,
      hostId: spaceData.hostId,
    });

    expect(result.space).toBeTruthy();
    expect(result.space.title).toBe(spaceData.title);
    expect(result.space.description).toBe(spaceData.description);
    expect(result.space.hostId).toBe(spaceData.hostId);
  });
});
