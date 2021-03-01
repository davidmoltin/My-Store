import React, { useContext } from 'react';
import * as moltin from '@moltin/sdk';
import { loadImageHref } from './service';
import { useResolve } from './hooks';
import { ImageContainer } from './ImageContainer';
import { APIErrorContext } from './APIErrorProvider';
import imagePlaceHolder from './images/img_missing_horizontal@2x.png'

interface ProductMainImageProps {
  product: any;
  size?: number;
}

export const ProductMainImage: React.FC<ProductMainImageProps> = (props) => {
  const productMainImageId = '';
  const { addError } = useContext(APIErrorContext);
  const [productImageUrl] = useResolve(
    async () => {
      try {
        if (productMainImageId) {
          return loadImageHref(productMainImageId)
        }
      } catch (error) {
        addError(error.errors);
      }
    },
    [productMainImageId, addError]
  );
  const productBackground = '';

  return (
    <>
      {productImageUrl ? (
        <ImageContainer
        imgClassName="productmainimage"
        imgUrl={productImageUrl}
        alt={props.product.attributes.name}
        imageStyle={{ width: props.size, height: props.size, objectFit: 'fill', backgroundColor: productBackground }}
        />
      ) : (
        <ImageContainer
        imgClassName="productmainimage"
        imgUrl={imagePlaceHolder}
        alt={props.product.attributes.name}
        imageStyle={{ width: props.size, height: props.size, objectFit: 'fill', backgroundColor: productBackground }}
        />
      )}
    </>
  );
};

