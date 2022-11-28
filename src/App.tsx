import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewBook from "./Components/NewBook";
import BookList from "./Components/BookList";
import Book from "./Components/Book";
import { useLocalStorage } from "./Components/useLocalStorage";
import { BookData, RawBook, Tag } from "./BookTypes";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { BookLayout } from "./Components/BookLayout";
import EditBook from "./Components/EditBook";


const App = () => {
  const [books, setBooks] = useLocalStorage<RawBook[]>("BOOKS", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  /** Use Memo Hook
   * The useMemo Hook only runs when one of its dependencies update.
   * Think of memoization as caching a value so that it does not need to be recalculated.
   */

  const booksWithTags = useMemo(() => {
    return books.map((book) => {
      return {
        ...book,
        tags: tags.filter((tag) => book.tagIds.includes(tag.id)),
      };
    });
  }, [books, tags]);

  function onCreateBook({ tags, ...data }: BookData) {
    setBooks((prevBooks) => {
      return [
        ...prevBooks,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onUpdateBook(id: string, { tags, ...data }: BookData) {
    setBooks((prevBooks) => {
      return prevBooks.map((book) => {
        if (book.id === id) {
          return { ...book, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return book;
        }
      });
    });
  }

  function onDeleteBook(id: string) {
    setBooks((prevBooks) => {
      return prevBooks.filter((book) => book.id !== id);
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  
  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<BookList books={booksWithTags} availableTags={tags} 
          onUpdateTag={updateTag} onDeleteTag={deleteTag} />}
        />
        <Route
          path="/new"
          element={
            <NewBook
              onSubmit={onCreateBook}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<BookLayout books={booksWithTags} />}>
          <Route index element={<Book onDelete={onDeleteBook} />} />
          <Route
            path="edit"
            element={
              <EditBook
                onSubmit={onUpdateBook}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
          <Route path="reviews" element={<h1>Reviews</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
};

export default App;
