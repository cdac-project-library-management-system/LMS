import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/user/BrowseCategories.module.css';

const BrowseCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const categories = [
    { id: 1, name: 'Science Fiction', items: ['Dune', 'Neuromancer', 'The Left Hand of Darkness'] },
    { id: 2, name: 'Mystery', items: ['Gone Girl', 'The Girl with the Dragon Tattoo', 'The Silent Patient'] },
    { id: 3, name: 'Fantasy', items: ['The Name of the Wind', 'Mistborn', 'A Game of Thrones'] },
    { id: 4, name: 'Non-Fiction', items: ['Sapiens', 'Educated', 'Atomic Habits'] },
    { id: 5, name: 'Biography', items: ['Steve Jobs', 'Becoming', 'Educated'] },
  ];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <h2 className={styles.logo}>Book Finder</h2>
          <div className={styles.navScrollContainer}>
            <div className={styles.navLinks}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.navLink} ${selectedCategory === category.id ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className={styles.contentContainer}>
        <div className={styles.categoryHeader}>
          <h2 className={styles.categoryTitle}>{selectedCategoryData?.name}</h2>
          <p className={styles.categoryCount}>{selectedCategoryData?.items.length} titles</p>
        </div>
        
        <div className={styles.itemsList}>
          {selectedCategoryData?.items.map((item, index) => (
            <div key={index} className={styles.listItem}>
              <Link to={`/book/${encodeURIComponent(item)}`} className={styles.itemLink}>
                {item}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseCategories;