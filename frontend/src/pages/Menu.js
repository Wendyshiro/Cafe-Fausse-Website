import React from 'react';
import '../styles/Menu.css';

const Menu = () => {
  const menuData = {
    starters: [
      {
        name: 'Bruschetta',
        description: 'Fresh tomatoes, basil, olive oil, and toasted baguette slices',
        price: '$8.50'
      },
      {
        name: 'Caesar Salad',
        description: 'Crisp romaine with homemade Caesar dressing',
        price: '$9.00'
      }
    ],
    mainCourses: [
      {
        name: 'Grilled Salmon',
        description: 'Served with lemon butter sauce and seasonal vegetables',
        price: '$22.00'
      },
      {
        name: 'Ribeye Steak',
        description: '12 oz prime cut with garlic mashed potatoes',
        price: '$28.00'
      },
      {
        name: 'Vegetable Risotto',
        description: 'Creamy Arborio rice with wild mushrooms',
        price: '$18.00'
      }
    ],
    desserts: [
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with mascarpone',
        price: '$7.50'
      },
      {
        name: 'Cheesecake',
        description: 'Creamy cheesecake with berry compote',
        price: '$7.00'
      }
    ],
    beverages: [
      {
        name: 'Red Wine (Glass)',
        description: 'A selection of Italian reds',
        price: '$10.00'
      },
      {
        name: 'White Wine (Glass)',
        description: 'Crisp and refreshing',
        price: '$9.00'
      },
      {
        name: 'Craft Beer',
        description: 'Local artisan brews',
        price: '$6.00'
      },
      {
        name: 'Espresso',
        description: 'Strong and aromatic',
        price: '$3.00'
      }
    ]
  };

  const MenuSection = ({ title, items }) => (
    <div className="menu-section">
      <h2>{title}</h2>
      <div className="menu-items">
        {items.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="item-header">
              <h3>{item.name}</h3>
              <span className="price">{item.price}</span>
            </div>
            <p className="description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="menu">
      <div className="menu-hero">
        <h1>Our Menu</h1>
        <p>Discover our carefully crafted dishes made with the finest ingredients</p>
      </div>

      <div className="menu-container">
        <MenuSection title="Starters" items={menuData.starters} />
        <MenuSection title="Main Courses" items={menuData.mainCourses} />
        <MenuSection title="Desserts" items={menuData.desserts} />
        <MenuSection title="Beverages" items={menuData.beverages} />
      </div>
    </div>
  );
};

export default Menu;
