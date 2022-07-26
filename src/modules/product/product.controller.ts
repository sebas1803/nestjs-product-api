import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';

import { CreateProductDTO } from './dto/products.dto';

import { ProductService } from './product.service';
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post('/create')
    async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product succesfully created',
            product: product,
        });
    }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        if (!products) {
            throw new NotFoundException('No products');
        }
        return res.status(HttpStatus.OK).json({
            products: products,
        })
    }

    @Get('/:productId')
    async getProduct(@Res() res, @Param('productId') productId) {
        const product = await this.productService.getProduct(productId);
        if (!product) {
            throw new NotFoundException('Product does not exist');
        }
        return res.status(HttpStatus.OK).json({
            product: product,
        })
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productId') productId) {
        const deletedProduct = await this.productService.deleteProduct(productId);
        if (!deletedProduct) {
            throw new NotFoundException('Product does not exist');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Product deleted succesfully',
            deletedProduct: deletedProduct,
        })
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productId') productId) {
        const updatedProduct = await this.productService.updateProduct(productId, createProductDTO);
        if (!updatedProduct) {
            throw new NotFoundException('Product does not exist');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Product updated succesfully',
            updatedProduct: updatedProduct,
        })
    }
}
