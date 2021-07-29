import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {

    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        const foundProduct = await productsRepository.findOne(id);

        if (!foundProduct) {
            throw new Error('Product not found');
        }

        foundProduct.name = name;
        foundProduct.price = price;
        foundProduct.quantity = quantity;

        await productsRepository.save(foundProduct);

        return foundProduct;
    }
}

export default UpdateProductService;