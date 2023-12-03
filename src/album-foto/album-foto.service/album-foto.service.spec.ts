/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FotoEntity } from '../../foto/foto.entity/foto.entity';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../../album/album.entity/album.entity';
import { TypeOrmTestingConfig } from '../../shared/errors/testing-utils/typeorm-testing-config';
import { AlbumFotoService } from './album-foto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
describe('AlbumFotoService', () => {
  let service: AlbumFotoService;
  let albumRepository: Repository<AlbumEntity>;
  let fotoRepository: Repository<FotoEntity>;
  let album: AlbumEntity;
  let fotosList : FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumFotoService],
    }).compile();

    service = module.get<AlbumFotoService>(AlbumFotoService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    fotoRepository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    fotoRepository.clear();
    albumRepository.clear();

    fotosList = [];
    for(let i = 0; i < 5; i++){
        const foto: FotoEntity = await fotoRepository.save({
          iso: 300, // Definir valores de prueba para iso, velObturacion, y apertura
          velObturacion: 20,
          apertura: 10,
          fecha: new Date(),
        })
        fotosList.push(foto);
    }

    album = await albumRepository.save({
        titulo: faker.company.name(),
        fechaInicio: new Date(),
        fechaFin: new Date(),
        fotos: fotosList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addFotoAlbum should thrown exception for an invalid foto', async () => {
    const newAlbum: AlbumEntity = await albumRepository.save({
        titulo: faker.company.name(),
        fechaInicio: new Date(),
        fechaFin: new Date(),
    })

    await expect(() => service.addFotoAlbum(newAlbum.id, "0")).rejects.toHaveProperty("message", "The foto with the given id was not found");
  });

  it('addFotoAlbum should throw an exception for an invalid album', async () => {
    const newFoto: FotoEntity = await fotoRepository.save({
        iso: 300, // Definir valores de prueba para iso, velObturacion, y apertura
        velObturacion: 20,
        apertura: 10,
        fecha: new Date(),
    });

    await expect(() => service.addFotoAlbum("0", newFoto.id)).rejects.toHaveProperty("message", "The album with the given id was not found");
  });

  it('findFotoByAlbumIdFotoId should return foto by album', async () => {
    const foto: FotoEntity = fotosList[0];
    const storedFoto: FotoEntity = await service.findFotoByAlbumIdFotoId(album.id, foto.id, )
    expect(storedFoto).not.toBeNull();
    expect(storedFoto.apertura).toBe(foto.apertura);
    expect(storedFoto.velObturacion).toBe(foto.velObturacion);
    expect(storedFoto.iso).toBe(foto.iso);
    expect(storedFoto.fecha).toEqual(foto.fecha);

  });

  it('findFotoByAlbumIdFotoId should throw an exception for an invalid foto', async () => {
    await expect(()=> service.findFotoByAlbumIdFotoId(album.id, "0")).rejects.toHaveProperty("message", "The foto with the given id was not found"); 
  });

  it('findFotoByAlbumIdFotoId should throw an exception for an invalid album', async () => {
    const foto: FotoEntity = fotosList[0]; 
    await expect(()=> service.findFotoByAlbumIdFotoId("0", foto.id)).rejects.toHaveProperty("message", "The album with the given id was not found"); 
  });

  it('findFotoByAlbumIdFotoId should throw an exception for a foto not associated to the album', async () => {
    const newFoto: FotoEntity = await fotoRepository.save({
        iso: 300, // Definir valores de prueba para iso, velObturacion, y apertura
        velObturacion: 20,
        apertura: 10,
        fecha: new Date(),
    });

    await expect(()=> service.findFotoByAlbumIdFotoId(album.id, newFoto.id)).rejects.toHaveProperty("message", "The foto with the given id is not associated to the album"); 
  });

  it('findFotosByAlbumId should return fotos by album', async ()=>{
    const fotos: FotoEntity[] = await service.findFotosByAlbumId(album.id);
    expect(fotos.length).toBe(5)
  });

  it('findFotosByAlbumId should throw an exception for an invalid album', async () => {
    await expect(()=> service.findFotosByAlbumId("0")).rejects.toHaveProperty("message", "The album with the given id was not found"); 
  });

  it('associateFotosAlbum should update fotos list for a album', async () => {
    const newFoto: FotoEntity = await fotoRepository.save({
        iso: 300, // Definir valores de prueba para iso, velObturacion, y apertura
        velObturacion: 20,
        apertura: 10,
        fecha: new Date(),
    });

    const updatedAlbum: AlbumEntity = await service.associateFotosAlbum(album.id, [newFoto]);
    expect(updatedAlbum.fotos.length).toBe(1);
    expect(updatedAlbum.fotos[0]).not.toBeNull();
    expect(updatedAlbum.fotos[0].apertura).toBe(newFoto.apertura);
    expect(updatedAlbum.fotos[0].velObturacion).toBe(newFoto.velObturacion);
    expect(updatedAlbum.fotos[0].iso).toBe(newFoto.iso);
    expect(updatedAlbum.fotos[0].fecha).toEqual(newFoto.fecha);
  });

  it('associateFotosAlbum should throw an exception for an invalid album', async () => {
    const newFoto: FotoEntity = await fotoRepository.save({
        iso: 300, // Definir valores de prueba para iso, velObturacion, y apertura
        velObturacion: 20,
        apertura: 10,
        fecha: new Date(),
    });

    await expect(()=> service.associateFotosAlbum("0", [newFoto])).rejects.toHaveProperty("message", "The album with the given id was not found"); 
  });

  it('associateFotosAlbum should throw an exception for an invalid foto', async () => {
    const newFoto: FotoEntity = fotosList[0];
    newFoto.id = "0";

    await expect(()=> service.associateFotosAlbum(album.id, [newFoto])).rejects.toHaveProperty("message", "The foto with the given id was not found"); 
  });

  it('deleteFotoAlbum should remove an foto from a album', async () => {
    const foto: FotoEntity = fotosList[0];
    
    await service.deleteFotoAlbum(album.id, foto.id);

    const storedAlbum: AlbumEntity = await albumRepository.findOne({where: {id: album.id}, relations: ["fotos"]});
    const deletedFoto: FotoEntity = storedAlbum.fotos.find(a => a.id === foto.id);

    expect(deletedFoto).toBeUndefined();

  });

  it('deleteFotoAlbum should thrown an exception for an invalid foto', async () => {
    await expect(()=> service.deleteFotoAlbum(album.id, "0")).rejects.toHaveProperty("message", "The foto with the given id was not found"); 
  });

  it('deleteFotoAlbum should thrown an exception for an invalid album', async () => {
    const foto: FotoEntity = fotosList[0];
    await expect(()=> service.deleteFotoAlbum("0", foto.id)).rejects.toHaveProperty("message", "The album with the given id was not found"); 
  });

  it('deleteFotoAlbum should thrown an exception for an non asocciated foto', async () => {
    const newFoto: FotoEntity = await fotoRepository.save({
        iso: 300, // Definir valores de prueba para iso, velObturacion, y apertura
        velObturacion: 20,
        apertura: 10,
        fecha: new Date(),
    });

    await expect(()=> service.deleteFotoAlbum(album.id, newFoto.id)).rejects.toHaveProperty("message", "The foto with the given id is not associated to the album"); 
  }); 

});