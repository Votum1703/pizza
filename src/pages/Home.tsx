import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';


  const Home: React.FC = () => {
  const dispatch = useDispatch( )
  const isSearch = React.useRef(false);
  const {items, status} = useSelector(selectPizzaData)
  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)



  const onChangeCategory = (idx: number) => {
  dispatch(setCategoryId(idx))
  }
 
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    

    
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''




    dispatch(
      //@ts-ignore
      fetchPizzas({
      sortBy,
      order,
      category,
      search,
      currentPage,
}))


     window.scrollTo(0, 0);
}


  React.useEffect(() => {
   

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);




  const pizzas = items.map((obj: any) => (
  <Link key={obj.id} to ={`/pizza/${obj.id}`}>
    <PizzaBlock  {...obj} />
    </Link>))

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  


  return (
    <div className='container'>
         <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory} />
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          {
            status === 'error' ? <div className='content__error-info'>
              <h2>Произошла ошибка 😕</h2>
              <p>К сожаление не получилось получить данные. Попробойту повторить позже</p>
            </div> : <div className="content__items">{status === 'loading'? skeletons : pizzas}</div>} 
         
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
      </div>
  )
}
export default Home