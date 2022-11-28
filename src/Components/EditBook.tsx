import { BookData, Tag } from "../BookTypes";
import { BookForm } from "./BookForm";
import { useBook } from "./BookLayout";
type EditBookProps = {
  onSubmit: (id: string, data: BookData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function EditBook({ onSubmit, onAddTag, availableTags }: EditBookProps) {
  const book = useBook();
  return (
    <>
      <h1 className="mb-4">Edit Book </h1>
      <BookForm
        title={book.title}
        tags={book.tags}
        year={book.year}
        synopsis={book.synopsis}
        image={book.image}
        author={book.author}
        publisher={book.publisher}
        onSubmit={(data) => onSubmit(book.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default EditBook;
