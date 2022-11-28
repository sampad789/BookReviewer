import React from "react";
import {
  Col,
  Row,
  Stack,
  Badge,
  Image,
  Button,
  Container,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useBook } from "./BookLayout";

type BookProps = {
  onDelete: (id: string) => void;
};

export default function Book({ onDelete }: BookProps) {
  const book = useBook();
  const navigate = useNavigate();

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Image className="bookCover" fluid src={book.image} />
        </Col>
        <Col className="mt-4">
          <h1>
            {book.title}({book.year})
          </h1>
          <h3>By {book.author}</h3>
          {book.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex wrap">
              {book.tags.map((tag) => (
                <Badge className="text-truncate bg-success " key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}

          <p className="synopsis mt-4">{book.synopsis}</p>
        </Col>

        <Col className="mt-4">
          <Stack gap={3} direction="horizontal">
            <Link to={`/${book.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(book.id);
                navigate("/");
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
