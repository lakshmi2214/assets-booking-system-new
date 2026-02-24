import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';
import { API_BASE } from './auth';

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMsg('No token provided.');
            return;
        }

        verify();
    }, [token]);

    async function verify() {
        try {
            const res = await fetch(`${API_BASE}/api/v1/auth/verify-email/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setMsg(data.detail);
            } else {
                setStatus('error');
                setMsg(data.detail || 'Verification failed');
            }
        } catch (e) {
            setStatus('error');
            setMsg('Network error: ' + e.message);
        }
    }

    return (
        <Container className="mt-5 text-center" style={{ maxWidth: '500px' }}>
            <h2>Email Verification</h2>
            {status === 'verifying' && <Alert variant="info">Verifying your email...</Alert>}
            {status === 'success' && (
                <Alert variant="success">
                    <h4>Success!</h4>
                    <p>{msg}</p>
                    <div className="mt-3">
                        <Button onClick={() => navigate('/login')} variant="success">Go to Login</Button>
                    </div>
                </Alert>
            )}
            {status === 'error' && (
                <Alert variant="danger">
                    <h4>Error</h4>
                    <p>{msg}</p>
                    <div className="mt-3">
                        <Button onClick={() => navigate('/signup')} variant="secondary">Back to Signup</Button>
                    </div>
                </Alert>
            )}
        </Container>
    );
}
