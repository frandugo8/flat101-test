
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './pagination.module.scss';

interface PaginationProps {
  hasNext: boolean
  hasPrev: boolean
  perPage: number
  total: number
}

export default function PaginationComponent({hasNext, hasPrev, perPage, total}: PaginationProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const handleButtonClick = (option: "prev" | "next"): void => {
    let currentPage = searchParams.get("page")
    if (currentPage === null) currentPage = "1"

    navigate(`/products?page=${parseInt(currentPage) + (option === "next"? 1 : -1)}`)
  }

  const handlePages = (): Array<number | string> => {
    let current = searchParams.get("page")
    
    if (current === null) current = "1"
  
    const last = Math.ceil(total/perPage)
    const delta = 2
    const left = parseInt(current) - delta
    const right = parseInt(current) + delta + 1
    const range = []
    const rangeWithDots = []
    let l

    for (let i = 1; i <= last; i++) {
      if ((i === 1 || i === last || i >= left) && i < right) {
        range.push(i)
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }

      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots
  }

  const handlePaginationClick = (page: number | string): void => {
    if (page !== "...") {
      navigate(`/products?page=${page}`)
    }
  }

  const isCurrentPage = (page: number | string): boolean => {
    let currentPage = searchParams.get("page")
    
    if (currentPage === null) currentPage = "1"

    return parseInt(currentPage) === page
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>

        {hasPrev?
          <button aria-label="prev-button" onClick={() => handleButtonClick("prev")} type="button" className={styles.button}>
            <div className={styles.label}>Anterior</div>
          </button>
          : ""
        }

        {handlePages().map((page: number | string, index: number) => 
          <div
            key={index}
            className={isCurrentPage(page)? `${styles.pagination__page} ${styles.pagination__page___selected}`
              : page === "..."? `${styles.pagination__page} ${styles.pagination__page___dots}`
              : styles.pagination__page}
            onClick={() => handlePaginationClick(page)}>
              {page}
          </div>
        )}

        {hasNext?
          <button  aria-label="next-button" onClick={() => handleButtonClick("next")} type="button" className={styles.button}>
            <div className={styles.label}>Siguiente</div>
          </button>
          : ""
        }
      
      </div>
    </footer>
  );
}
