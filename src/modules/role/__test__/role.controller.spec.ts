import { RoleController } from '@app/modules/role/role.controller';
import { RoleService } from '@app/modules/role/role.service';
import { RoleRepository } from '@app/modules/role/role.repository';
import { RoleEntity } from '@app/db/entities/role.entity';

describe('RoleController', () => {
  let roleController: RoleController;
  let roleService: RoleService;
  let roleRepository: RoleRepository;

  beforeEach(() => {
    roleRepository = new RoleRepository();
    roleService = new RoleService(roleRepository);
    roleController = new RoleController(roleService);
  });

  it('should be defined', () => {
    expect(roleController).toBeDefined();
  });
  describe('createRole', () => {
    it('should return a new role', async () => {
      const result: Promise<RoleEntity> = null;
      jest.spyOn(roleService, 'createRole').mockImplementation(() => result);
      const createRole = await roleController.createRole({ name: 'AAAA' });
      expect(createRole).toBe(result);
    });
  });
});
