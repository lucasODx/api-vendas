import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('products')
class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}

export default Product;