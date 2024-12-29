import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { CAR_SEED } from './db/cars.seed';
import { BRAND_SEED } from './db/brands.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) {}

  populateDb() {
    this.carsService.fillSeedData(CAR_SEED);

    this.brandsService.fillSeedData(BRAND_SEED);

    return 'Seed executed successfully';
  }
}
