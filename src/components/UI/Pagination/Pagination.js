import React from 'react';
import './Pagination.css';

const Pagination = ({recipesPerPage, totalRecipes, paginate}) => {

  const pageNumbers = [];

  for (let i=1; i<=Math.ceil(totalRecipes/recipesPerPage); i++){
    pageNumbers.push(i);
  }
  return (
    
      <div className='pagination'>
        {pageNumbers.map(number =>(
          <a onClick={()=>paginate(number)} href="#" className='page-link'>
            {number}
          </a>          
        ))}
      </div>

    
  )
}

export default Pagination