import { FormEvent, useRef, useState } from "react";
import { Col, Form, Row, Stack, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreateableReactSelect from "react-select/creatable";
import { BookData, Tag } from "../BookTypes";
import { v4 as uuidV4 } from "uuid";

type BookFormProps = {
  onSubmit: (data: BookData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<BookData>;

export function BookForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  year = "",
  author = "",
  synopsis = "",
  image = "",
  publisher = "",
  tags = [],
}: BookFormProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const publisherRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const synopsisRef = useRef<HTMLTextAreaElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      author: authorRef.current!.value,
      publisher: publisherRef.current!.value,
      year: yearRef.current!.value,
      synopsis: synopsisRef.current!.value,
      tags: selectedTags,
      image: coverImageRef.current!.value,
    });
    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control ref={authorRef} required defaultValue={author} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="publisher">
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                ref={publisherRef}
                required
                defaultValue={publisher}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control ref={yearRef} required defaultValue={year} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreateableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
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
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="synopsis">
          <Form.Label>Synopsis</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={10}
            ref={synopsisRef}
            defaultValue={synopsis}
          />
        </Form.Group>
        <Form.Group controlId="image" className="mb-2">
          <Form.Label>Cover Image URL</Form.Label>
          <Form.Control
            size="lg"
            ref={coverImageRef}
            required
            defaultValue={image}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={3}>
          <Button type="submit" variant="outline-primary" size="lg">
            {" "}
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary" size="lg">
              {" "}
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
