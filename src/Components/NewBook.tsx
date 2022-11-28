import { BookData, Tag } from "../BookTypes";
import { BookForm } from "./BookForm";
type NewBookProps = {
  onSubmit: (data: BookData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function NewBook({ onSubmit, onAddTag, availableTags }: NewBookProps) {
  return (
    <>
      <h1 className="mb-4">New Book </h1>
      <BookForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default NewBook;
