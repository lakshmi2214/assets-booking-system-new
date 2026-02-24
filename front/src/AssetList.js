import React, {useEffect, useMemo, useState} from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Badge, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE } from './auth';

export default function AssetList(){
  const [assets, setAssets] = useState([]);
  const [mode, setMode] = useState('assets'); // 'assets' | 'locations'
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  useEffect(()=>{
    fetch(`${API_BASE}/api/v1/assets/`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setAssets)
      .catch((err) => console.error('Error loading assets:', err));
  },[]);

  const locations = useMemo(()=>{
    const map = new Map();
    assets.forEach(a=>{
      if(a.location){
        map.set(a.location.id, a.location);
      }
    });
    return Array.from(map.values());
  }, [assets]);

  const filteredAssets = useMemo(()=>{
    if(mode !== 'locations' || !selectedLocationId) return assets;
    return assets.filter(a=>a.location && a.location.id === selectedLocationId);
  }, [assets, mode, selectedLocationId]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Available Assets</h2>
      
      <div className="mb-3">
        <Button 
          variant={mode === 'assets' ? 'primary' : 'outline-primary'} 
          onClick={() => {setMode('assets'); setSelectedLocationId(null);}}
          className="me-2"
        >
          View All Assets
        </Button>
        <Button 
          variant={mode === 'locations' ? 'primary' : 'outline-primary'} 
          onClick={() => setMode('locations')}
        >
          Filter by Location
        </Button>
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
          <Col key={a.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm hover-card" style={{cursor: 'pointer', transition: 'transform 0.2s'}}>
              {a.image_url && (
                <Card.Img 
                  variant="top" 
                  src={a.image_url} 
                  style={{height: '200px', objectFit: 'cover'}} 
                  alt={a.name}
                />
              )}
              {!a.image_url && (
                <div style={{height: '200px', backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{color: '#999'}}>No Image</span>
                </div>
              )}
              
              <Card.Body>
                <Card.Title className="mb-2">{a.name}</Card.Title>
                
                {a.serial_number && (
                  <div style={{fontSize: '0.85rem', color: '#666', marginBottom: '8px'}}>
                    <strong>Serial:</strong> {a.serial_number}
                  </div>
                )}
                
                {a.location && (
                  <Badge bg="info" className="mb-2">
                    {a.location.name}
                  </Badge>
                )}
                
                <Card.Text style={{fontSize: '0.9rem', color: '#555', marginBottom: '10px'}}>
                  {a.description || 'No description available'}
                </Card.Text>
                
                {a.details && (
                  <Card.Text style={{fontSize: '0.85rem', color: '#777', marginBottom: '10px', borderTop: '1px solid #ddd', paddingTop: '8px'}}>
                    <strong>Details:</strong> {a.details}
                  </Card.Text>
                )}
                
                <div className="mt-2">
                  <Badge bg={a.available ? 'success' : 'danger'}>
                    {a.available ? 'Available' : 'Not Available'}
                  </Badge>
                </div>
              </Card.Body>
              
              <Card.Footer className="bg-white border-top-0 pt-0">
                <Link to={`/assets/${a.id}`}>
                  <Button variant="primary" size="sm" className="w-100">
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
          <p className="text-muted">No assets found</p>
        </div>
      )}
    </Container>
  );
}
