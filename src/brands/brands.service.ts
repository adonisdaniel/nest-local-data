import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from './dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: Date.now(),
    // },
    // {
    //   id: uuid(),
    //   name: 'Ford',
    //   createdAt: Date.now(),
    // },
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createdAt: Date.now(),
    };

    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);

    if (!brand) throw new NotFoundException('Brand not found');

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = this.findOne(id);

    const newBrand = {
      ...brand,
      ...updateBrandDto,
      id: brand.id,
      updatedAt: Date.now(),
    };

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        return newBrand;
      }

      return brand;
    });

    return this.brands;
  }

  remove(id: string) {
    this.findOne(id);

    this.brands = this.brands.filter((brand) => brand.id !== id);

    return;
  }

  fillSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
