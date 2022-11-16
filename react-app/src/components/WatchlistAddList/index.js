import { useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from 'react';
import './WatchlistAddList.css'
import {
	thunkGetAllWatchlist,
	thunkGetOneWatchlist,
	thunkGetAllStocks,
	thunkDeleteStocks,
	thunkDeleteWatchlist,
	thunkPostWatchlist,
  thunkPostStocks
} from '../../store/watchlist';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
// import WatchlistFromModal from '../Watchlist/edit-watchlist-model';

function WatchlistAddList(symbol) {
  const dispatch = useDispatch()
  // const { symbol } = useParams();
  const [add, setAdd] = useState(false);
  const [addListId, setAddListId] = useState()
  const watchlist = useSelector((state) => state.watchlist);
	const user_id = useSelector((state) => state.session.user.id);
  const newLists = useSelector ((state) => state.watchlist.AllWatchlists)
  let lists;

  useEffect(
		() => {
			dispatch(thunkGetAllWatchlist(user_id));
		},
		[dispatch]
	);

  if (watchlist.allWatchlists) {
		lists = Object.values(watchlist.allWatchlists);
	}const submitHandler = async (e) => {
    e.preventDefault()
    let data = {
      symbol: symbol.symbol,
      watchlist_id: addListId
    }

    await dispatch(thunkPostStocks(data))
    await dispatch(thunkGetAllWatchlist(user_id))
    setAdd(false)
    // history.push(`/watchlists/${watchlistId}`)
  }


  return (
    <div className='watchlist-add-list-page'>
      <button className='add-list-button' onClick={() => add == false? setAdd(true): setAdd(false)}>Add to List</button>
      {add && <Modal>
        <form className='add-form' onSubmit={submitHandler}>
          <div className='add-form-title'>{`Add ${symbol.symbol} to your list `}</div>
          <div>
            {lists && lists.map((list) => (
              <div className='container'>
                  <input type="radio" id={list.id} name={'lists'} onChange={() => setAddListId(list.id)} value={list.id}/>
                  <label className='add-label' for={list.id}> {list.name}</label>
              </div>
            ))}
          </div>

        <button className="cancel-button" onClick={() => add == false? setAdd(true): setAdd(false)}>Cancel</button>
        <button className='create-list-button' type="submit">Add List</button>
        </form>

      </Modal>}
    </div>
  )
}


export default WatchlistAddList
