import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { authorizedFetch, getValidAccessToken, clearTokens, API_BASE } from './auth';

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadBookings() {
      setError('');
      try {
        const token = await getValidAccessToken();
        if (!token) {
          if (active) {
            setError('Please login again.');
          }
          return;
        }
        const response = await authorizedFetch(`${API_BASE}/api/v1/bookings/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            clearTokens();
            if (active) {
              setError('Session expired. Please login again.');
            }
            return;
          }
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (active) {
          const normalized = Array.isArray(data)
            ? data
            : Array.isArray(data?.results)
            ? data.results
            : [];
          setBookings(normalized);
        }
      } catch (err) {
        console.error('Error loading bookings:', err);
        if (active) {
          if (err.message === 'AUTH_REQUIRED') {
            clearTokens();
            setError('Session expired. Please login again.');
          } else {
            setError('Failed to load bookings. Please try again.');
          }
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadBookings();

    return () => {
      active = false;
    };
  }, []);

  function formatDate(value) {
    if (!value) {
      return '—';
    }
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date.toLocaleString();
  }

  function formatStatusLabel(status) {
    if (!status) {
      return 'Pending';
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  function getStatusVariant(status) {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      case 'cancelled':
        return 'secondary';
      default:
        return 'secondary';
    }
  }

  async function cancel(id) {
    try {
      const res = await authorizedFetch(`${API_BASE}/api/v1/bookings/${id}/cancel/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        if (res.status === 401) {
          clearTokens();
          alert('Session expired. Please login again.');
          return;
        }
        alert('Cancel failed: ' + res.status);
        return;
      }
      const data = await res.json();
      setBookings((current) => current.map((b) => (b.id === id ? {...b, status: data.status || 'cancelled'} : b)));
    } catch (err) {
      if (err.message === 'AUTH_REQUIRED') {
        clearTokens();
        alert('Session expired. Please login again.');
      } else {
        alert('Error: ' + err.message);
      }
    }
  }

  return (
    <div>
      <h2>My Bookings</h2>
      {loading && <div style={{ padding: '40px 0', textAlign: 'center' }}>Loading...</div>}
      {!loading && error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && bookings.length === 0 && (
        <Alert variant="info">You have no bookings yet.</Alert>
      )}
      {!loading && !error && bookings.length > 0 && (
        <Row className="g-3">
          {bookings.map((b) => (
            <Col key={b.id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                {b.asset && b.asset.image_url ? (
                  <Card.Img
                    variant="top"
                    src={b.asset.image_url}
                    alt={b.asset.name}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      height: '180px',
                      backgroundColor: '#e9ecef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999',
                    }}
                  >
                    No Image
                  </div>
                )}
                <Card.Body>
                  <Card.Title style={{ fontSize: '1rem' }}>
                    {(b.asset && b.asset.name) || 'Asset'}
                  </Card.Title>
                  <div className="d-flex gap-2 mb-2 flex-wrap">
                    <Badge bg={getStatusVariant(b.status)}>
                      {formatStatusLabel(b.status)}
                    </Badge>
                    {b.asset && b.asset.location && (
                      <Badge bg="info">
                        {b.asset.location.name}
                      </Badge>
                    )}
                  </div>
                  {b.asset && b.asset.serial_number && (
                    <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '6px' }}>
                      {b.asset.serial_number}
                    </div>
                  )}
                  <div style={{ fontSize: '0.85rem', color: '#555' }}>
                    <div>
                      <strong>Start:</strong> {formatDate(b.start_datetime)}
                    </div>
                    <div>
                      <strong>End:</strong> {formatDate(b.end_datetime)}
                    </div>
                    {b.purpose && <div style={{ marginTop: 8 }}>{b.purpose}</div>}
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white border-0">
                  {(!b.status || b.status === 'pending') && (
                    <Button variant="outline-danger" size="sm" onClick={() => cancel(b.id)}>
                      Cancel Booking
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
