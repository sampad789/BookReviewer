import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import {  Tag, SimplifiedBook } from "../BookTypes";

type BookListProps = {
  availableTags: Tag[];
  books: SimplifiedBook[];
  onDeleteTag:(id:string)=>void
  onUpdateTag:(id:string,label:string)=>void
};
type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onDeleteTag:(id:string)=>void
  onUpdateTag:(id:string,label:string)=>void
};

export default function BookList({ availableTags, books,onDeleteTag,onUpdateTag }: BookListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      return (
        (title === "" ||
          book.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            book.tags.some((bookTag) => bookTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, books]);

  return (
    <>
      <Row className=" align-items-center mb-5">
        <Col>
          <h1>Our Top Sellers</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={4} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">New Book</Button>
            </Link>
            <Button 
            onClick={()=>setEditTagsModalIsOpen(true)}
            variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>

              <Form.Control
                type="text"
                placeholder="Search for a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
                placeholder=" Filter for the Tags"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredBooks.map((book) => (
          <Col key={book.id}>
            <BookCard
              id={book.id}
              title={book.title}
              tags={book.tags}
              author={book.author}
              image={book.image}
            />
          </Col>
        ))}
      </Row>
      <EditTagsModal 
      onUpdateTag={onUpdateTag}
      onDeleteTag={onDeleteTag}
      show={editTagsModalIsOpen} 
      handleClose={()=>setEditTagsModalIsOpen(false)} availableTags={availableTags}/>
    </>
  );
}

function BookCard({ id, author, title, tags, image }: SimplifiedBook) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={"h-100 text-reset text-decoration-none card"}
    >
      <Card.Img variant="top" src={image} className="image" />
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <Card.Title className="fs-3">{title}</Card.Title>
          <Card.Subtitle className="mb-4 fs-5">Author : {author}</Card.Subtitle>

          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex wrap"
            >
              {tags.map((tag) => (
                <Badge className="text-yruncate bg-success " key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
        <Modal.Body>
          <Form>
            <Stack gap={2}>
              {availableTags.map((tag) => (
                <Row key={tag.id}>
                  <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={e => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                  <Col xs="auto">
                    <Button variant="outline-danger"
                    onClick={()=>onDeleteTag(tag.id)}>&times;</Button>
                  </Col>
                </Row>
              ))}
            </Stack>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  );
}
