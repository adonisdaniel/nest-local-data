import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: 2,
      brand: 'Ford',
      model: 'Fiesta',
    },
    {
      id: 3,
      brand: 'BMW',
      model: 'X5',
    },
  ];

  findAll() {
    return this.cars;
  }

  findById(id: number) {
    const card = this.cars.find((car) => car.id === +id);

    if (!card) throw new NotFoundException(`Car with id ${id} not found`);

    return card;
  }
}
