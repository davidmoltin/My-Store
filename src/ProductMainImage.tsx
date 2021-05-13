import React from 'react';
import { ImageContainer } from './ImageContainer';

interface ProductMainImageProps {
  product: any;
  size?: number;
}

export const ProductMainImage: React.FC<ProductMainImageProps> = (props) => {
  const productImageUrl = `https://ep-demo-assets.s3-us-west-2.amazonaws.com/BELLEVIE/skuImages/${props.product.attributes.sku}.png`
  // const [productImageUrl] = useResolve(
  //   async () => {
  //     try {
  //       if (productMainImageId) {
  //         return loadImageHref(productMainImageId)
  //       }
  //     } catch (error) {
  //       addError(error.errors);
  //     }
  //   },
  //   [productMainImageId, addError]
  // );
  const productBackground = '';

  return (
    <>
      <ImageContainer
      imgClassName="productmainimage"
      imgUrl={productImageUrl}
      alt={props.product.attributes.name}
      imageStyle={{ width: props.size, height: props.size, objectFit: 'fill', backgroundColor: productBackground }}
      />
    </>
  );
};

