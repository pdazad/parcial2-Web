/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/errors/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { UsuarioService } from './usuario.service';


describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuarioList: UsuarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    usuarioList = [];
    for (let i = 0; i < 5; i++) {
      const usuario: UsuarioEntity = await repository.save({
        nombre: faker.company.name(),
        telefono: faker.phone.number(),
      });
      usuarioList.push(usuario);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all usuarios', async () => {
    const usuarios: UsuarioEntity[] = await service.findAll();
    expect(usuarios).not.toBeNull();
    expect(usuarios).toHaveLength(usuarioList.length);
  });

  it('findOne should return a usuario by id', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];
    const usuario: UsuarioEntity = await service.findOne(
      storedUsuario.id,
    );
    expect(usuario).not.toBeNull();
    expect(usuario.nombre).toEqual(storedUsuario.nombre);
    expect(usuario.telefono).toEqual(storedUsuario.telefono);
  });

  it('findOne should throw an error if usuario does not exist', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The usuario with the given id was not found',
    );
  });

  it('create should create a new usuario', async () => {
    const usuario: UsuarioEntity = {
      id: '',
      nombre: faker.company.name(),
      telefono: '3015522084',
      fotos: [],
      redSocial: null,
    };

    const newUsuario: UsuarioEntity = await service.create(usuario);
    expect(newUsuario).not.toBeNull();
  
    const storedUsuario: UsuarioEntity = await repository.findOne({
      where: { id: newUsuario.id },
    });
    expect(storedUsuario).not.toBeNull();
    expect(storedUsuario.nombre).toEqual(usuario.nombre);
    expect(storedUsuario.telefono).toEqual(usuario.telefono);
  });

  it('create should throw an error if the telefono does not contain exactly 10 characters', async () => {
    const usuario: UsuarioEntity = {
      id: '',
      nombre: faker.company.name(),
      telefono: faker.phone.number(),
      fotos: [],
      redSocial: null,
    };

    await expect(() => service.create(usuario)).rejects.toHaveProperty(
      'message',
      "The usuario's telefono must have exactly 10 characters",
    );
    
  });

  it('update should update an existing usuario', async () => {
    const usuario: UsuarioEntity = usuarioList[0];
    usuario.nombre = 'New Name';

    const updatedUsuario: UsuarioEntity = await service.update(
      usuario.id,
      usuario,
    );
    expect(updatedUsuario).not.toBeNull();

    const storedUsuario: UsuarioEntity = await repository.findOne({
      where: { id: updatedUsuario.id },
    });
    expect(storedUsuario).not.toBeNull();
    expect(storedUsuario.nombre).toEqual(usuario.nombre);
  });

  it('update should throw an error if usuario does not exist', async () => {
    let usuario: UsuarioEntity = usuarioList[0];
    usuario = {
      ...usuario,
      nombre: 'New Name',
    };
    await expect(() => service.update('0', usuario)).rejects.toHaveProperty(
      'message',
      'The usuario with the given id was not found',
    );
  });

  it('delete should delete an existing usuario', async () => {
    const usuario: UsuarioEntity = usuarioList[0];
    await service.delete(usuario.id);
    const deletedUsuario: UsuarioEntity = await repository.findOne({
      where: { id: usuario.id },
    });
    expect(deletedUsuario).toBeNull();
  });

});
