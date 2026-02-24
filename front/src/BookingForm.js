import React, { useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Form, Button, Card, Alert, Spinner, Row, Col, Badge } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { authorizedFetch, getValidAccessToken, clearTokens, API_BASE } from './auth';

export default function AssetBooking() {
  const [assets, setAssets] = useState([]);
  const [locations, setLocations] = useState([]);

  // Booking form states
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [purpose, setPurpose] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState('');

  const [confirmStage, setConfirmStage] = useState(false);
  const [msg, setMsg] = useState('');

  // Load assets and locations once
  useEffect(() => {
    fetch(`${API_BASE}/api/v1/assets/`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then((r) => {
        if (!r.ok) {
          console.error('Backend error:', r.status, r.statusText);
          throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        }
        return r.json();
      })
      .then((assets) => {
        console.log('Assets loaded successfully:', assets.length);
        setAssets(assets);
        const map = new Map();
        assets.forEach((a) => {
          if (a.location) map.set(a.location.id, a.location);
        });
        setLocations(Array.from(map.values()));
        setMsg('');
      })
      .catch((err) => {
        console.error('Error loading assets:', err);
        setMsg('❌ Failed to load assets: ' + err.message);
      });
  }, []);

  function toISO(dt) {
    if (!dt) return null;
    return new Date(dt.getTime() - dt.getTimezoneOffset() * 60000)
      .toISOString()
      .replace('.000', '');
  }

  // When user clicks "Book Asset" button from list
  function openBookingForm(assetId) {
    setSelectedAssetId(assetId);
    setConfirmStage(false);
    setMsg('');
    setStart(null);
    setEnd(null);
    setPurpose('');
    setFullName('');
    setMobile('');
    setEmail('');
    setSelectedLocationId('');
  }

  function handleInitialSubmit(e) {
    e.preventDefault();
    if (!selectedAssetId) {
      setMsg('Please select an asset to book.');
      return;
    }
    if (!start || !end) {
      setMsg('Please select both start and end date/time.');
      return;
    }
    setConfirmStage(true);
  }

  async function acceptBooking() {
    const token = await getValidAccessToken();
    if (!token) {
      setMsg('❌ Error: Session expired. Please login again.');
      setConfirmStage(false);
      return;
    }

    const asset = assets.find((a) => a.id === Number(selectedAssetId));
    const composedPurpose =
      purpose ||
      `Booking by ${fullName || 'N/A'} | Mobile: ${mobile || 'N/A'} | Email: ${
        email || 'N/A'
      } | Location: ${
        (locations.find((l) => l.id === Number(selectedLocationId)) || {}).name || 'N/A'
      }`;

    const body = {
      asset_id: asset.id,
      start_datetime: toISO(start),
      end_datetime: toISO(end),
      purpose: composedPurpose,
    };

    let res;
    try {
      res = await authorizedFetch(`${API_BASE}/api/v1/bookings/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      if (err.message === 'AUTH_REQUIRED') {
        clearTokens();
        setMsg('❌ Error: Session expired. Please login again.');
        setConfirmStage(false);
        return;
      }
      setMsg('❌ Error: ' + err.message);
      setConfirmStage(false);
      return;
    }

    if (res.status === 401) {
      clearTokens();
      setMsg('❌ Error: Session expired. Please login again.');
      setConfirmStage(false);
      return;
    }

    if (res.ok) {
      const data = await res.json();
      setMsg('✅ Booking created successfully (ID: ' + data.id + ')');
      alert('Booking confirmed!');
      setSelectedAssetId('');
      setPurpose('');
      setFullName('');
      setMobile('');
      setEmail('');
      setSelectedLocationId('');
      setStart(null);
      setEnd(null);
      setConfirmStage(false);
      window.location.href = '/bookings';
    } else {
      let t = {};
      try {
        t = await res.json();
      } catch (e) {}
      setMsg('❌ Error: ' + (t.detail || JSON.stringify(t)));
      setConfirmStage(false);
    }
  }

  function rejectBooking() {
    setConfirmStage(false);
  }

  const summary = useMemo(() => {
    const loc = locations.find((l) => l.id === Number(selectedLocationId));
    const asset = assets.find((a) => a.id === Number(selectedAssetId));
    return {
      asset: asset ? asset.name : '—',
      fullName,
      mobile,
      email,
      location: loc ? loc.name : '—',
      start,
      end,
      purpose,
    };
  }, [
    assets,
    fullName,
    mobile,
    email,
    selectedLocationId,
    locations,
    start,
    end,
    purpose,
    selectedAssetId,
  ]);

  return (
    <div style={{ maxWidth: 700, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      {msg && (
        <Alert variant={msg.startsWith('✅') ? 'success' : msg.startsWith('❌') ? 'danger' : 'info'}>
          {msg}
        </Alert>
      )}
      {!selectedAssetId && (
        <>
          <h2 className="mb-4">Available Assets for Booking</h2>
          <Row className="g-3">
            {assets.map((asset) => (
              <Col key={asset.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm" style={{cursor: 'pointer'}}>
                  {asset.image_url && (
                    <Card.Img 
                      variant="top" 
                      src={asset.image_url} 
                      style={{height: '150px', objectFit: 'cover'}}
                      alt={asset.name}
                    />
                  )}
                  {!asset.image_url && (
                    <div style={{height: '150px', backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <span style={{color: '#999'}}>No Image</span>
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title style={{fontSize: '1rem'}}>{asset.name}</Card.Title>
                    {asset.serial_number && (
                      <div style={{fontSize: '0.8rem', color: '#666', marginBottom: '8px'}}>
                        {asset.serial_number}
                      </div>
                    )}
                    {asset.location && (
                      <Badge bg="info" className="mb-2">
                        {asset.location.name}
                      </Badge>
                    )}
                    <Card.Text style={{fontSize: '0.85rem', color: '#555'}}>
                      {asset.description || 'Available for booking'}
                    </Card.Text>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="w-100"
                      onClick={() => openBookingForm(asset.id)}
                    >
                      Book Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {assets.length === 0 && (
            <Alert variant="info" className="mt-3">No assets available for booking</Alert>
          )}
        </>
      )}

      {selectedAssetId && !confirmStage && (
        <>
          <div className="mb-4">
            <Button 
              variant="outline-secondary" 
              onClick={() => setSelectedAssetId('')}
              className="mb-3"
            >
              &larr; Back to Assets
            </Button>
          </div>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Row>
                <Col md={4}>
                  {assets.find((a) => a.id === Number(selectedAssetId))?.image_url ? (
                    <Card.Img 
                      src={assets.find((a) => a.id === Number(selectedAssetId))?.image_url} 
                      alt="Asset"
                      style={{maxHeight: '200px', objectFit: 'cover', borderRadius: '6px'}}
                    />
                  ) : (
                    <div style={{height: '200px', backgroundColor: '#e9ecef', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999'}}>
                      No Image
                    </div>
                  )}
                </Col>
                <Col md={8}>
                  <h4>{assets.find((a) => a.id === Number(selectedAssetId))?.name}</h4>
                  {assets.find((a) => a.id === Number(selectedAssetId))?.serial_number && (
                    <p><strong>Serial:</strong> {assets.find((a) => a.id === Number(selectedAssetId))?.serial_number}</p>
                  )}
                  {assets.find((a) => a.id === Number(selectedAssetId))?.location && (
                    <p><strong>Location:</strong> {assets.find((a) => a.id === Number(selectedAssetId))?.location.name}</p>
                  )}
                  {assets.find((a) => a.id === Number(selectedAssetId))?.description && (
                    <p>{assets.find((a) => a.id === Number(selectedAssetId))?.description}</p>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <h3>Book Asset</h3>
          <form onSubmit={handleInitialSubmit}>

            <div style={{ marginTop: 10 }}>
              <label><strong>Start:</strong></label><br />
              <DatePicker
                selected={start}
                onChange={(date) => setStart(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select start date/time"
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <label><strong>End:</strong></label><br />
              <DatePicker
                selected={end}
                onChange={(date) => setEnd(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select end date/time"
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                style={{ width: '100%', padding: 6 }}
                required
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
                style={{ width: '100%', padding: 6 }}
                required
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ID"
                type="email"
                style={{ width: '100%', padding: 6 }}
                required
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <label><strong>Location:</strong></label><br />
              <select
                value={selectedLocationId}
                onChange={(e) => setSelectedLocationId(e.target.value)}
                required
              >
                <option value="">Select location</option>
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginTop: 10 }}>
              <input
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Purpose"
                style={{ width: '100%', padding: 6 }}
              />
            </div>

            <button type="submit" style={{ marginTop: 15 }}>
              Review Booking
            </button>{' '}
            <button
              type="button"
              style={{ marginTop: 15, marginLeft: 10 }}
              onClick={() => setSelectedAssetId('')}
            >
              Cancel
            </button>
          </form>
        </>
      )}

      {confirmStage && (
        <div
          style={{
            border: '1px solid #ccc',
            padding: 12,
            marginTop: 20,
            borderRadius: 6,
            backgroundColor: '#f9f9f9',
          }}
        >
          <h4>Confirm Booking</h4>
          <div><strong>Asset:</strong> {summary.asset}</div>
          <div><strong>Name:</strong> {summary.fullName || '—'}</div>
          <div><strong>Mobile:</strong> {summary.mobile || '—'}</div>
          <div><strong>Email:</strong> {summary.email || '—'}</div>
          <div><strong>Location:</strong> {summary.location}</div>
          <div><strong>Start:</strong> {summary.start ? summary.start.toString() : '—'}</div>
          <div><strong>End:</strong> {summary.end ? summary.end.toString() : '—'}</div>
          <div><strong>Purpose:</strong> {summary.purpose || '—'}</div>
          <div style={{ marginTop: 10 }}>
            <button onClick={acceptBooking}>Confirm</button>{' '}
            <button onClick={rejectBooking}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
