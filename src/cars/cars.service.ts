import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Ford',
    //   model: 'Fiesta',
    // },
    // {
    //   id: uuid(),
    //   brand: 'BMW',
    //   model: 'X5',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findById(id: string) {
    const card = this.cars.find((car) => car.id === id);

    if (!card) throw new NotFoundException(`Car with id ${id} not found`);

    return card;
  }

  create(createCarDto: CreateCarDto) {
    const newCar = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(newCar);

    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    const car = this.findById(id);

    const updatedCar = {
      ...car,
      ...updateCarDto,
      id: car.id,
    };

    this.cars = this.cars.map((car) => (car.id === id ? updatedCar : car));

    return updatedCar;
  }

  delete(id: string) {
    const car = this.findById(id);

    this.cars = this.cars.filter((car) => car.id !== id);

    return car;
  }

  fillSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
