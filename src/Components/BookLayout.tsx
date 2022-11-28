import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Book } from "../BookTypes";

type BookLayoutProps = {
  books: Book[];
};

export function BookLayout({ books }: BookLayoutProps) {
  const { id } = useParams();
  const book = books.find((n) => n.id === id);

  if (book == null) return <Navigate to="/" replace />;

  return <Outlet context={book} />;
}

/**Helper Function */

export function useBook() {
  return useOutletContext<Book>();
}
