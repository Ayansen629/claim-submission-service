import React, { useState } from 'react';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const data = [
    { id: 1, description: 'Sample Tender description to be added here', document: 'Sample_doc_name.pdf', date: '25/12/2023', publishDate: '25/12/2023', tag: '25A' },
    { id: 2, description: 'Another tender description', document: 'Another_doc_name.pdf', date: '24/12/2023', publishDate: '24/12/2023', tag: '25B' },
    { id: 3, description: 'Tender for construction', document: 'Construction_doc.pdf', date: '23/12/2023', publishDate: '23/12/2023', tag: '25C' },
    { id: 4, description: 'Tender for development', document: 'Development_doc.pdf', date: '22/12/2023', publishDate: '22/12/2023', tag: '25D' },
    { id: 5, description: 'Tender for design', document: 'Design_doc.pdf', date: '21/12/2023', publishDate: '21/12/2023', tag: '25E' },
  ];

  const filteredData = data.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      {/* Page Header */}
      <Row className="mb-3">
        <Col>
          <h4>Content Management</h4>
        </Col>
        <Col className="text-end">
          <Button variant="success">+ Add</Button>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Select>
            <option>Type</option>
            <option value="Tender">Tender</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      {/* Table */}
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table striped bordered hover>
          <thead style={{ backgroundColor: 'green', color: 'white' }}>
            <tr>
              <th>#</th>
              <th>Tender Description</th>
              <th>Document</th>
              <th>Tender Date</th>
              <th>Tender Publish Date</th>
              <th>Tag</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.description}</td>
                  <td>{item.document}</td>
                  <td>{item.date}</td>
                  <td>{item.publishDate}</td>
                  <td>{item.tag}</td>
                  <td>
                    <Button variant="link" className="p-0">
                      <i className="bi bi-eye"></i>
                    </Button>
                    <Button variant="link" className="p-0 mx-2">
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="link" className="p-0">
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Row className="justify-content-between mt-3">
        <Col>{filteredData.length} Entries Found</Col>
        <Col className="text-end">
          <Form.Select style={{ width: 'auto', display: 'inline-block' }}>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </Form.Select>
          <span className="ms-2">Showing 1-{filteredData.length} of {data.length}</span>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
