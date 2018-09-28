// Node modules
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Assets
import './Pagination.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const Pagination = (props) => {

  const { total, perPage, curPage, onPageChange } = props;
  const numPages = Math.ceil(total / perPage);
  const pages = [];
  const regClass = "pagination__page";
  const curClass = regClass + " pagination__page--current";

  // Create pages array from numPages.
  for (let i = 1; i <= numPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <div
        className="pagination__page"
        onClick={() => onPageChange(curPage-1 > 0 ? curPage-1 : null)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      {
        pages.map(page => (
          <div
            key={page}
            className={page === curPage ? curClass : regClass}
            onClick={() => onPageChange(page)}
          >
            {page}
          </div>
        ))
      }
      <div
        className="pagination__page"
        onClick={() => onPageChange(curPage+1 <= numPages ? curPage+1 : null)}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  curPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination;