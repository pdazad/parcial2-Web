/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/errors/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AlbumEntity } from './album.entity/album.entity';
import { AlbumService } from './album.service';


describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    albumList = [];
    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await repository.save({
        titulo: faker.company.name(),
        fechaInicio: new Date(),
        fechaFin: new Date(),
      });
      albumList.push(album);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all albums', async () => {
    const albums: AlbumEntity[] = await service.findAll();
    expect(albums).not.toBeNull();
    expect(albums).toHaveLength(albumList.length);
  });

  it('findOne should return a album by id', async () => {
    const storedAlbum: AlbumEntity = albumList[0];
    const album: AlbumEntity = await service.findOne(
      storedAlbum.id,
    );
    expect(album).not.toBeNull();
    expect(album.titulo).toEqual(storedAlbum.titulo);
    expect(album.fechaInicio).toEqual(storedAlbum.fechaInicio);
    expect(album.fechaFin).toEqual(storedAlbum.fechaFin);
  });

  it('findOne should throw an error if album does not exist', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The album with the given id was not found',
    );
  });

  it('create should create a new album', async () => {
    const album: AlbumEntity = {
      id: '',
      titulo: faker.company.name(),
      fechaInicio: new Date(),
      fechaFin: new Date(),
      fotos: [],
    };

    const newAlbum: AlbumEntity = await service.create(album);
    expect(newAlbum).not.toBeNull();
  
    const storedAlbum: AlbumEntity = await repository.findOne({
      where: { id: newAlbum.id },
    });
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.titulo).toEqual(album.titulo);
    expect(storedAlbum.fechaInicio).toEqual(album.fechaInicio);
    expect(storedAlbum.fechaFin).toEqual(album.fechaFin);
  });

  it('update should update an existing album', async () => {
    const album: AlbumEntity = albumList[0];
    album.titulo = 'New Name';

    const updatedAlbum: AlbumEntity = await service.update(
      album.id,
      album,
    );
    expect(updatedAlbum).not.toBeNull();

    const storedAlbum: AlbumEntity = await repository.findOne({
      where: { id: updatedAlbum.id },
    });
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.titulo).toEqual(album.titulo);
  });

  it('update should throw an error if album does not exist', async () => {
    let album: AlbumEntity = albumList[0];
    album = {
      ...album,
      titulo: 'New Name',
    };
    await expect(() => service.update('0', album)).rejects.toHaveProperty(
      'message',
      'The album with the given id was not found',
    );
  });

  it('delete should delete an existing album', async () => {
    const album: AlbumEntity = albumList[0];
    await service.delete(album.id);
    const deletedAlbum: AlbumEntity = await repository.findOne({
      where: { id: album.id },
    });
    expect(deletedAlbum).toBeNull();
  });

});
