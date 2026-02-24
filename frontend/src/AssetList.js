import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Badge, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE } from './auth';
import { MOCK_ASSETS, MOCK_CATEGORIES } from './mockData';

export default function AssetList() {
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mode, setMode] = useState('assets');
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/v1/assets/`, { headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
      fetch(`${API_BASE}/api/v1/categories/`, { headers: { 'Content-Type': 'application/json' } }).then(r => {
        if (r.ok) return r.json();
        return [];
      }).catch(() => [])
    ])
      .then(([assetsData, categoriesData]) => {
        setAssets(assetsData);
        if (Array.isArray(categoriesData)) setCategories(categoriesData);
      })
      .catch((err) => {
        console.warn('Backend not matching or down, loading demo data:', err);
        setAssets(MOCK_ASSETS);
        setCategories(MOCK_CATEGORIES);
      });
  }, []);

  const locations = useMemo(() => {
    const map = new Map();
    assets.forEach(a => {
      if (a.location) {
        map.set(a.location.id, a.location);
      }
    });
    return Array.from(map.values());
  }, [assets]);

  const filteredAssets = useMemo(() => {
    let result = assets;
    if (mode === 'locations' && selectedLocationId) {
      result = result.filter(a => a.location && a.location.id === selectedLocationId);
    }
    if (selectedCategoryId) {
      // Find if category is a parent category or a subcategory
      const isParent = categories.some(cat => cat.id === selectedCategoryId);
      if (isParent) {
        result = result.filter(a => a.category && a.category.id === selectedCategoryId);
      } else {
        // Check if it's a subcategory ID
        result = result.filter(a => a.subcategory && a.subcategory.id === selectedCategoryId);
      }
    }
    return result;
  }, [assets, mode, selectedLocationId, selectedCategoryId, categories]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Available Assets</h2>

      <div className="d-flex flex-wrap gap-3 mb-5 align-items-center p-3 glass-morphism rounded-4 shadow-sm border" style={{ position: 'relative', zIndex: 1000 }}>
        <Button
          variant="light"
          className={`filter-btn ${mode === 'assets' && !selectedCategoryId ? 'filter-btn-active' : ''}`}
          onClick={() => {
            setMode('assets');
            setSelectedLocationId(null);
            setSelectedCategoryId(null);
          }}
        >
          View All Assets
        </Button>
        <Button
          variant="light"
          className={`filter-btn ${mode === 'locations' ? 'filter-btn-active' : ''}`}
          onClick={() => {
            setMode('locations');
            setSelectedCategoryId(null);
          }}
        >
          Filter by Location
        </Button>

        <div className="vr mx-1 opacity-25"></div>

        {categories.map(cat => {
          const isAnySubSelected = cat.subcategories && cat.subcategories.some(sub => sub.id === selectedCategoryId);
          const isParentSelected = selectedCategoryId === cat.id;
          const isActive = isAnySubSelected || isParentSelected;

          return (
            <DropdownButton
              key={cat.id}
              variant="light"
              title={cat.name}
              className={`filter-dropdown ${isActive ? 'filter-dropdown-active' : ''}`}
              size="sm"
              onSelect={(ek) => {
                setSelectedCategoryId(Number(ek));
                setMode('assets');
                setSelectedLocationId(null);
              }}
              renderMenuOnMount={true}
              toggleClassName={`filter-btn ${isActive ? 'filter-btn-active' : ''}`}
            >
              <Dropdown.Item
                eventKey={cat.id}
                active={selectedCategoryId === cat.id}
              >
                All {cat.name}
              </Dropdown.Item>
              {cat.subcategories && cat.subcategories.length > 0 && (
                <>
                  <Dropdown.Divider />
                  {cat.subcategories.map(sub => (
                    <Dropdown.Item
                      key={sub.id}
                      eventKey={sub.id}
                      active={selectedCategoryId === sub.id}
                    >
                      {sub.name}
                    </Dropdown.Item>
                  ))}
                </>
              )}
            </DropdownButton>
          );
        })}
      </div>

      {mode === 'locations' && (
        <Form.Group className="mb-3">
          <Form.Label>Select Location:</Form.Label>
          <Form.Select
            value={selectedLocationId || ''}
            onChange={e => setSelectedLocationId(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
      )}

      <Row className="g-4">
        {filteredAssets.map(a => (
          <Col key={a.id} xs={12} sm={12} md={6} lg={4}>
            <Card className="h-100 asset-card">
              <div className="asset-img-container">
                {a.image_url ? (
                  <Card.Img
                    variant="top"
                    src={a.image_url}
                    className="asset-card-img"
                    alt={a.name}
                  />
                ) : (
                  <div style={{ height: '100%', backgroundColor: '#f1f3f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#adb5bd', fontWeight: 500 }}>No Image Available</span>
                  </div>
                )}
              </div>

              <Card.Body className="asset-card-body">
                <Card.Title className="asset-card-title">{a.name}</Card.Title>

                {/* Hidden serial number to decrease info section */}

                <div className="d-flex align-items-center mb-3 flex-wrap gap-2">
                  {a.location && (
                    <Badge bg="light" text="dark" className="border">
                      <i className="bi bi-geo-alt-fill text-danger me-1"></i> {a.location.name}
                    </Badge>
                  )}

                  <Badge
                    bg={
                      a.status === 'Available' || (a.status === undefined && a.available) ? 'success' :
                        a.status === 'Pending' ? 'warning' : 'danger'
                    }
                    className="asset-status-badge"
                  >
                    {a.status || (a.available ? 'Available' : 'Out of Stock')}
                  </Badge>
                </div>

                {/* Hidden description section */}

              </Card.Body>

              <Card.Footer className="bg-white border-top-0 pt-0 pb-3 px-3">
                <Link to={`/assets/${a.id}`}>
                  <Button variant="primary" className="w-100">
                    View Details
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredAssets.length === 0 && (
        <div className="text-center mt-5">
          <p className="text-muted">No assets found for the selected criteria.</p>
        </div>
      )}
    </Container>
  );
}
