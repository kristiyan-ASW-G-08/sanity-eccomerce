export default interface Product {
  name: string;
  brand: string;
  price: number;
  description: string;
  featured: boolean;
  discount: {
    hasDiscount: boolean;
    percentage: number;
  };
  variants: {
    image: { asset: { ref: string } };
    variantName: string;
    color: string;
  }[];
  _id: string;
}
