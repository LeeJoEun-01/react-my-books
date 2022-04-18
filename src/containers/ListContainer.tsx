import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../components/List";
import { BookType, RootState } from "../types";
// import { A as B } from "url"; => A를 B의 이름으로 가지고오다 
import { getBooks as getBooksSagaStart } from "../redux/modules/books";

export default function ListContainer() {
  const books = useSelector<RootState, BookType[] | null>(
    (state) => state.books.books);
    const loading = useSelector<RootState, boolean>(
      (state) => state.books.loading
    );

    const dispatch = useDispatch();

    const getBooks = useCallback(() => {
      dispatch(getBooksSagaStart());
    }, [dispatch])
  return <List books={books} loading={loading} getBooks={getBooks} />;
}