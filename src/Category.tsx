import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moltin from '@moltin/sdk';
import { loadCategoryProducts } from './service';
import { useCategories, useTranslation, useCurrency, useCatalog } from './app-state';
import { ProductThumbnail } from './ProductThumbnail';
import { createCategoryUrl } from './routes';
import { Pagination } from './Pagination';
import { useResolve } from './hooks';

import './Category.scss';

function useCategoryProducts(categoryId: string | undefined, pageNum: number) {
  const { selectedLanguage } = useTranslation();
  const { selectedCurrency } = useCurrency();
  const { catalogId, releaseId } = useCatalog();

  const [totalPages, setTotalPages] = useState<number>();

  useEffect(() => {
    // reset number of pages only when changing categories
    setTotalPages(undefined);
  }, [categoryId]);

  const [products] = useResolve(async () => {
    // during initial loading of categories categoryId might be undefined
    if (categoryId) {
      const result = catalogId !== '' && releaseId !== '' && await loadCategoryProducts(catalogId, releaseId, categoryId, pageNum, selectedLanguage, selectedCurrency);
      setTotalPages(1);
      return result;
    }
  }, [catalogId, releaseId, categoryId, pageNum, selectedLanguage, selectedCurrency]);

  return { products, totalPages };
}

interface CategoryParams {
  categoryId: string;
  pageNum?: string;
}

export const Category: React.FC = () => {
  const params = useParams<CategoryParams>();
  const categoryId = params.categoryId;
  const { categoryPathById } = useCategories();
  const categoryPath = categoryPathById(categoryId);
  const category = categoryPath?.[categoryPath?.length - 1];
  const parsedPageNum = parseInt(params.pageNum!);
  const pageNum = isNaN(parsedPageNum) ? 1 : parsedPageNum;

  const { products, totalPages } = useCategoryProducts(category?.id, pageNum);

  return (
    <div className="category">
      {category && products ? (
        <>
          <div className="category__breadcrumbs">
            {categoryPath?.map((category: moltin.Node, index: number) => (
              <React.Fragment key={category.id}>
                {index > 0 && (
                  <span className="category__breadcrumbseparator">{'>'}</span>
                )}
                <a className="category__breadcrumblink" href={createCategoryUrl(category.id || '')}>{category.attributes.name}</a>
              </React.Fragment>
            ))}
          </div>

          <h1 className="category__categoryname">{category?.attributes.name ?? ' '}</h1>

          <ul className="category__productlist">
            {products && products.data.map((product: any) => (
              <li key={product.id} className="category__product">
                <ProductThumbnail product={product} />
              </li>
            ))}
          </ul>

          <div className="category__pagination">
            {totalPages && (
              <Pagination
                totalPages={totalPages}
                currentPage={pageNum}
                formatUrl={(page) => createCategoryUrl(categoryId, page)}
              />
            )}
          </div>
        </>
      ) : (
        <div className="loader" />
      )}
    </div>
  );
};
