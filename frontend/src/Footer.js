import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: '40px 0', marginTop: 'auto' }}>
            <Container>
                <Row className="g-4 align-items-center">
                    {/* Left Column: Brand & About */}
                    <Col lg={4} md={12}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div style={{
                                width: '28px',
                                height: '28px',
                                background: 'linear-gradient(135deg, #6366f1 0%, #f43f5e 100%)',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 800,
                                fontSize: '0.8rem'
                            }}>A</div>
                            <h5 style={{ fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>AssetFlow</h5>
                        </div>
                        <p style={{ color: '#94a3b8', lineHeight: 1.5, fontSize: '0.9rem', marginBottom: '1rem' }}>
                            Next-gen asset management for modern teams.
                        </p>
                        <div className="d-flex gap-2">
                            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub].map((Icon, idx) => (
                                <div key={idx} className="social-icon" style={{ width: '32px', height: '32px' }}>
                                    <Icon size={14} />
                                </div>
                            ))}
                        </div>
                    </Col>

                    {/* Middle Column: Address */}
                    <Col lg={5} md={6}>
                        <h6 style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', color: '#6366f1', fontSize: '0.8rem' }}>Corporate Office</h6>
                        <div className="d-flex align-items-start gap-2">
                            <FaMapMarkerAlt className="mt-1" style={{ color: '#f43f5e', fontSize: '0.9rem' }} />
                            <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.4 }}>
                                280/1, Anniamma Arcade, Sampige Road, <br />
                                18th Cross Rd, Malleshwaram, <br />
                                Bengaluru, Karnataka 560003
                            </div>
                        </div>
                    </Col>

                    {/* Right Column: Mini Contact */}
                    <Col lg={3} md={6}>
                        <div className="d-flex flex-column gap-2">
                            <div className="d-flex align-items-center gap-2">
                                <FaPhone style={{ color: '#f43f5e', fontSize: '0.8rem' }} />
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>+1 555 123 4567</div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <FaEnvelope style={{ color: '#f43f5e', fontSize: '0.8rem' }} />
                                <a href="mailto:support@assetflow.com" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.85rem' }}>support@assetflow.com</a>
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                <div className="text-center" style={{ color: '#475569', fontSize: '0.8rem' }}>
                    © {new Date().getFullYear()} AssetFlow Systems. All rights reserved.
                </div>
            </Container>

            <style>
                {`
          .social-icon {
            background-color: rgba(255,255,255,0.05);
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #94a3b8;
          }
          .social-icon:hover {
            background-color: #6366f1;
            color: white;
            transform: translateY(-3px);
          }
        `}
            </style>
        </footer>
    );
};

export default Footer;
