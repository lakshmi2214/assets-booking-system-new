import React from 'react';
import { Container, Row, Col, Button, Card, Carousel, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const carouselItems = [
  {
    title: 'Effortless Asset Booking',
    subtitle: 'Reserve equipment and spaces in just a few clicks.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Track Every Reservation',
    subtitle: 'Stay organised with real-time booking visibility.',
    image:
      'https://images.unsplash.com/photo-1526378722484-cc5c7100c520?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Optimise Resource Usage',
    subtitle: 'Unlock insights to maximise your asset investment.',
    image:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=80',
  },
];

const featureCards = [
  {
    badge: 'Smart Scheduling',
    title: 'Avoid Conflicts',
    description: 'Automatic clash detection keeps your team aligned and assets available when needed.',
  },
  {
    badge: 'Instant Updates',
    title: 'Stay Informed',
    description: 'Live notifications ensure everyone knows when assets are booked, in use, or released.',
  },
  {
    badge: 'Centralised Control',
    title: 'Manage From Anywhere',
    description: 'Access the platform on desktop or mobile to monitor utilisation and history on the go.',
  },
];

const checklist = [
  'Seamless booking workflow tailored for teams',
  'Detailed asset profiles with location insights',
  'Secure authentication with role-based visibility',
  'Comprehensive booking history and analytics',
];

function Home() {
  return (
    <div style={{ backgroundColor: '#f8f9fc', minHeight: '100vh' }}>
      <section style={{ position: 'relative' }}>
        <Carousel fade interval={6000} controls indicators>
          {carouselItems.map((item) => (
            <Carousel.Item key={item.title}>
              <div
                style={{
                  height: '60vh',
                  backgroundImage: `linear-gradient(180deg, rgba(23, 43, 77, 0.65), rgba(23, 43, 77, 0.85)), url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Container>
                  <Row className="align-items-center">
                    <Col md={7}>
                      <div style={{ color: 'white' }}>
                        <h1 style={{ fontWeight: 700, fontSize: '2.8rem' }}>{item.title}</h1>
                        <p style={{ fontSize: '1.2rem', marginBottom: '24px' }}>{item.subtitle}</p>
                        <Button as={Link} to="/book-asset" variant="light" size="lg">
                          Start Booking
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      <Container style={{ marginTop: '-80px' }}>
        <Row className="g-4">
          {featureCards.map((feature) => (
            <Col key={feature.title} xs={12} md={4}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Badge bg="primary" className="mb-3">
                    {feature.badge}
                  </Badge>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text style={{ color: '#5d6a85' }}>{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="py-5">
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 24px 48px rgba(15, 23, 42, 0.08)' }}>
              <h2 style={{ fontWeight: 700, marginBottom: '16px' }}>Designed for modern teams</h2>
              <p style={{ color: '#5d6a85', marginBottom: '24px' }}>
                Empower your organisation with a centralised platform that simplifies asset management,
                reduces downtime, and keeps stakeholders informed every step of the way.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {checklist.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', color: '#3b4559' }}>
                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#0d6efd',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button as={Link} to="/assets" variant="primary" size="lg" className="mt-4">
                Explore Assets
              </Button>
            </div>
          </Col>
          <Col lg={6}>
            <div
              style={{
                background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
                borderRadius: '16px',
                padding: '40px',
                color: 'white',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '16px',
                boxShadow: '0 24px 48px rgba(15, 23, 42, 0.18)',
              }}
            >
              <h3 style={{ fontWeight: 700 }}>Powerful insights at your fingertips</h3>
              <p style={{ fontSize: '1.05rem' }}>
                View utilisation trends, manage availability, and stay ahead with predictive insights that
                keep your operations running smoothly.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 120px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '12px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '1.7rem' }}>98%</h4>
                  <small>Improved utilisation</small>
                </div>
                <div style={{ flex: '1 1 120px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '12px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '1.7rem' }}>24/7</h4>
                  <small>Availability monitoring</small>
                </div>
                <div style={{ flex: '1 1 120px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '12px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '1.7rem' }}>40%</h4>
                  <small>Faster turnaround</small>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <section style={{ backgroundColor: '#0d1b40', color: 'white', padding: '60px 0' }}>
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={8}>
              <h2 style={{ fontWeight: 700 }}>Ready to transform your asset operations?</h2>
              <p style={{ marginTop: '12px', fontSize: '1.05rem' }}>
                Join teams that rely on our platform to reduce downtime, increase visibility, and make data-driven decisions.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Button as={Link} to="/signup" variant="light" size="lg">
                Create an Account
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
