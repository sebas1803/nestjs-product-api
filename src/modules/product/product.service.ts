import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/products.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModule: Model<Product>) { }

    async getProducts(): Promise<Product[]> {
        const products = await this.productModule.find();
        return products;
    }

    async getProduct(productId: string): Promise<Product> {
        const product = await this.productModule.findById(productId);
        return product;
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const product = new this.productModule(createProductDTO);
        return await product.save();
    }

    async deleteProduct(productId: string): Promise<Product> {
        const deletedProduct = await this.productModule.findByIdAndDelete(productId);
        return deletedProduct;
    }

    async updateProduct(productId: string, createProductDTO: CreateProductDTO): Promise<Product> {
        const updatedProduct = await this.productModule.findByIdAndUpdate(productId, createProductDTO, { new: true });
        return updatedProduct;
    }
}
