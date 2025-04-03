import { Link } from 'react-router-dom';
import '../styles/CategoriesPage.css';

const CategoriesPage = () => {
  // Category data with subcategories
  const categories = [
    {
      id: 1,
      name: 'Men',
      image: '/images/category-men.jpg',
      subcategories: [
        { id: 101, name: 'Shoes', count: 24 },
        { id: 102, name: 'Clothing', count: 36 },
        { id: 103, name: 'Accessories', count: 18 },
        { id: 104, name: 'Sportswear', count: 15 }
      ]
    },
    {
      id: 2,
      name: 'Women',
      image: '/images/category-women.jpg',
      subcategories: [
        { id: 201, name: 'Shoes', count: 28 },
        { id: 202, name: 'Clothing', count: 42 },
        { id: 203, name: 'Accessories', count: 23 },
        { id: 204, name: 'Sportswear', count: 19 }
      ]
    },
    {
      id: 3,
      name: 'Kids',
      image: '/images/category-kids.jpg',
      subcategories: [
        { id: 301, name: 'Shoes', count: 16 },
        { id: 302, name: 'Clothing', count: 24 },
        { id: 303, name: 'Accessories', count: 12 },
        { id: 304, name: 'Sportswear', count: 10 }
      ]
    },
    {
      id: 4,
      name: 'Sports',
      image: '/images/category-sports.jpg',
      subcategories: [
        { id: 401, name: 'Running', count: 22 },
        { id: 402, name: 'Basketball', count: 18 },
        { id: 403, name: 'Soccer', count: 20 },
        { id: 404, name: 'Training', count: 25 }
      ]
    },
    {
      id: 5,
      name: 'Accessories',
      image: '/images/category-accessories.jpg',
      subcategories: [
        { id: 501, name: 'Bags', count: 15 },
        { id: 502, name: 'Watches', count: 12 },
        { id: 503, name: 'Sunglasses', count: 18 },
        { id: 504, name: 'Jewelry', count: 20 }
      ]
    },
    {
      id: 6,
      name: 'Sale',
      image: '/images/category-sale.jpg',
      subcategories: [
        { id: 601, name: 'Men', count: 45 },
        { id: 602, name: 'Women', count: 52 },
        { id: 603, name: 'Kids', count: 30 },
        { id: 604, name: 'Accessories', count: 25 }
      ]
    }
  ];

  return (
    <div className="categories-page">
      <div className="categories-header">
        <div className="container">
          <h1>Product Categories</h1>
          <p>Browse our wide selection of products by category</p>
        </div>
      </div>

      <div className="container">
        <div className="main-categories">
          {categories.map(category => (
            <div key={category.id} className="category-block">
              <div className="category-image">
                <img src={category.image || "/placeholder.svg?height=300&width=500"} alt={category.name} />
                <div className="category-overlay">
                  <h2 className="category-title">{category.name}</h2>
                </div>
              </div>
              
              <div className="subcategories">
                <ul>
                  {category.subcategories.map(sub => (
                    <li key={sub.id}>
                      <Link to={`/products?category=${category.name.toLowerCase()}&subcategory=${sub.name.toLowerCase()}`}>
                        {sub.name}
                        <span className="item-count">({sub.count})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to={`/products?category=${category.name.toLowerCase()}`} className="view-all">
                  View All {category.name} Products
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="featured-categories">
          <h2>Featured Collections</h2>
          <div className="featured-grid">
            <div className="featured-item large">
              <img src="/images/featured-new-arrivals.jpg" alt="New Arrivals" />
              <div className="featured-content">
                <h3>New Arrivals</h3>
                <p>Check out the latest additions to our store</p>
                <Link to="/products?collection=new-arrivals" className="featured-btn">Shop Now</Link>
              </div>
            </div>
            <div className="featured-item">
              <img src="/images/featured-bestsellers.jpg" alt="Bestsellers" />
              <div className="featured-content">
                <h3>Bestsellers</h3>
                <Link to="/products?collection=bestsellers" className="featured-btn">Shop Now</Link>
              </div>
            </div>
            <div className="featured-item">
              <img src="/images/featured-limited.jpg" alt="Limited Edition" />
              <div className="featured-content">
                <h3>Limited Edition</h3>
                <Link to="/products?collection=limited-edition" className="featured-btn">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
