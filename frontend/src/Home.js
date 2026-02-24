import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '⚡',
    title: 'Instant Booking',
    description: 'Reserve high-end equipment in seconds with our streamlined checkout process.',
    color: '#6366f1'
  },
  {
    icon: '🛡️',
    title: 'Asset Protection',
    description: 'Every booking is tracked and insured, ensuring peace of mind for both owners and users.',
    color: '#f43f5e'
  },
  {
    icon: '📊',
    title: 'Real-time Analytics',
    description: 'Monitor asset utilization and ROI with our built-in dashboard and detailed reports.',
    color: '#10b981'
  },
  {
    icon: '☁️',
    title: 'Cloud Managed',
    description: 'Access your inventory and bookings from anywhere, on any device, with zero latency.',
    color: '#0ea5e9'
  }
];

const stats = [
  { label: 'Active Assets', value: '1.2k+' },
  { label: 'Monthly Bookings', value: '8.5k' },
  { label: 'Global Locations', value: '24' },
  { label: 'User Satisfaction', value: '99%' }
];

function Home() {
  return (
    <div className="home-wrapper" style={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section className="hero-section py-5 mb-5 animate-fade-in" style={{
        background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent), radial-gradient(circle at bottom left, rgba(244, 63, 94, 0.05), transparent)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6} className="animate-slide-up">
              <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill" style={{ opacity: 0.9 }}>
                The Future of Inventory Management
              </Badge>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-2px',
                marginBottom: '1.5rem',
                color: '#0f172a'
              }}>
                Manage Assets with <br />
                <span style={{ color: '#6366f1', display: 'inline-block' }}>Precision & Ease.</span>
              </h1>
              <p className="lead mb-4" style={{
                fontSize: '1.25rem',
                color: '#64748b',
                maxWidth: '90%',
                lineHeight: 1.6
              }}>
                Streamline your operations with the world's most intuitive asset booking platform.
                From high-tech gear to industrial machinery, we've got you covered.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button as={Link} to="/book-asset" className="btn-premium btn-premium-primary">
                  Get Started for Free
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Button>
                <Button as={Link} to="/assets" className="btn-premium btn-premium-outline">
                  View Inventory
                </Button>
              </div>

              <div className="mt-5 d-flex align-items-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="d-flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/150?u=${i}`}
                      alt="user"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px solid white',
                        marginLeft: i > 1 ? '-10px' : '0'
                      }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>500+ teams</span> already tracking assets
                </div>
              </div>
            </Col>
            <Col lg={6} className="position-relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="position-relative">
                <div style={{
                  position: 'absolute',
                  top: '-10%',
                  right: '-10%',
                  width: '120%',
                  height: '120%',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(244, 63, 94, 0.1) 100%)',
                  borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%',
                  filter: 'blur(40px)',
                  zIndex: -1
                }}></div>
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Dashboard Preview"
                  className="img-fluid rounded-4 shadow-lg border"
                  style={{
                    transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                    boxShadow: '0 50px 100px -20px rgba(50, 50, 93, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5 mb-5">
        <Container>
          <div className="glass-morphism rounded-pill p-4 shadow-sm">
            <Row className="g-4 text-center">
              {stats.map((stat, idx) => (
                <Col key={idx} xs={6} md={3}>
                  <div className="stat-item">
                    <h3 style={{ fontWeight: 800, color: '#6366f1', marginBottom: '0.25rem' }}>{stat.value}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500, margin: 0 }}>{stat.label}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="features-grid py-5 mb-5 overflow-hidden">
        <Container>
          <div className="text-center mb-5 animate-slide-up">
            <h2 style={{ fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-1px' }}>One platform. <span style={{ color: '#6366f1' }}>Limitless possibilities.</span></h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Everything you need to manage your inventory and bookings in one beautiful, high-performance interface.
            </p>
          </div>
          <Row className="g-4">
            {features.map((feature, idx) => (
              <Col key={idx} md={6} lg={3}>
                <Card className="premium-card h-100 p-4 border-0 shadow-sm animate-slide-up" style={{ animationDelay: `${0.1 * idx}s` }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: `${feature.color}15`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    {feature.icon}
                  </div>
                  <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>{feature.title}</h4>
                  <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>{feature.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <Container>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '2rem',
            padding: '4rem 2rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-10%',
              width: '40%',
              height: '200%',
              background: 'linear-gradient(transparent, rgba(99, 102, 241, 0.1), transparent)',
              transform: 'rotate(45deg)',
              pointerEvents: 'none'
            }}></div>
            <Row className="text-center position-relative">
              <Col lg={8} className="mx-auto">
                <h2 style={{ color: 'white', fontWeight: 800, fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                  Ready to optimize your workflow?
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '1.15rem', marginBottom: '2.5rem' }}>
                  Join hundreds of forward-thinking companies already using our platform to scale their asset management.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Button as={Link} to="/signup" className="btn-premium btn-premium-primary" style={{ padding: '1rem 2.5rem' }}>
                    Create Your Account
                  </Button>
                  <Button variant="outline-light" className="btn-premium" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                    Talk to Sales
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Footer Space padding */}
      <div className="py-5"></div>
    </div>
  );
}

export default Home;

