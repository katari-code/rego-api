import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { WarehouseService } from './warehouse.service';

const aWarehouse = {
  name: 'DIY',
  email: 'diy@gmail.com',
  phoneNumber: '05029160777',
  logoUrl:
    'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
  delete: false,
};
const warehousesMock = [
  {
    id: 1,
    name: 'Ranch Market',
    email: 'ranch.market@gmail.com',
    phoneNumber: '0115334',
    logoUrl:
      'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
    delete: false,
  },
  {
    id: 2,
    name: 'Louts',
    email: 'louts@gmail.com',
    phoneNumber: '0115334',
    logoUrl:
      'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
    delete: false,
  },
  {
    id: 3,
    name: 'Tesco',
    email: 'Tesco@gmail.com',
    phoneNumber: '0115334',
    logoUrl:
      'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
    delete: false,
  },
];

const oneWarehouse = warehousesMock[0];

const db = {
  warehouse: {
    findMany: jest.fn().mockResolvedValue(warehousesMock),
    findUnique: jest.fn().mockResolvedValue(oneWarehouse),
    findFirst: jest.fn().mockResolvedValue(oneWarehouse),
    create: jest.fn().mockReturnValue(aWarehouse),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneWarehouse),
    delete: jest.fn().mockResolvedValue(oneWarehouse),
  },
};

describe('WarehouseService', () => {
  let service: WarehouseService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WarehouseService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<WarehouseService>(WarehouseService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of warehouse', async () => {
      const warehouses = await service.findMany();
      expect(warehouses).toEqual(warehousesMock);
    });
  });

  describe('findOne', () => {
    it('should get a single warehouse', () => {
      expect(service.findOne(oneWarehouse.id)).resolves.toEqual;
    });
  });

  describe('create', () => {
    it('should successfully insert a warehouse', () => {
      expect(
        service.create({
          name: aWarehouse.name,
          email: aWarehouse.email,
          phoneNumber: aWarehouse.phoneNumber,
          logoUrl: aWarehouse.logoUrl,
        }),
      ).resolves.toEqual(aWarehouse);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const warehouse = await service.update(oneWarehouse.id, {
        name: oneWarehouse.name,
        email: oneWarehouse.email,
        phoneNumber: oneWarehouse.phoneNumber,
        logoUrl: oneWarehouse.logoUrl,
      });
      expect(warehouse).toEqual(oneWarehouse);
    });
  });

  describe('delete', () => {
    it('should return {deleted: true}', () => {
      expect(service.remove(oneWarehouse.id)).resolves.toEqual({
        ...oneWarehouse,
        deleted: true,
      });
    });
  });
});
