import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { randomInt } from 'crypto';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { Warehouse } from '@prisma/client';

const aWarehouse: Warehouse | any = {
  id: 6,
  name: 'DIY',
  email: 'diy@gmail.com',
  phoneNumber: '05029160777',
  logoUrl:
    'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
  delete: false,
};

const testData: Warehouse[] | any = [
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
describe('Warehouse Controller', () => {
  let controller: WarehouseController;
  let service: WarehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarehouseController],
      providers: [
        {
          provide: WarehouseService,
          useValue: {
            findMany: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'Ranch Market',
                email: 'ranch.market@gmail.com',
                phoneNumber: '0115334',
                logoUrl:
                  'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
              },
              {
                id: 2,
                name: 'Louts',
                email: 'louts@gmail.com',
                phoneNumber: '0115334',
                logoUrl:
                  'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
              },
              {
                id: 3,
                name: 'Tesco',
                email: 'Tesco@gmail.com',
                phoneNumber: '0115334',
                logoUrl:
                  'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                name: 'Ranch Market',
                email: 'ranch.market@gmail.com',
                phoneNumber: '0115334',
                logoUrl:
                  'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
                delete: false,
              }),
            ),
            insertOne: jest
              .fn()
              .mockImplementation((createWarehouseDto: CreateWarehouseDto) =>
                Promise.resolve({ id: randomInt, ...createWarehouseDto }),
              ),
            updateOne: jest
              .fn()
              .mockImplementation(
                (id: string, createWarehouseDto: CreateWarehouseDto) =>
                  Promise.resolve({ id, ...createWarehouseDto }),
              ),
            deleteOne: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<WarehouseController>(WarehouseController);
    service = module.get<WarehouseService>(WarehouseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getWarehouses', () => {
    it('should get an array of Warehouses', async () => {
      await expect(controller.findMany()).resolves.toEqual([
        {
          id: 1,
          name: 'Ranch Market',
          email: 'ranch.market@gmail.com',
          phoneNumber: '0115334',
          logoUrl:
            'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
        },
        {
          id: 2,
          name: 'Louts',
          email: 'louts@gmail.com',
          phoneNumber: '0115334',
          logoUrl:
            'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
        },
        {
          id: 3,
          name: 'Tesco',
          email: 'Tesco@gmail.com',
          phoneNumber: '0115334',
          logoUrl:
            'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
        },
      ]);
    });
  });
  describe('findOne', () => {
    it('should get a single warehouse', async () => {
      await expect(controller.findOne(1)).resolves.toEqual({
        name: 'Ranch Market',
        email: 'ranch.market@gmail.com',
        phoneNumber: '0115334',
        logoUrl:
          'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
      });
      await expect(controller.findOne(2)).resolves.toEqual({
        name: 'Louts',
        email: 'louts@gmail.com',
        phoneNumber: '0115334',
        logoUrl:
          'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
      });
    });
  });
  describe('newCat', () => {
    it('should create a new cat', async () => {
      const newWarehouse: CreateWarehouseDto = {
        name: 'Louts',
        email: 'louts@gmail.com',
        phoneNumber: '0115334',
        logoUrl:
          'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
      };
      await expect(controller.create(newWarehouse)).resolves.toEqual({
        id: 6,
        ...newWarehouse,
      });
    });
  });
  describe('updateCat', () => {
    it('should update a cat', async () => {
      const newWarehouseDto: CreateWarehouseDto = {
        name: 'Louts',
        email: 'louts@gmail.com',
        phoneNumber: '0115334',
        logoUrl:
          'https://ipcdn.freshop.com/convert?url=https://b2d2c8k4.stackpathcdn.com/wp-content/themes/fp-wp-ee-ranch-market/resources/images/logo/logo.png&type=webp&quality=40',
      };
      await expect(controller.update(6, newWarehouseDto)).resolves.toEqual({
        id: 6,
        ...newWarehouseDto,
      });
    });
  });
});
