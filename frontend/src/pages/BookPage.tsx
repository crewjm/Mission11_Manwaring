import { useState } from 'react';
import Welcome from '../components/WelcomeHere';
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import CartSummary from '../components/CartSummary';

const BookPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <CartSummary />
      <main className="container mt-3">
        {/* Welcome header */}
        <Welcome />

        <div className="row mt-4">
          {/* Category filter sidebar */}
          <aside className="col-md-3">
            <CategoryFilter
              setSelectedCategories={setSelectedCategories}
              selectedCategories={selectedCategories}
            />
          </aside>

          {/* Book list in the center */}
          <section className="col-md-6">
            <BookList selectedCategories={selectedCategories} />
          </section>

          {/* Cart summary was moved to top-right fixed in CartSummary.tsx */}
          <div className="col-md-3" />
        </div>
      </main>
    </>
  );
};

export default BookPage;
