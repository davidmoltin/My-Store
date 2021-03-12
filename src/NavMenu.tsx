import React from 'react';
import { Link } from 'react-router-dom';
import { createCategoryUrl } from './routes';
import * as moltin from '@moltin/sdk';
import { useCategories } from './app-state';

import './NavMenu.scss';

interface NavMenuProps {
  categoryHistory: string[];
  handleCloseNavigation: () => void;
  handleCategoryClick: (id: string, name: string) => void;
}

export const NavMenu: React.FC<NavMenuProps> = (props) => {
  const { handleCloseNavigation, categoryHistory, handleCategoryClick } = props;
  const { categoriesTree } = useCategories();

  const handleCloseMenu = () => {
    handleCloseNavigation();
  };

  const handleShow = (category: moltin.Category) => {
    handleCategoryClick(category.id, category.name);
  };

  function renderCategories(categories: any=[], level: number = 0, isVisible: boolean = false): React.ReactElement {
    return (
      <ul className={`navmenu__sub --level-${level} ${isVisible ? '--show' : ''}`}>
        {categories?.map((category: any={}) => (
          <li key={category.id} className="navmenu__li">
              <Link
                onClick={handleCloseMenu}
                className={`navmenu__link ${category.relationships?.children?.data?.length > 0 ? '--haschildren' : ''}`}
                to={createCategoryUrl(category.id)}
              >
                {category.attributes?.name}
              </Link>
              <button type="button" className={`navmenu__nextbutton ${category.relationships?.children?.data?.length > 0 ? '--haschildren' : ''}`} onClick={() => handleShow(category)} />
            {category.relationships?.children?.data?.length > 0 && renderCategories(category.relationships?.children.data, level + 1, categoryHistory.includes(category.id))}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="navmenu">
      {categoriesTree && renderCategories(categoriesTree)}
    </div>
  );
};
