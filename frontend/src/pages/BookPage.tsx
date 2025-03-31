import { useState } from "react";
import Welcome from "../Components/Welcome";
import CategoryFilter from "../Components/CategoryFilter";
import BookList from "../Components/BookList";
import CartSummary from "../Components/CartSummary";

function BookPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <>
            <div>
                <div className="container">
                    <Welcome />
                    <div className="row">
                        <div className="col-md-3">
                            <CategoryFilter
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                            />
                        </div>
                        <div className="col-md-6">
                            <BookList selectedCategories={selectedCategories} />
                        </div>
                        <div className="col-md-3">
                            <CartSummary />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookPage;