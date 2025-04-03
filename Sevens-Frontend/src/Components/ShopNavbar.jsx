import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart } from 'lucide-react';
import { useCart } from '../Pages/CartPage';
import AuthModal from '../Pages/Login';
import "../Styles/shopNav.css";

const ShopNav = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [modal, setModal] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();


    const handleAuthModal = () => {
        setModal(prev => !prev);
        document.body.classList.toggle('modal-open', !modal);
    };

    const menuStructure = {
        men: {
            Featured: ['New Releases', 'Best Sellers', 'Y2K Sneakers'],
            Shoes: [
                'All Shoes',
                'Lifestyle',
                'Jordan',
                'Running',
                'Football',
                'Basketball',
                'Training and Gym',
                'Skateboarding',
                'Nike By You'
            ],
            Clothing: [
                'All Clothing',
                'Hoodies and Sweatshirts',
                'Jackets',
                'Trousers and Tights',
                'Tracksuits',
                'Tops and T-Shirts',
                'Shorts',
                'Kits and Jerseys'
            ],
            DiscoverSport: [
                'Running',
                'Football',
                'Basketball',
                'Training & Gym',
                'Tennis',
                'Golf'
            ],
            AccessoriesEquipment: [
                'All Accessories and Equipment',
                'Bags and Backpacks',
                'Headwear',
                'Socks'
            ]
        },
        women: {
            Featured: ['New Releases', 'Best Sellers', 'Sustainable Styles'],
            Shoes: [
                'All Shoes',
                'Lifestyle',
                'Running',
                'Training',
                'Basketball'
            ],
            Clothing: [
                'All Clothing',
                'Tops',
                'Sports Bras',
                'Leggings',
                'Shorts'
            ],
            Accessories: [
                'All Accessories',
                'Bags and Backpacks',
                'Socks',
                'Hats and Headwear',
                'Water Bottles'
            ]
        },
        brands: {
            Brands: [
                'Nike',
                'Adidas',
                'Puma',
                'Reebok',
                'New Balance',
                'Under Armour',
                'Asics',
                'Converse',
                'Vans',
                'Skechers'
            ]
        }
    };

    const handleDropdownEnter = (dropdown) => {
        setActiveDropdown(dropdown);
    };

    const handleDropdownLeave = () => {
        setActiveDropdown(null);
    };

    const renderDropdownMenu = (category) => {
        const menu = menuStructure[category];
        return (
            <div className="mega-dropdown">
                {Object.entries(menu).map(([section, items]) => (
                    <div key={section} className="dropdown-column">
                        <h4 className="dropdown-section-title">{section}</h4>
                        {items.map((item) => {
                            const searchParams = new URLSearchParams({
                                gender: category,
                                category: item
                            });
                            return (
                                <Link 
                                    key={item} 
                                    to={`/products?${searchParams.toString()}`}
                                    className="dropdown-item"
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            {modal && <AuthModal handleClose={handleAuthModal} />}
            
            <nav className="shop-navigation">
                <div className="nav-container">
                    <div className="logo">SEVENS</div>
                    
                    <div className="nav-menu">
                    <span className='nav-item'><Link to="/">Home</Link> </span>
                        <div 
                            className={`nav-item ${activeDropdown === 'men' ? 'active' : ''}`}
                            onMouseEnter={() => handleDropdownEnter('men')}
                            onMouseLeave={handleDropdownLeave}
                        >
                            <span>Men</span>
                            {activeDropdown === 'men' && renderDropdownMenu('men')}
                        </div>
                        
                        <div 
                            className={`nav-item ${activeDropdown === 'women' ? 'active' : ''}`}
                            onMouseEnter={() => handleDropdownEnter('women')}
                            onMouseLeave={handleDropdownLeave}
                        >
                            <span>Women</span>
                            {activeDropdown === 'women' && renderDropdownMenu('women')}
                        </div>
                        
                        <div 
                            className={`nav-item ${activeDropdown === 'brands' ? 'active' : ''}`}
                            onMouseEnter={() => handleDropdownEnter('brands')}
                            onMouseLeave={handleDropdownLeave}
                        >
                            <span>Brands</span>
                            {activeDropdown === 'brands' && renderDropdownMenu('brands')}
                        </div>
                    </div>
                    
                    <div className="nav-icons">
                        <Search className="icon" size={20} />
                        <Heart className="icon" size={20} />
                        <User 
                            className="icon" 
                            size={20} 
                            onClick={handleAuthModal} 
                        />
                        <div 
                            className="cart-icon-container"
                            onClick={() => setIsCartOpen(true)}
                        >
                        <ShoppingBag className="icon" size={20} />

                        {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
            )}
        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default ShopNav;