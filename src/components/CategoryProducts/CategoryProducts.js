import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const CategoryProducts = () => {
  const handleButtonClick = () => {
    navigate('/home');
  };
  
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products based on the category and update state
    fetch(`http://localhost:4000/products/category/${category}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Data received:', data);
        setProducts(data.results);
      })
      .catch((error) => console.error('Error fetching category products:', error));
  }, [category, currentPage, productsPerPage]);

  useEffect(() => {
    // Update the URL whenever the currentPage changes
    navigate(`/products/category/${category}?page=${currentPage}`);
  }, [navigate, category, currentPage]);

  // Calculate the range of products to display for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to handle pagination button click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const maxVisiblePages = 6;
    const pageButtons = [];
  
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={currentPage === i ? 'pagination-button active' : 'pagination-button'}
        >
          {i}
        </button>
      );
    }
  
    // Display ellipsis and last page button if needed
    if (startPage > 1) {
      pageButtons.unshift(
        <button key="first" onClick={() => paginate(1)} className="pagination-button">
          1
        </button>,
        <span key="ellipsis-prev" className="pagination-ellipsis">
          ...
        </span>
      );
    }
  
    if (endPage < totalPages) {
      pageButtons.push(
        <span key="ellipsis-next" className="pagination-ellipsis">
          ...
        </span>,
        <button
          key={totalPages}
          onClick={() => paginate(totalPages)}
          className={currentPage === totalPages ? 'pagination-button active' : 'pagination-button'}
        >
          {totalPages}
        </button>
      );
    }
  
    return pageButtons;
  };
  
  return (
    <div>
     
      <div className="container">
    
        <h1 className="text-center">Products We Sell!!</h1>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>CATEGORY ID</th>
              <th>PRODUCT ID</th>
              <th>PRODUCT NAME</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>MRP</th>
              <th>DISCOUNT</th>
              <th>STOCK</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.PD_ID}>
                <td>{product.CD_ID}</td>
                <td>{product.PD_ID}</td>
                <td>{product.PD_NAME}</td>
                <td>{product.CD}</td>
                <td>{product.BRAND}</td>
                <td>{product.MRP}</td>
                <td>{product.DISCOUNT}</td>
                <td>{product.STOCK}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="pagination-button prev"
          >
            Prev
          </button>
          {renderPaginationButtons()}
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(products.length / productsPerPage)}
            className="pagination-button next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;