import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './ProductList.css'


const ProductList = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/home');
  };

  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const { categoryName } = useParams();


  useEffect(() => {
    // Fetch categories from your server API
    // Example API endpoint: http://0.0.0.0:5000/api/categories
    fetch("http://192.168.1.54:4000/products", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json().then((data) => { setCategories(data.results) }))
  }, [categoryName, currentPage, productsPerPage]);

  useEffect(() => {
    // Update the URL whenever the currentPage changes
    navigate(`/products?page=${currentPage}`);
  }, [navigate, categoryName, currentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categories.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(categories.length / productsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(categories.length / productsPerPage);
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
      
        <h1 className="text-center">All Products We Sell</h1>

        <div className="d-flex justify-content-end"></div>

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
            {currentProducts.map((category) => (
              <tr key={category.id}>
                <td>{category.CD_ID}</td>
                <td>{category.PD_ID}</td>
                <td>{category.PD_NAME}</td>
                <td>{category.CD}</td>
                <td>{category.BRAND}</td>
                <td>{category.MRP}</td>
                <td>{category.DISCOUNT}</td>
                <td>{category.STOCK}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='pagination-container'>
          <button onClick={prevPage} disabled={currentPage === 1} className='pagination-button prev'>
            Prev
          </button>
          {renderPaginationButtons()}
          <button onClick={nextPage} disabled={currentPage === Math.ceil(categories.length / productsPerPage)} className='pagination-button next'>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
