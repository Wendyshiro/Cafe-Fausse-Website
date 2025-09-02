import React, { useState } from 'react';
import '../styles/Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, src: '/images/gallery-cafe-interior.webp', alt: 'Elegant dining room with warm lighting', category: 'interior' },
    { id: 2, src: '/images/gallery-ribeye-steak.webp', alt: 'Perfectly cooked ribeye steak', category: 'food' },
    { id: 3, src: '/images/gallery-special-event.webp', alt: 'Special dining event', category: 'events' },
    // AI generated images
    { id: 4, src: '/images/grilled-salmon.png', alt: 'Grilled salmon with seasonal vegetables', category: 'food' },
    { id: 5, src: '/images/kitchen-action.png', alt: 'Chef preparing dishes in the kitchen', category: 'behind-scenes' },
    { id: 6, src: '/images/tiramisu.png', alt: 'Classic tiramisu dessert', category: 'food' },
    { id: 7, src: '/images/wine-selection.png', alt: 'Curated wine selection', category: 'beverages' },
    { id: 8, src: '/images/creamy-rissotto.png', alt: 'Creamy vegetable risotto', category: 'food' }
  ];

  const awards = [
    {
      title: 'Culinary Excellence Award',
      year: '2022',
      description: 'Recognized for outstanding culinary innovation and quality'
    },
    {
      title: 'Restaurant of the Year',
      year: '2023',
      description: 'Awarded by the Washington DC Restaurant Association'
    },
    {
      title: 'Best Fine Dining Experience',
      year: '2023',
      description: 'Foodie Magazine\'s top choice for fine dining'
    }
  ];

  const reviews = [
    {
      text: 'Exceptional ambiance and unforgettable flavors.',
      source: 'Gourmet Review'
    },
    {
      text: 'A must-visit restaurant for food enthusiasts.',
      source: 'The Daily Bite'
    },
    {
      text: 'Chef Rossi\'s creativity shines in every dish.',
      source: 'DC Food & Wine'
    }
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setSelectedImage(images[prevIndex]);
  };

  return (
    <div className="gallery">
      <div className="gallery-hero">
        <h1>Gallery</h1>
        <p>Experience the ambiance, cuisine, and moments that make Café Fausse special</p>
      </div>

      <div className="gallery-container">
        {/* Image Gallery */}
        <section className="image-gallery">
          <h2>Our Restaurant</h2>
          <div className="gallery-grid">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="gallery-item"
                onClick={() => openLightbox(image)}
              >
                {image.placeholder ? (
                  <div className="image-placeholder">
                    <span>{image.alt}</span>
                    <small>(AI Generated - Coming Soon)</small>
                  </div>
                ) : (
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                )}
                <div className="image-placeholder" style={{display: 'none'}}>
                  <span>{image.alt}</span>
                  <small>(Image not found)</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards Section */}
        <section className="awards">
          <h2>Awards & Recognition</h2>
          <div className="awards-grid">
            {awards.map((award, index) => (
              <div key={index} className="award-item">
                <div className="award-icon">🏆</div>
                <h3>{award.title}</h3>
                <span className="award-year">{award.year}</span>
                <p>{award.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="reviews">
          <h2>What People Say</h2>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-item">
                <blockquote>"{review.text}"</blockquote>
                <cite>— {review.source}</cite>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-prev" onClick={prevImage}>‹</button>
            <div className="lightbox-image">
              {selectedImage.placeholder ? (
                <div className="image-placeholder large">
                  <span>{selectedImage.alt}</span>
                  <small>(AI Generated - Coming Soon)</small>
                </div>
              ) : (
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                  style={{maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain'}}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              )}
              <div className="image-placeholder large" style={{display: 'none'}}>
                <span>{selectedImage.alt}</span>
                <small>(Image not found)</small>
              </div>
            </div>
            <button className="lightbox-next" onClick={nextImage}>›</button>
            <div className="lightbox-caption">
              {selectedImage.alt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
